# Explorer Voice Typography

颜色定的是温度,字体定的是声音。本系统的目标只有一句话:让字在燃烧态里喊得出来,在正文区里说得严谨,在批注栏里轻得下来。

本文件是 `magazine-portfolio-skill` 的字体系统唯一出处。不得自行增删层级,不得在页面里私造字号或临时字体栈。

---

## 五层字体系统 v2

### L1 燃烧层 DISPLAY · 喊

- 中文:`Noto Serif SC Black`(900)
- 西文:`Playfair Display Black / Italic`
- 用途:章节封面大字、Hero 宣言、收尾宣言
- 规格:`clamp(48px, 8vw, 120px)`,行高 `1.05-1.15`,字重 900,纸白色;只允许西文单词级 Italic 强调
- 气质:衬线 Black 在高饱和底色上形成海报级冲击,同时保留文人骨架,对应“炙热但有据可依”

### L2 标题层 TITLE · 说重点

- 中文:`Noto Serif SC Bold`(700)
- 西文:`Playfair Display Bold`
- 用途:纸色正文区主标题、段主标、副标题
- 规格:24-40px,行高 `1.3`,颜色 `--ink`
- 与 L1 的关系:同族不同重;燃烧层和标题层是同一个声音的两种音量,不能换成另一套人格

### L3 正文层 BODY · 讲清楚

- 中文:`Noto Sans SC`(400/500)
- 西文:`Inter`(400/500)
- 用途:正文段落、列表、解释性注释、正文区卡片内容
- 规格:16-18px,中文长文行高必须 `>=1.7`,颜色 `--ink`,段间距 `>=1em`
- 禁止:中文网页正文禁止 `text-align: justify`;两端对齐会制造河流

### L4 仪器层 INSTRUMENT · 报读数

- 中西文统一:`IBM Plex Mono`(400/600)
- 用途:`x-log-header`、`x-fig` 图号、`x-reading-card` 标签、`x-stamp` 戳记文字、时间戳、刻度
- 规格:11-13px,`letter-spacing: 0.08em`,英文全大写,颜色 `--ink` 或发丝态紫
- 规则:仪器层永远小、永远等宽、永远不抢戏。它越冷静,燃烧层显得越热

### L5 批注层 HAND · 轻声说

- 中文:`LXGW WenKai`(霞鹜文楷)
- 用途:手写批注、边注、少量旁白
- 规格:15-17px,行高 `1.6`,颜色 `--annotation` 批注棕
- 上限:每 section `<=1`,全页 `<=8`

## 字号阶梯 Token

全站只有这 9 级字号。除 `--fs-display` 的 clamp 计算值外,任何元素的最终 `font-size` 都必须命中固定值。

```css
:root {
  /* Type Scale · 1.25 modular */
  --fs-display: clamp(48px, 8vw, 120px);
  --fs-h1: 40px;
  --fs-h2: 32px;
  --fs-h3: 24px;
  --fs-body-lg: 18px;
  --fs-body: 16px;
  --fs-annotation: 15px;
  --fs-caption: 13px;
  --fs-meta: 11px;

  /* Font Family tokens */
  --font-display: "Playfair Display", "Noto Serif SC", serif;
  --font-title: "Playfair Display", "Noto Serif SC", serif;
  --font-body: "Inter", "Noto Sans SC", sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --font-hand: "LXGW WenKai", "Noto Serif SC", serif;

  /* Line Heights */
  --lh-display: 1.1;
  --lh-title: 1.3;
  --lh-body: 1.75;
  --lh-mono: 1.5;
}
```

---

## 配紫规则

| 场景 | 字体层 | 颜色 | 理由 |
|---|---|---|---|
| 紫底燃烧态 | 只允许 L1 + L4 | 纸白 | 大衬线喊话 + 小等宽标注,中间层进紫底会糊 |
| 纸底大数字(`>=48px`) | L4 等宽放大或 L1 | `#6268F0` | 大字号豁免,等宽数字做读数感 |
| 纸底正文强调 | L3 加重(500 -> 700) | `--line-purple` 深紫 | 字重做强调,不靠荧光色硬提亮 |
| 批注 | L5 | 批注棕,永不紫 | 温柔层保持颜色独立性 |

## 禁区清单

- `.x-act-cover`/旧母版 `.act-cover` 与 `.x-outro-manifesto` 属于燃烧态容器;标题必须使用 L1,小标注必须使用 L4。
- 背景为 `--brand-purple` 的燃烧态容器内出现 L2/L3 字体栈。
- 阶梯外野字号,例如 `19px`、`14px`、`1.2vw` 单独裸写。
- 栈外字体名,例如 `SimSun`、`Songti SC` 或临时系统字体覆盖。
- 中文文本使用 `font-style: italic` 或浏览器伪斜体。
- 正文 `p`/`li` 的行高低于 `1.7`。

---

## 中文排版硬规则

1. 中文不用斜体。强调用字重,或在少量批注里切换到 L5。
2. 中英混排时英文和数字一律用西文字体优先渲染,靠字体栈顺序天然实现;禁止全段套中文字体。
3. 标点悬挂不强求,但行首禁止出现句号、逗号;页面根部使用 `line-break: strict`。
4. L1 燃烧大字若全中文,字号上限降一档;中文笔画密,等视觉冲击不需要无限放大。
5. 数字出现在正文里时启用 `font-variant-numeric: tabular-nums`,读数卡和数据列必须对齐。

---

## 字体加载策略

- 全部字体走 Google Fonts / woff2,请求使用 `display=swap`,避免第一屏白屏。
- 预加载标题与燃烧层需要的 `Playfair Display 700/900`、`Noto Serif SC 700/900`。
- 正文加载 `Inter 400/500`;中文正文优先系统栈 fallback,网页字体到达前先用系统字渲染。
- `IBM Plex Mono 400/600` 服务仪器层,不得扩展成正文字体。
- `LXGW WenKai 400` 只服务批注层;批注总字数少,不得为正文全量加载手写字体。
