# 首页版式定义(Homepage Layouts)

首页只允许 H00-H06 这 7 段固定版式,其中 H00 为可跳过的开屏组件,不进入正文信息架构。需要扩展时先更新本文件和 `assets/template.html` 的组件系统,再进入页面。

所有骨架只使用 `template.html` 已有类名、`x-` 组件和主题 token。不要为首页临时新增 class。

---

## H00 启程开屏

`x-intro` 只在首页实例化,项目页禁止出现。组件作为 `template#x-intro-template` 注册在母版里,只有 `body[data-page="home"]` 且 `sessionStorage.getItem('expedition-entered') !== '1'` 时克隆渲染。

硬性行为:
- `x-intro` 不占用 `data-layout`;H01-H06 仍只用于首页主体骨架校验。
- 全屏 `--brand-purple` 铺底,等高线纹理从 `assets/x-intro-contours.svg` 引入,透明度不高于 8%。
- 罗盘外环 10s 顺时针、刻度 5s 逆时针,只使用 CSS transform 动画。
- 主标 0.5s、副标 1s、按钮 2s 三拍渐入;按钮可交互时点必须小于等于 3500ms。
- 按钮文案固定为 `BEGIN EXPEDITION ↗`;1.5px 纸白细线边框,hover 纸白底紫字。
- 点击进入后整层 `scale(1.6)` + `opacity:0`,900ms 后 `display:none` 并移除。
- 按钮出现前任意 click/keydown/wheel 立即执行同一转场。
- `prefers-reduced-motion: reduce` 时不播放动画,静态展示 1 秒自动进入。
- H00 内只允许 `--brand-purple` 与纸色白名单,不得使用 accent。

---

## H01 品牌核心首屏

主图核心视觉 + 代表紫发散流程 + `x-explorer-mark` + `x-log-header` 元信息行。用户提供个人主图时,先让主图成为首屏第一视觉,再把颜色发散到字体、主线和组件。

```html
<section class="act-cover is-brand-core" id="hero" data-layout="H01">
  <div class="hero-copy">
    <div class="x-log-header">
      <span class="x-log-header__entry">ENTRY H01 · BRAND CORE</span>
      <span class="x-log-header__meta">SOURCE · 主图文件名</span>
    </div>
    <svg class="x-explorer-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 4c2 0 4 1.5 4 3.6 0 1.5-.8 2.7-2 3.3"></path>
      <path d="M14 11l-4 2-2 7"></path>
      <path d="M11 13l4 7"></path>
      <path d="M9 15l-4 2"></path>
      <path d="M12 6l-5 1.5"></path>
    </svg>
    <h2>把代表紫变成一套可执行的作品集品牌系统。</h2>
    <p class="act-sub">核心视觉从主图出发:先锁定代表色,再发散到正文墨色、主线颜色、组件强调和辅助色。</p>
    <div class="brand-flow" aria-label="品牌色系发散流程">
      <div class="brand-flow__item">
        <div class="brand-flow__swatch" style="background:var(--brand-purple)"></div>
        <div class="brand-flow__label">Core Visual</div>
        <div class="brand-flow__name">代表紫</div>
        <div class="brand-flow__hex">#6268F0</div>
      </div>
      <div class="brand-flow__item">
        <div class="brand-flow__swatch" style="background:var(--ink)"></div>
        <div class="brand-flow__label">Text Ink</div>
        <div class="brand-flow__name">正文墨色</div>
        <div class="brand-flow__hex">#15143A</div>
      </div>
      <div class="brand-flow__item">
        <div class="brand-flow__swatch" style="background:var(--line-purple)"></div>
        <div class="brand-flow__label">Main Line</div>
        <div class="brand-flow__name">主线蓝紫</div>
        <div class="brand-flow__hex">#4D55D9</div>
      </div>
      <div class="brand-flow__item">
        <div class="brand-flow__swatch" style="background:var(--accent-current)"></div>
        <div class="brand-flow__label">Component Accent</div>
        <div class="brand-flow__name">当前考察副色</div>
        <div class="brand-flow__hex">Expedition Accent</div>
      </div>
    </div>
  </div>
  <figure class="brand-core">
    <div class="brand-core__image">
      <img src="assets/explorer-brand-core.jpg" alt="个人品牌主视觉">
    </div>
    <figcaption class="brand-core__caption">Brand core image -> color token -> text, lines, components, annotations.</figcaption>
  </figure>
</section>
```

---

## H02 读数条

4-5 个 `x-reading-card` 横排,用项目总览数字建立首页第一层可信度。

```html
<section class="section" data-layout="H02">
  <div class="x-log-header">
    <span class="x-log-header__entry">ENTRY H02 · READINGS</span>
    <span class="x-log-header__meta">MEASURED · PORTFOLIO INDEX</span>
  </div>
  <div class="pipeline" data-cols="5">
    <div class="x-reading-card">
      <div class="x-reading-card__label">MEASURED · PROJECTS</div>
      <div class="x-reading-card__num">04</div>
      <div class="x-reading-card__note">已整理项目数。</div>
    </div>
    <div class="x-reading-card">
      <div class="x-reading-card__label">MEASURED · YEARS</div>
      <div class="x-reading-card__num">03<span class="x-reading-card__unit">y</span></div>
      <div class="x-reading-card__note">持续实践周期。</div>
    </div>
    <div class="x-reading-card">
      <div class="x-reading-card__label">MEASURED · METHODS</div>
      <div class="x-reading-card__num">12</div>
      <div class="x-reading-card__note">可复用方法节点。</div>
    </div>
    <div class="x-reading-card">
      <div class="x-reading-card__label">MEASURED · NOTES</div>
      <div class="x-reading-card__num">48</div>
      <div class="x-reading-card__note">过程记录与截图。</div>
    </div>
    <div class="x-reading-card">
      <div class="x-reading-card__label">MEASURED · PROOFS</div>
      <div class="x-reading-card__num">96</div>
      <div class="x-reading-card__note">可追溯证据位。</div>
    </div>
  </div>
</section>
```

---

## H03 考察路线图

`x-route` 横贯虚线 + 4 个项目节点 + `x-explorer-mark` 停在最新节点。

```html
<section class="section" data-layout="H03">
  <div class="x-log-header">
    <span class="x-log-header__entry">ENTRY H03 · ROUTE MAP</span>
    <span class="x-log-header__meta">FIELD ROUTE · LATEST NODE</span>
  </div>
  <svg class="x-route" viewBox="0 0 640 120" role="img" aria-label="考察路线图">
    <path d="M40 70 C180 20 280 110 420 60 S560 50 600 78"></path>
    <circle cx="40" cy="70" r="5"></circle>
    <circle cx="220" cy="64" r="5"></circle>
    <circle cx="420" cy="60" r="5"></circle>
    <circle cx="600" cy="78" r="5"></circle>
  </svg>
  <div class="pipeline" data-cols="4">
    <div class="step"><div class="nb">01</div><div class="title">AI 火种车</div><div class="desc">品牌系统与落地物料。</div></div>
    <div class="step"><div class="nb">02</div><div class="title">KA21</div><div class="desc">少儿春晚视觉证据链。</div></div>
    <div class="step"><div class="nb">03</div><div class="title">Skill 设计</div><div class="desc">把规则变成可执行门禁。</div></div>
    <div class="step"><div class="nb">04</div><div class="title">最新考察 <svg class="x-explorer-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 4c2 0 4 1.5 4 3.6 0 1.5-.8 2.7-2 3.3"></path><path d="M14 11l-4 2-2 7"></path><path d="M11 13l4 7"></path><path d="M9 15l-4 2"></path><path d="M12 6l-5 1.5"></path></svg></div><div class="desc">新项目入口占位。</div></div>
  </div>
</section>
```

---

## H04 项目标本架

`x-specimen-grid` 放 4 个项目卡,每卡含封面图占位 + `EXPEDITION 01` 等宽编号 + 一句话 + 链接。

```html
<section class="section" data-layout="H04">
  <div class="x-log-header">
    <span class="x-log-header__entry">ENTRY H04 · SPECIMEN SHELF</span>
    <span class="x-log-header__meta">PROJECT SPECIMENS · 4 ITEMS</span>
  </div>
  <div class="x-specimen-grid">
    <figure class="x-specimen-grid__item">
      <div class="img-placeholder r-16x9"><div class="plus">+</div><div class="label">封面图占位</div><div class="meta">Cover · 16:9</div></div>
      <figcaption>EXPEDITION 01<br>AI 火种车品牌系统。<br><a href="#">Open Field Note</a></figcaption>
    </figure>
    <figure class="x-specimen-grid__item">
      <div class="img-placeholder r-16x9"><div class="plus">+</div><div class="label">封面图占位</div><div class="meta">Cover · 16:9</div></div>
      <figcaption>EXPEDITION 02<br>KA21 舞台视觉证据链。<br><a href="#">Open Field Note</a></figcaption>
    </figure>
    <figure class="x-specimen-grid__item">
      <div class="img-placeholder r-16x9"><div class="plus">+</div><div class="label">封面图占位</div><div class="meta">Cover · 16:9</div></div>
      <figcaption>EXPEDITION 03<br>Skill 规则系统设计。<br><a href="#">Open Field Note</a></figcaption>
    </figure>
    <figure class="x-specimen-grid__item">
      <div class="img-placeholder r-16x9"><div class="plus">+</div><div class="label">封面图占位</div><div class="meta">Cover · 16:9</div></div>
      <figcaption>EXPEDITION 04<br>下一个探索项目。<br><a href="#">Open Field Note</a></figcaption>
    </figure>
  </div>
</section>
```

---

## H05 方法陈列

方法论关键词标签墙,使用 `x-annotation` 与 `x-compare`。

```html
<section class="section" data-layout="H05">
  <div class="x-log-header">
    <span class="x-log-header__entry">ENTRY H05 · METHOD CASE</span>
    <span class="x-log-header__meta">ANNOTATED · COMPARISON</span>
  </div>
  <aside class="x-annotation" style="width:auto;max-width:34em;margin:0 0 4vh;transform:none;padding:1.4vh 0 0;border-left:0;border-top:1px dashed rgba(var(--ink-rgb),.22)">方法不是口号,而是每个项目里反复出现的判断动作。</aside>
  <div class="pipeline" data-cols="5">
    <div class="step"><div class="title">先看现场</div></div>
    <div class="step"><div class="title">证据落位</div></div>
    <div class="step"><div class="title">模板激活</div></div>
    <div class="step"><div class="title">保义压缩</div></div>
    <div class="step"><div class="title">浏览器验收</div></div>
  </div>
  <div class="x-compare">
    <section class="x-compare__sample">
      <div class="x-compare__label">SAMPLE A</div>
      <p class="body">旧写法只说“我做了设计”,读者需要自己猜过程和证据。</p>
    </section>
    <section class="x-compare__sample">
      <div class="x-compare__label">SAMPLE B</div>
      <p class="body">新写法把现场、动作、证据和结果放在同一个检查链里。</p>
    </section>
  </div>
</section>
```

---

## H06 关于与签名

自述占位 + 简历入口占位 + `x-stamp` 签名 `LOGGED BY 箱子`。

```html
<section class="x-outro-manifesto" data-layout="H06">
  <div class="x-log-header">
    <span class="x-log-header__entry">ENTRY H06 · ABOUT</span>
    <span class="x-log-header__meta">LOGGED · BY XIANGZI</span>
  </div>
  <blockquote>我是箱子,把设计项目整理成能被独立阅读的探索记录。</blockquote>
  <div class="x-outro-manifesto__grid">
    <article class="x-outro-manifesto__card">自述占位:这里写我如何观察现场、组织证据、把项目讲清楚。</article>
    <article class="x-outro-manifesto__card">简历入口占位:<br><a href="#">Download Resume</a></article>
    <article class="x-outro-manifesto__card">联系入口占位:<br><a href="#">Contact / Email</a></article>
  </div>
  <svg class="x-stamp" viewBox="0 0 120 120" role="img" aria-label="LOGGED BY 箱子">
    <circle cx="60" cy="60" r="48"></circle>
    <circle cx="60" cy="60" r="38"></circle>
    <text x="60" y="57" text-anchor="middle">LOGGED BY</text>
    <text x="60" y="75" text-anchor="middle">箱子</text>
  </svg>
</section>
```
