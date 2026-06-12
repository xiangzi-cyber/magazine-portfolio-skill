# 箱子探索者手记 x-组件手册

> 这些组件配合第 6 套主题「电紫 Explorer Violet」使用。所有组件统一使用 `x-` 前缀,只引用模板 token,不写独立颜色。

品牌色落位:

- 核心视觉: `--brand-purple`,来自主图大面积背景紫,只用于 Hero、关键数字、active 状态和少量高识别按钮。
- 主线系统: `--line-purple`,用于路径、边框、分隔线、组件标题和长期可读的强调字。
- 正文墨色: `--ink`,用于大段文本,不要用荧光紫承载长正文。
- 辅助色:项目页只能通过 `--accent-current` 使用当前考察档案的副色,小面积用于状态点、分类标签、图钉或证据类型;不得在同页混用 `--accent-gold` / `--accent-cyan` / `--accent-rose`。
- 背景承托: `--wash-violet`,用于 Hero、引用块和图片托底,透明度要低。

---

## x-log-header

段顶日志头。等宽字体,用于把一个段落标成探索手记里的 entry。

```html
<div class="x-log-header">
  <span class="x-log-header__entry">ENTRY 2B · FIELD LOG</span>
  <span class="x-log-header__meta">MEASURED · 2026.06.10</span>
</div>
```

---

## x-reading-card

读数卡。数字使用 `--brand-purple`,上方等宽小标签和顶边使用 `--accent-current`,1px `--line-purple` 边框,无阴影无圆角。

```html
<div class="x-reading-card">
  <div class="x-reading-card__label">MEASURED · 2026.06.10</div>
  <div class="x-reading-card__num">12<span class="x-reading-card__unit">h</span></div>
  <div class="x-reading-card__note">从素材到可交付页面的压缩时间。</div>
</div>
```

---

## x-fig

图号说明。图片下方 caption,等宽字体,文本必须以 `Fig.` 开头。

```html
<p class="x-fig">Fig. 02 · 过程截图,说明这张图对应哪一个判断。</p>
```

---

## x-annotation

页边批注。字体使用霞鹜文楷,颜色使用 `--annotation`;桌面端放在右侧批注栏,移动端转为正文下方。

```html
<aside class="x-annotation">
  这里保留箱子的手记口吻:先看到现场,再决定页面怎么讲。
</aside>
```

---

## x-stamp

检查点戳记。纯 SVG 细线圆形戳,内文格式为 `VERIFIED · {阶段名}`,描边使用 `--line-purple`,图形不填充。

```html
<svg class="x-stamp" viewBox="0 0 120 120" role="img" aria-label="VERIFIED · V5">
  <circle cx="60" cy="60" r="48"></circle>
  <circle cx="60" cy="60" r="38"></circle>
  <text x="60" y="57" text-anchor="middle">VERIFIED</text>
  <text x="60" y="75" text-anchor="middle">V5</text>
</svg>
```

---

## x-route

虚线路径。SVG 虚线 + 圆点节点,用于章节转场或方法路径。路径使用 `--line-purple`,节点使用 `--accent-current`。

```html
<svg class="x-route" viewBox="0 0 640 120" role="img" aria-label="章节路径">
  <path d="M40 70 C180 20 280 110 420 60 S560 50 600 78"></path>
  <circle cx="40" cy="70" r="5"></circle>
  <circle cx="320" cy="78" r="5"></circle>
  <circle cx="600" cy="78" r="5"></circle>
</svg>
```

---

## x-explorer-mark

探索者剪影。24px 内联 SVG 细线人形侧影占位,颜色使用 `--accent-current`;后续可按考察档案替换为定制姿态。

```html
<svg class="x-explorer-mark" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M13 4c2 0 4 1.5 4 3.6 0 1.5-.8 2.7-2 3.3"></path>
  <path d="M14 11l-4 2-2 7"></path>
  <path d="M11 13l4 7"></path>
  <path d="M9 15l-4 2"></path>
  <path d="M12 6l-5 1.5"></path>
</svg>
```

---

## x-wash-plate

水彩承托板。背景使用 `--wash-violet`,边缘做 8-12px 不规则晕染;内部图片必须完整展示,不裁切。

```html
<figure class="x-wash-plate">
  <img src="images/specimen.png" alt="探索过程样本">
  <figcaption class="x-fig">Fig. 03 · 放在水彩承托板里的过程样本。</figcaption>
</figure>
```

---

## x-adaptive-caption

图上文字自适应说明层。只能放在 `.frame-img` 内,通过 `data-contrast="dark|light"` 明确告诉系统当前落点是深底还是浅底。允许纯色遮罩条,禁止 blur/glow。

```html
<figure class="frame-img r-16x9">
  <img src="images/launch-proof.png" alt="上线记录截图">
  <figcaption class="x-adaptive-caption" data-contrast="dark" data-position="left-bottom" data-variant="bar">
    Fig. 04 · 上线记录截图,保留来源与界面状态。
  </figcaption>
</figure>
```

规则:

- `data-contrast="dark"` 表示落点背景偏深,文字用纸色。
- `data-contrast="light"` 表示落点背景偏浅,文字用墨色。
- `data-position` 可选 `left-bottom` / `left-top` / `right-top` / `right-bottom`。
- `data-variant="bar"` 使用纯色遮罩条,用于复杂截图或主体边缘较乱的图。
- 不要把长段正文放到图上;图上只放图号、状态、来源或一句证据说明。

---

## x-specimen-grid

标本网格。同高网格,格间 1px `--line-purple` 分隔线,每格底部小图号。

```html
<div class="x-specimen-grid">
  <figure class="x-specimen-grid__item">
    <img src="images/a.png" alt="样本 A">
    <figcaption>Fig. A01</figcaption>
  </figure>
  <figure class="x-specimen-grid__item">
    <img src="images/b.png" alt="样本 B">
    <figcaption>Fig. B01</figcaption>
  </figure>
</div>
```

---

## x-compare

对照样本。两栏结构,栏顶等宽标签固定为 `SAMPLE A` / `SAMPLE B`,标签颜色使用 `--accent-current`。

```html
<div class="x-compare">
  <section class="x-compare__sample">
    <div class="x-compare__label">SAMPLE A</div>
    <p>原始方案或旧流程。</p>
  </section>
  <section class="x-compare__sample">
    <div class="x-compare__label">SAMPLE B</div>
    <p>调整后的判断或新流程。</p>
  </section>
</div>
```

---

## x-margin-rail

刻度边栏。页面左缘 1px `--line-purple` 竖线 + 章节刻度标记,sticky。

```html
<nav class="x-margin-rail" aria-label="探索者手记刻度">
  <a class="x-margin-rail__tick" href="#act-1"><span>01</span></a>
  <a class="x-margin-rail__tick" href="#act-2"><span>02</span></a>
  <a class="x-margin-rail__tick" href="#act-3"><span>03</span></a>
</nav>
```

---

## x-outro-manifesto

收尾宣言。`--paper-tint` 浅蓝紫底,方法卡片网格,结尾放一个 `x-stamp`。

```html
<section class="x-outro-manifesto">
  <div class="x-log-header">
    <span class="x-log-header__entry">ENTRY 4A · MANIFESTO</span>
    <span class="x-log-header__meta">CLOSING NOTE</span>
  </div>
  <blockquote>把项目写成能被检查的探索记录。</blockquote>
  <div class="x-outro-manifesto__grid">
    <article class="x-outro-manifesto__card">先看现场</article>
    <article class="x-outro-manifesto__card">再定证据</article>
    <article class="x-outro-manifesto__card">最后收口</article>
  </div>
  <svg class="x-stamp" viewBox="0 0 120 120" aria-label="VERIFIED · MANIFESTO">
    <circle cx="60" cy="60" r="48"></circle>
    <circle cx="60" cy="60" r="38"></circle>
    <text x="60" y="57" text-anchor="middle">VERIFIED</text>
    <text x="60" y="75" text-anchor="middle">MANIFESTO</text>
  </svg>
</section>
```
