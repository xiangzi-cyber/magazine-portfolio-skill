#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const VIEWPORT = { width: 1280, height: 900 };

const input = process.argv[2];
if (!input) {
  console.error('Usage: node scripts/validate-xiangzi-page.mjs <page.html|url>');
  process.exit(2);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(2);
});

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate));
}

function toUrl(value) {
  if (/^https?:\/\//.test(value) || value.startsWith('file://')) return value;
  return pathToFileURL(resolve(value)).href;
}

async function createTarget(port, url) {
  await waitForJson(port, '/json/version');
  const endpoint = `http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`;
  for (const method of ['PUT', 'GET']) {
    const response = await fetch(endpoint, { method }).catch(() => null);
    if (response && response.ok) return response.json();
  }
  throw new Error('Unable to create Chrome DevTools target.');
}

async function waitForJson(port, path) {
  const endpoint = `http://127.0.0.1:${port}${path}`;
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) return response.json();
    } catch {
      // Retry until Chrome exposes DevTools.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 100));
  }
  throw new Error(`Timed out waiting for ${endpoint}`);
}

async function waitForLoad(cdp) {
  await Promise.race([
    cdp.waitForEvent('Page.loadEventFired'),
    new Promise((resolveDelay) => setTimeout(resolveDelay, 2500)),
  ]);
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 150));
}

class CdpClient {
  static async connect(url) {
    const socket = new WebSocket(url);
    const client = new CdpClient(socket);
    await new Promise((resolveOpen, rejectOpen) => {
      socket.addEventListener('open', resolveOpen, { once: true });
      socket.addEventListener('error', rejectOpen, { once: true });
    });
    return client;
  }

  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.eventWaiters = new Map();
    socket.addEventListener('message', (event) => this.onMessage(event));
  }

  onMessage(event) {
    const message = JSON.parse(event.data);
    if (message.id && this.pending.has(message.id)) {
      const { resolve: resolvePending, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolvePending(message.result);
      return;
    }
    if (message.method && this.eventWaiters.has(message.method)) {
      const waiters = this.eventWaiters.get(message.method);
      this.eventWaiters.delete(message.method);
      for (const resolveWaiter of waiters) resolveWaiter(message.params || {});
    }
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolveSend, rejectSend) => {
      this.pending.set(id, { resolve: resolveSend, reject: rejectSend });
    });
  }

  waitForEvent(method) {
    return new Promise((resolveEvent) => {
      const waiters = this.eventWaiters.get(method) || [];
      waiters.push(resolveEvent);
      this.eventWaiters.set(method, waiters);
    });
  }

  close() {
    this.socket.close();
  }
}

function printResult(target, checks) {
  console.log(`Validating: ${target}`);
  console.log(`Viewport: ${VIEWPORT.width}x${VIEWPORT.height}`);
  for (const check of checks) {
    console.log(`${check.pass ? 'PASS' : 'FAIL'} [${check.id}] ${check.name}`);
    for (const detail of check.details) {
      console.log(`  - ${detail}`);
    }
  }
  const passCount = checks.filter((check) => check.pass).length;
  const status = passCount === checks.length ? 'PASS' : 'FAIL';
  console.log(`Summary: ${status} ${passCount}/${checks.length}`);
}

async function main() {
  const chromePath = findChrome();
  if (!chromePath) {
    console.error('ERROR: Chrome not found. Set CHROME_PATH or install Google Chrome.');
    process.exit(2);
  }

  const pageUrl = toUrl(input);
  const port = 9300 + Math.floor(Math.random() * 500);
  const userDataDir = await mkdtemp(`${tmpdir()}/xiangzi-validate-`);
  let chrome;

  try {
    chrome = spawn(chromePath, [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
      'about:blank',
    ], { stdio: ['ignore', 'ignore', 'pipe'] });

    const target = await createTarget(port, pageUrl);
    const cdp = await CdpClient.connect(target.webSocketDebuggerUrl);
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: VIEWPORT.width,
      height: VIEWPORT.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send('Page.navigate', { url: pageUrl });
    await waitForLoad(cdp);

    const result = await cdp.send('Runtime.evaluate', {
      expression: `(${collectChecks.toString()})(${JSON.stringify(VIEWPORT)})`,
      awaitPromise: true,
      returnByValue: true,
    });

    const checks = result.result.value;
    printResult(input, checks);
    await cdp.close();
    process.exit(checks.every((check) => check.pass) ? 0 : 1);
  } finally {
    if (chrome && !chrome.killed) chrome.kill('SIGTERM');
    await rm(userDataDir, { recursive: true, force: true });
  }
}

function collectChecks(viewport) {
  const BRAND = '#6268F0';
  const LINE = '#4D55D9';
  const INK = '#15143A';
  const PAPER = '#FAF8FF';
  const PAPER_TINT = '#EEF0FF';
  const ANNOTATION = '#7A4E2A';
  const EXPEDITIONS = {
    gold: { accent: '#E6B861', voice: 'voice-manifesto' },
    rose: { accent: '#D75C93', voice: 'voice-stage' },
    cyan: { accent: '#1FB7F0', voice: 'voice-archive' },
  };
  const ACCENTS = new Set(Object.values(EXPEDITIONS).map((profile) => profile.accent));
  const VOICE_CLASSES = new Set(Object.values(EXPEDITIONS).map((profile) => profile.voice));
  const PAPER_WHITELIST = new Set([PAPER, PAPER_TINT, '#FFFFFF', '#F5F1E8', '#F1EFEA']);
  const COLOR_WHITELIST = new Set([
    'transparent',
    BRAND,
    LINE,
    INK,
    PAPER,
    PAPER_TINT,
    ANNOTATION,
    '#FFFFFF',
    '#F5F1E8',
    '#F1EFEA',
    '#E6B861',
    '#1FB7F0',
    '#D75C93',
  ]);
  const FONT_SIZE_FIXED = new Set([40, 32, 24, 18, 16, 15, 13, 11]);
  const FONT_FAMILIES = {
    display: 'playfair display',
    body: 'inter',
    mono: 'ibm plex mono',
    hand: 'lxgw wenkai',
  };
  const CJK_RE = /[\u3400-\u9FFF\uF900-\uFAFF]/;

  const visibleElements = [...document.querySelectorAll('body *')].filter(isVisible);
  const checks = [];

  add('1', 'x- prefix for Xiangzi components', checkXPrefix());
  add('2', 'Fig. captions', checkFigCaptions());
  add('3a', 'brand-purple scale: burning state or hairline badge only', checkBrandPurpleScale());
  add('3b', 'burning brand-purple text contrast and size', checkBurningText());
  add('3c', 'paper-ground brand-purple text min 24px', checkPurpleTextSize());
  add('4a', 'x-stamp structure', checkStamp());
  add('4b', 'x-annotation max one per viewport band', checkAnnotationLimit());
  add('4c', 'x-explorer-mark count <= 4', checkExplorerLimit());
  add('5', 'accent colors only inside brand-purple containers or x-components', checkAccentContainment());
  add('6', 'color whitelist', checkColorWhitelist());
  add('7', 'H01-H06 layout coverage', checkLayouts());
  add('8', 'final tone has no internal review wording', checkTone());
  add('13', 'x evidence components present', checkXEvidenceComponents());
  add('14', 'H01-H06 unique layout sequence', checkLayoutUniqueness());
  add('15', 'font-size whitelist: 9-token Explorer Voice scale', checkFontSizeWhitelist());
  add('16', 'font-family whitelist: 5 Explorer Voice stacks', checkFontFamilyWhitelist());
  add('17', 'burning-state type purity: display or mono only', checkBurningTypePurity());
  add('18', 'body copy line-height >= 1.7', checkBodyLineHeight());
  add('19', 'CJK text must not be italic', checkNoCjkItalic());
  add('20', 'body data-expedition must use registered Expedition Profile', checkExpeditionDeclaration());
  add('21', 'rendered accent must match Expedition Profile', checkExpeditionAccent());
  add('22', 'voice classes only in burning state and one voice per page', checkVoiceClasses());

  return checks;

  function add(id, name, details) {
    checks.push({ id, name, pass: details.length === 0, details });
  }

  function checkXPrefix() {
    const componentNames = [
      'annotation',
      'stamp',
      'route',
      'explorer-mark',
      'reading-card',
      'log-header',
      'fig',
      'wash-plate',
      'specimen-grid',
      'compare',
      'margin-rail',
      'outro-manifesto',
    ];
    const details = [];
    for (const element of visibleElements) {
      for (const className of element.classList) {
        const looksLikeXComponent = componentNames.some((name) => className === name || className.endsWith(`-${name}`));
        if (looksLikeXComponent && !className.startsWith('x-')) {
          details.push(`${describe(element)} uses "${className}" instead of x- prefix`);
        }
      }
    }
    return details;
  }

  function checkFigCaptions() {
    const details = [];
    const captions = [...document.querySelectorAll('.x-fig, figcaption')].filter(isVisible);
    for (const caption of captions) {
      const text = cleanText(caption);
      if (text && !text.startsWith('Fig.')) {
        details.push(`${describe(caption)} caption must start with "Fig.": "${short(text)}"`);
      }
    }
    return details;
  }

  function checkBrandPurpleScale() {
    const details = [];
    const viewportArea = viewport.width * viewport.height;
    for (const element of visibleElements) {
      const style = getComputedStyle(element);
      if (toHex(style.backgroundColor) !== BRAND) continue;
      const rect = element.getBoundingClientRect();
      const area = rect.width * rect.height;
      const isBurning = area >= viewportArea * 0.6;
      const isBadge = rect.height <= 48;
      if (!isBurning && !isBadge) {
        details.push(`${describe(element)} middle-state brand-purple block ${Math.round(rect.width)}x${Math.round(rect.height)} area=${formatPct(area / viewportArea)}`);
      }
    }
    return details;
  }

  function checkBurningText() {
    const details = [];
    const viewportArea = viewport.width * viewport.height;
    const burningBlocks = visibleElements.filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return toHex(style.backgroundColor) === BRAND && rect.width * rect.height >= viewportArea * 0.6;
    });
    for (const block of burningBlocks) {
      const textElements = [block, ...block.querySelectorAll('*')].filter((element) => isVisible(element) && hasOwnText(element));
      for (const element of textElements) {
        const style = getComputedStyle(element);
        const color = toHex(style.color);
        const fontSize = parseFloat(style.fontSize);
        const role = fontFamilyRole(style.fontFamily);
        const minSize = role === 'mono' ? 11 : 20;
        if (!PAPER_WHITELIST.has(color) || fontSize < minSize) {
          details.push(`${describe(element)} text on burning purple must be paper color and >=${minSize}px; color=${color} font=${fontSize}px text="${short(cleanOwnText(element))}"`);
        }
      }
    }
    return details;
  }

  function checkPurpleTextSize() {
    const details = [];
    for (const element of visibleElements) {
      if (!hasOwnText(element)) continue;
      const style = getComputedStyle(element);
      const color = toHex(style.color);
      const fontSize = parseFloat(style.fontSize);
      if (color === BRAND && !hasBrandPurpleBackgroundAncestor(element) && fontSize < 24) {
        details.push(`${describe(element)} paper-ground brand-purple text must be >=24px; font=${fontSize}px text="${short(cleanOwnText(element))}"`);
      }
    }
    return details;
  }

  function checkStamp() {
    const details = [];
    const stamps = [...document.querySelectorAll('.x-stamp')].filter(isVisible);
    if (stamps.length === 0) {
      details.push('missing .x-stamp');
      return details;
    }
    for (const stamp of stamps) {
      if (stamp.tagName.toLowerCase() !== 'svg') {
        details.push(`${describe(stamp)} x-stamp must be an SVG`);
        continue;
      }
      if (stamp.querySelectorAll('circle').length === 0) {
        details.push(`${describe(stamp)} x-stamp must include circle outlines`);
      }
      if (!/VERIFIED|LOGGED BY/.test(stamp.textContent || '')) {
        details.push(`${describe(stamp)} x-stamp text must include VERIFIED or LOGGED BY`);
      }
      for (const circle of stamp.querySelectorAll('circle')) {
        const fill = toHex(getComputedStyle(circle).fill);
        if (fill !== 'transparent') {
          details.push(`${describe(circle)} x-stamp circles must not be filled; fill=${fill}`);
        }
      }
    }
    return details;
  }

  function checkAnnotationLimit() {
    const details = [];
    const annotations = [...document.querySelectorAll('.x-annotation')].filter(isVisible);
    const byBand = new Map();
    for (const annotation of annotations) {
      const rect = annotation.getBoundingClientRect();
      const band = Math.floor(Math.max(0, rect.top + window.scrollY) / viewport.height);
      byBand.set(band, (byBand.get(band) || 0) + 1);
    }
    for (const [band, count] of byBand.entries()) {
      if (count > 1) details.push(`viewport band ${band} has ${count} annotations; max is 1`);
    }
    return details;
  }

  function checkExplorerLimit() {
    const count = [...document.querySelectorAll('.x-explorer-mark')].filter(isVisible).length;
    return count <= 4 ? [] : [`x-explorer-mark count=${count}; max is 4`];
  }

  function checkAccentContainment() {
    const details = [];
    for (const element of visibleElements) {
      const style = getComputedStyle(element);
      const hits = colorPropsFor(element, style)
        .map((prop) => [prop, toHex(style[prop])])
        .filter(([, color]) => ACCENTS.has(color));
      if (hits.length > 0 && !hasBrandPurpleBackgroundAncestor(element) && !hasXComponentContext(element)) {
        details.push(`${describe(element)} accent on paper/outside purple: ${hits.map(([prop, color]) => `${prop}=${color}`).join(', ')}`);
      }
    }
    return details;
  }

  function checkColorWhitelist() {
    const details = [];
    for (const element of visibleElements) {
      const style = getComputedStyle(element);
      for (const prop of colorPropsFor(element, style)) {
        const color = toHex(style[prop]);
        if (!COLOR_WHITELIST.has(color)) {
          details.push(`${describe(element)} ${prop}=${color} is outside whitelist`);
          break;
        }
      }
    }
    return details.slice(0, 20);
  }

  function colorPropsFor(element, style) {
    const props = ['color', 'backgroundColor'];
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      if (parseFloat(style[`border${side}Width`]) > 0) props.push(`border${side}Color`);
    }
    if (element instanceof SVGElement && element.tagName.toLowerCase() !== 'svg') props.push('fill', 'stroke');
    return props;
  }

  function checkLayouts() {
    const details = [];
    const expected = ['H01', 'H02', 'H03', 'H04', 'H05', 'H06'];
    for (const layout of expected) {
      const count = document.querySelectorAll(`[data-layout="${layout}"]`).length;
      if (count !== 1) details.push(`${layout} count=${count}; expected 1`);
    }
    const unexpected = [...document.querySelectorAll('[data-layout]')]
      .map((element) => element.getAttribute('data-layout'))
      .filter((layout) => !expected.includes(layout));
    for (const layout of unexpected) details.push(`unexpected data-layout="${layout}"`);
    return details;
  }

  function checkTone() {
    const details = [];
    const forbidden = /招聘方读到的是|招聘方 get 到的是|服务视角|内部检查|service-note|internal-note/;
    const text = document.documentElement.textContent || '';
    const match = text.match(forbidden);
    if (match) details.push(`forbidden wording: "${match[0]}"`);
    if (document.querySelector('.service-note, .internal-note')) {
      details.push('forbidden internal review class exists');
    }
    return details;
  }

  function checkXEvidenceComponents() {
    const details = [];
    const required = ['x-explorer-mark', 'x-annotation', 'x-stamp', 'x-fig', 'x-reading-card'];
    for (const className of required) {
      const count = [...document.querySelectorAll(`.${className}`)].filter(isVisible).length;
      if (count === 0) details.push(`missing .${className}`);
    }
    return details;
  }

  function checkLayoutUniqueness() {
    const details = [];
    const layouts = [...document.querySelectorAll('[data-layout]')]
      .filter(isVisible)
      .map((element) => element.getAttribute('data-layout'));
    const expected = ['H01', 'H02', 'H03', 'H04', 'H05', 'H06'];
    if (layouts.length !== expected.length) {
      details.push(`layout node count=${layouts.length}; expected ${expected.length}`);
    }
    for (const layout of expected) {
      const count = layouts.filter((item) => item === layout).length;
      if (count !== 1) details.push(`${layout} count=${count}; expected unique 1`);
    }
    return details;
  }

  function checkFontSizeWhitelist() {
    const details = [];
    for (const element of textBearingElements()) {
      const style = getComputedStyle(element);
      const fontSize = parseFloat(style.fontSize);
      if (!Number.isFinite(fontSize)) continue;
      if (fontSizeAllowed(fontSize, style)) continue;
      details.push(`${describe(element)} font-size=${formatPx(fontSize)} outside Explorer Voice scale; text="${short(cleanOwnText(element) || cleanText(element))}"`);
    }
    return details.slice(0, 30);
  }

  function checkFontFamilyWhitelist() {
    const details = [];
    for (const element of textBearingElements()) {
      const style = getComputedStyle(element);
      if (fontFamilyRole(style.fontFamily)) continue;
      details.push(`${describe(element)} font-family=${style.fontFamily} outside Explorer Voice stacks; text="${short(cleanOwnText(element) || cleanText(element))}"`);
    }
    return details.slice(0, 30);
  }

  function checkBurningTypePurity() {
    const details = [];
    const burningBlocks = visibleElements.filter(isBrandPurpleBlock);
    for (const block of burningBlocks) {
      const textNodes = [block, ...block.querySelectorAll('*')]
        .filter((element) => isVisible(element) && hasOwnText(element));
      for (const element of textNodes) {
        const style = getComputedStyle(element);
        const role = fontFamilyRole(style.fontFamily);
        const fontSize = parseFloat(style.fontSize);
        const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
        const minDisplaySize = element.closest('.voice-archive') ? 40 : 48;
        const allowedDisplay = role === 'display' && fontWeight >= 800 && fontSize >= minDisplaySize;
        const allowedMono = role === 'mono';
        if (!allowedDisplay && !allowedMono) {
          details.push(`${describe(element)} in brand-purple uses ${style.fontFamily}, weight=${style.fontWeight}, size=${formatPx(fontSize)}; only L1 display or L4 mono allowed`);
        }
      }
    }
    return details.slice(0, 30);
  }

  function checkBodyLineHeight() {
    const details = [];
    const elements = [...document.querySelectorAll('p, li')].filter((element) => isVisible(element) && cleanText(element));
    for (const element of elements) {
      const style = getComputedStyle(element);
      const role = fontFamilyRole(style.fontFamily);
      if (role === 'mono' || role === 'hand') continue;
      const fontSize = parseFloat(style.fontSize);
      const lineHeight = parseLineHeight(style.lineHeight, fontSize);
      if (!Number.isFinite(lineHeight) || lineHeight < 1.7) {
        details.push(`${describe(element)} line-height=${style.lineHeight} ratio=${Number.isFinite(lineHeight) ? lineHeight.toFixed(2) : 'normal'}; text="${short(cleanText(element))}"`);
      }
    }
    return details.slice(0, 30);
  }

  function checkNoCjkItalic() {
    const details = [];
    for (const element of textBearingElements()) {
      const style = getComputedStyle(element);
      if (!/italic|oblique/.test(style.fontStyle)) continue;
      const text = cleanOwnText(element) || cleanText(element);
      if (CJK_RE.test(text)) {
        details.push(`${describe(element)} italic CJK text is forbidden; text="${short(text)}"`);
      }
    }
    return details;
  }

  function checkExpeditionDeclaration() {
    const value = expeditionValue();
    if (!value) return ['body missing data-expedition'];
    if (!EXPEDITIONS[value]) return [`body data-expedition="${value}" is not registered; expected ${Object.keys(EXPEDITIONS).join('|')}`];
    return [];
  }

  function checkExpeditionAccent() {
    const details = [];
    const bodyProfile = expeditionProfile();
    const profile = bodyProfile || misplacedExpeditionProfile();
    let seenExpected = false;
    if (!bodyProfile && profile) {
      details.push(`body has no valid data-expedition; found misplaced ${profile.source} data-expedition="${profile.key}"`);
    }
    for (const element of visibleElements) {
      const style = getComputedStyle(element);
      for (const [prop, color] of accentHitsFor(element, style)) {
        if (profile && color === profile.accent) {
          seenExpected = true;
          continue;
        }
        const expected = profile ? `expected ${profile.accent} for data-expedition="${profile.key}"` : 'no valid body data-expedition';
        details.push(`${describe(element)} ${prop}=${color}; ${expected}`);
      }
    }
    if (!profile) {
      if (details.length === 0) details.push('body has no valid data-expedition; accent cannot be verified');
      return details.slice(0, 30);
    }
    if (!seenExpected) details.push(`data-expedition="${profile.key}" expects ${profile.accent}, but no matching accent is rendered`);
    return details.slice(0, 30);
  }

  function checkVoiceClasses() {
    const details = [];
    const voiceElements = [...document.querySelectorAll('.voice-manifesto,.voice-stage,.voice-archive')].filter(isVisible);
    const voices = new Set();
    for (const element of voiceElements) {
      const elementVoices = [...element.classList].filter((className) => VOICE_CLASSES.has(className));
      for (const voice of elementVoices) voices.add(voice);
      if (!isVoiceBurningContainer(element)) {
        details.push(`${describe(element)} uses ${elementVoices.map((voice) => `.${voice}`).join(', ')} outside a brand-purple burning container`);
      }
    }
    if (voiceElements.length === 0) details.push('missing .voice-manifesto/.voice-stage/.voice-archive on burning-state container');
    if (voices.size > 1) details.push(`multiple voice classes rendered: ${[...voices].join(', ')}`);
    const profile = expeditionProfile();
    if (profile && voices.size === 1 && !voices.has(profile.voice)) {
      details.push(`data-expedition="${profile.key}" requires .${profile.voice}; found .${[...voices][0]}`);
    }
    return details;
  }

  function hasBrandPurpleBackgroundAncestor(element) {
    for (let current = element; current && current.nodeType === 1; current = current.parentElement) {
      if (toHex(getComputedStyle(current).backgroundColor) === BRAND) return true;
    }
    return false;
  }

  function hasXComponentContext(element) {
    for (let current = element; current && current.nodeType === 1; current = current.parentElement) {
      if ([...current.classList].some((className) => className.startsWith('x-'))) return true;
    }
    return false;
  }

  function isBrandPurpleBlock(element) {
    const style = getComputedStyle(element);
    return toHex(style.backgroundColor) === BRAND;
  }

  function isVoiceBurningContainer(element) {
    if (!isBrandPurpleBlock(element)) return false;
    return ['hero', 'act-cover', 'x-act-cover', 'x-outro-manifesto'].some((className) => element.classList.contains(className));
  }

  function textBearingElements() {
    return visibleElements.filter((element) => {
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(element.tagName)) return false;
      if (element instanceof SVGElement && !['text', 'tspan'].includes(element.tagName.toLowerCase())) return false;
      return hasOwnText(element);
    });
  }

  function fontSizeAllowed(fontSize, style) {
    if (FONT_SIZE_FIXED.has(Math.round(fontSize)) && Math.abs(fontSize - Math.round(fontSize)) <= 0.35) return true;
    const role = fontFamilyRole(style.fontFamily);
    return fontSize >= 48 && fontSize <= 120 && (role === 'display' || role === 'mono');
  }

  function expeditionValue() {
    return (document.body?.getAttribute('data-expedition') || '').trim();
  }

  function expeditionProfile() {
    const key = expeditionValue();
    return EXPEDITIONS[key] ? { key, ...EXPEDITIONS[key] } : null;
  }

  function misplacedExpeditionProfile() {
    const node = [...document.querySelectorAll('[data-expedition]')].find((element) => element !== document.body && EXPEDITIONS[(element.getAttribute('data-expedition') || '').trim()]);
    if (!node) return null;
    const key = (node.getAttribute('data-expedition') || '').trim();
    return { key, source: describe(node), ...EXPEDITIONS[key] };
  }

  function accentHitsFor(element, style) {
    const hits = [];
    for (const prop of colorPropsFor(element, style)) {
      const color = toHex(style[prop]);
      if (ACCENTS.has(color)) hits.push([prop, color]);
    }
    for (const prop of ['boxShadow', 'textShadow']) {
      for (const color of extractHexColors(style[prop])) {
        if (ACCENTS.has(color)) hits.push([prop, color]);
      }
    }
    return dedupeHits(hits);
  }

  function extractHexColors(value) {
    const matches = String(value || '').match(/#[0-9a-fA-F]{3,6}|rgba?\([^)]+\)/g) || [];
    return matches.map(toHex);
  }

  function dedupeHits(hits) {
    const seen = new Set();
    return hits.filter(([prop, color]) => {
      const key = `${prop}:${color}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function fontFamilyRole(fontFamily) {
    const normalized = normalizeFontFamily(fontFamily);
    if (normalized.includes(FONT_FAMILIES.mono)) return 'mono';
    if (normalized.includes(FONT_FAMILIES.hand)) return 'hand';
    if (normalized.includes(FONT_FAMILIES.body)) return 'body';
    if (normalized.includes(FONT_FAMILIES.display)) return 'display';
    return '';
  }

  function normalizeFontFamily(fontFamily) {
    return String(fontFamily || '').toLowerCase().replace(/["']/g, '').replace(/\s+/g, ' ').trim();
  }

  function parseLineHeight(lineHeight, fontSize) {
    if (!lineHeight || lineHeight === 'normal') return Number.NaN;
    if (lineHeight.endsWith('px')) return parseFloat(lineHeight) / fontSize;
    const numeric = Number.parseFloat(lineHeight);
    return Number.isFinite(numeric) ? numeric : Number.NaN;
  }

  function formatPx(value) {
    if (!Number.isFinite(value)) return String(value);
    return `${Number.isInteger(value) ? value : value.toFixed(2)}px`;
  }

  function hasOwnText(element) {
    return cleanOwnText(element).length > 0;
  }

  function cleanText(element) {
    return (element.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function cleanOwnText(element) {
    return [...element.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function short(text) {
    return text.length > 44 ? `${text.slice(0, 41)}...` : text;
  }

  function isVisible(element) {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
  }

  function toHex(value) {
    if (!value || value === 'transparent' || value === 'none') return 'transparent';
    if (value.startsWith('#')) {
      const raw = value.toUpperCase();
      if (raw.length === 4) return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`;
      return raw.slice(0, 7);
    }
    const match = value.match(/rgba?\(([^)]+)\)/);
    if (!match) return value;
    const parts = match[1].split(',').map((part) => part.trim());
    const alpha = parts[3] === undefined ? 1 : Number(parts[3]);
    if (alpha === 0) return 'transparent';
    const [r, g, b] = parts.slice(0, 3).map((part) => Math.round(Number(part)));
    return `#${[r, g, b].map((num) => num.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
  }

  function describe(element) {
    const tag = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const classes = [...element.classList].slice(0, 3).map((className) => `.${className}`).join('');
    const layout = element.getAttribute('data-layout') ? `[data-layout="${element.getAttribute('data-layout')}"]` : '';
    return `${tag}${id}${classes}${layout}`;
  }

  function formatPct(value) {
    return `${(value * 100).toFixed(1)}%`;
  }
}
