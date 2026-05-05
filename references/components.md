# 组件手册(Components)

`assets/template.html` 里**所有可用组件**的参数和用法。**改组件细节**(字号 / 间距 / 颜色)前必读。

---

## 1. 字体系统

```css
--mono:"IBM Plex Mono"          /* 等宽 · 元数据 / 标签 / 数字单位 */
--serif-en:"Playfair Display"   /* 衬线英文 · 数字 / 英文术语 */
--serif-zh:"Noto Serif SC"      /* 衬线中文 · 主标 / 副文 / 大引用 */
--sans-zh:"Noto Sans SC"        /* 非衬线中文 · 列表 / 描述 / 注释 */
```

**分工硬规则**:
- 大字标题 = **衬线中文**(Noto Serif SC)
- 正文副文 = **衬线中文**(可读性 + 杂志感)
- 列表项 / 短描述 = **非衬线中文**(Noto Sans SC)
- 元数据 / 标签 / kicker / chrome = **等宽**(IBM Plex Mono,大写 + letter-spacing)
- 数字 = **衬线英文**(Playfair Display,有 tnum 等宽数字)

**违反这套分工 = 杂志感立刻消失**。

---

## 2. 字号层级

| 类 | 字号 | 用途 |
|---|---|---|
| `.hero h1` | 11vw | Hero 项目名 · 整页最大 |
| `.act-cover h2` | 8.5vw | 章节封面大字 |
| `.outro blockquote` | 5.4vw | 收尾大引用 |
| `.section h3` | 5.2vw | 段主标 |
| `.hero .subtitle` | 3.4vw | Hero 副标 |
| `.section .h-sub` | 2.2vw | 段副标 |
| `.stat-card .num` | 5.2vw | 数据卡数字 |
| `.section .anchor-quote` | 1.7vw | 锚点金句 |
| `.section p.body` | 1.2vw(min 16px) | 副文 |
| `.section .callout` | 1.05vw(min 14px) | 引用块 |
| `.section .service-note` | .85vw(min 11px) | 服务视角注脚 |
| `.kicker` / `.chrome` / `.foot` | 11-12px | 元数据 |

**vw 单位 + min(px, vw)** 是为了在不同分辨率自适应,但保持最小可读字号。

---

## 3. 颜色规则

| CSS 变量 | 用途 |
|---|---|
| `var(--ink)` | 深色文字(亮底)/ 深色底色(暗底) |
| `var(--paper)` | 亮色文字(暗底)/ 亮色底色(亮底) |
| `var(--ink-rgb)` | 给 rgba() 用,如 `rgba(var(--ink-rgb),.55)` |
| `var(--paper-rgb)` | 同上 |
| `var(--paper-tint)` | 比 paper 略深,用于 footer 等微妙分层 |
| `var(--ink-tint)` | 比 ink 略亮,备用 |

**亮底页**(.section / 站点 footer):背景 paper,文字 ink。
**暗底页**(.hero / .act-cover / .outro):背景 ink,文字 paper。

opacity 用 .55(弱化文字 / Before 列)/ .6 - .7(注释 / kicker)/ .85 - .9(callout / 服务视角)。

---

## 4. 网格系统

| 类 | 比例 | 用途 |
|---|---|---|
| `.split` | 7:5 | 左文右图主力 |
| `.compare` | 1:1 | Before/After 对比 |
| `.stats-grid` | 3 列 × 2 行 | 6 数据卡 |
| `.stats-grid.cols-3` | 3 列 × 1 行 | 3 大数据卡(L1-L3) |
| `.pipeline` | 默认 3 列 | Pipeline step |
| `.pipeline[data-cols="2/4/5"]` | 2/4/5 列 | step 数量调整 |
| `.family-grid` | 3 列 × 2 行 | 6 cell 衍生家族 |

**所有网格都 `gap` 在 vw + vh 单位**,响应式自动缩放。
**< 900px** 全部降级为单列。

---

## 5. 章节封面(.act-cover)

```html
<section class="act-cover" id="act-N">
  <div class="act-tag">Act N · [English Term]</div>
  <div class="act-num">Act N</div>
  <h2>[章节名 · 4 字]</h2>
  <p class="act-sub">[一段说明]</p>
</section>
```

**参数**:
- `min-height:80vh`(不强制满屏,但占大部分)
- 背景 `var(--ink)` 反白
- `.act-tag` 右上角 absolute 定位,等宽小字
- `.act-num` 斜体英文(Playfair),小字 1.6vw,作为大标题前的"小前缀"
- `<h2>` 字号 8.5vw,最大但不至于撑破
- `.act-sub` 1.7vw,opacity .78,最大宽度 55vw

**4 章节标准命名**:
| Act | 中文 | 英文 |
|---|---|---|
| I | 项目背景 | Project Framing |
| II | 设计判断 | Design Reasoning |
| III | 落地交付 | Execution & Delivery |
| IV | 方法沉淀 | Adaptive Methodology |

**章节四直接做成 outro,不用 act-cover**。

---

## 6. 顶部 sticky 导航(.topbar)

```html
<nav class="topbar">
  <div class="brand">[作者名] · [岗位]作品集</div>
  <div class="progress">
    <a href="#hero" class="active" data-section="hero">作品页</a>
    <a href="#act-1" data-section="act-1">项目背景</a>
    <a href="#act-2" data-section="act-2">设计判断</a>
    <a href="#act-3" data-section="act-3">落地交付</a>
    <a href="#act-4" data-section="act-4">方法沉淀</a>
  </div>
</nav>
```

**参数**:
- `position:fixed; top:0; z-index:50` 始终顶层
- `backdrop-filter:blur(12px)` 半透模糊(底图透出来)
- 滚动到对应 section 时,JS 自动给 `<a>` 加 `.active` 类
- < 900px 自动隐藏 `.progress`(避免拥挤)

**brand 长度建议**:< 30 字符。太长会挤压 progress。

---

## 7. 数据卡(.stat-card)

```html
<div class="stat-card">
  <div class="label">[Label · 等宽小字 · 大写]</div>
  <div class="num">[数字]<span class="unit">[单位]</span></div>
  <div class="note">[一句注释]</div>
</div>
```

**参数**:
- `border-top:1px solid` —— 极简分隔
- `.label` 等宽 / 大写 / .78vw / opacity .6 / letter-spacing .24em
- `.num` 衬线英文 / 800 / 5.2vw / `font-feature-settings:"tnum"`(等宽数字)
- `.unit` 中文衬线 / .36em(相对于 num) / opacity .72
- `.note` 非衬线中文 / 1.05vw / opacity .75

**数字长度**:**2-3 字符**(7 / 30 / 64 / 12 / 11K / 110K)。
4 字符以上(2026 / 1990)会溢出 —— 用单位简写。

**单位**:天 / h / cm / × / K / M / s / 月 / 年。

---

## 8. 引用块(.callout)

```html
<div class="callout">
  "[原话引用]"
  <span class="src">— [来源 · 时间]</span>
</div>
```

**参数**:
- `border-left:3px solid currentColor` —— 引用块感
- 背景 `rgba(var(--ink-rgb),.04)` —— 微微底色,跟 paper 区分
- 衬线中文 / 1.05vw / opacity .85
- `.src` 等宽 / 大写 / .22em / opacity .6

**用途**:**脚注层** —— 用户原话 / Get 笔记 / 复盘文档原句。
**不能取代副文** —— callout 是"佐证",副文才是"主张"。

每段建议 1-2 条 callout,**多了变堆砌**。

---

## 9. 锚点金句(.anchor-quote)

```html
<div class="anchor-quote">
  [一句 1-2 行金句,中英对仗]
</div>
```

**参数**:
- `border-top:2px solid var(--ink)` + `border-bottom:1px solid` —— 双线框感
- 衬线中文 / 600 / 1.7vw / line-height 1.45
- 上下 padding 3vh
- 上下 margin 4vh

**用途**:整段的**视觉钩子**。每段 **1 句** —— 多了就没有钩子感。

**写法建议**:
- 中英对仗(如 "Show, don't tell — 让审议端从「读方案」变成「看方案」")
- 短(< 30 字)
- 有节奏感(可断行)

---

## 10. 服务视角注脚(.service-note)

```html
<div class="service-note">
  <span class="label">服务视角</span>
  [招聘方读到的是: ...]
</div>
```

**参数**:
- `border-top:1px dashed` —— 虚线分隔,跟主文区分
- 等宽 / .85vw / opacity .65
- `.label` 大写 / 0.3em / 上面单独一行

**用途**:每段的**服务视角注脚**,招聘方价值的明示。
**每段必有**(质量门 P0 项)。

**写法**:
> 招聘方读到的是:**[一句话点明项目方价值]** —— [展开半句]。

---

## 11. 图片占位(.img-placeholder)

```html
<div class="img-placeholder">
  <span class="plus">+</span>
  <div class="label">[图片说明]</div>
  <div class="meta">[待补 · 4:3]</div>
</div>
```

**比例修饰类**(默认 4:3):
- `.r-1x1` 方图
- `.r-3x2` 横向标准
- `.r-3x4` 竖图
- `.r-16x9` 全屏比例

**替换成实图**:
```html
<figure class="frame-img r-4x3">
  <img src="images/1B-contrast.jpg" alt="对照视觉">
</figure>
```

`.frame-img` 自动 `object-fit:cover; object-position:top`(只裁底,顶 + 左右完整)。

---

## 12. Pipeline 流水线(.pipeline-block / .pipeline / .step)

```html
<div class="pipeline-block">
  <div class="pipeline-label">[Label · 等宽 · 大写]</div>
  <div class="pipeline">
    <div class="step">
      <div class="nb">01</div>
      <div class="title">[Step 标题]</div>
      <div class="desc">[Step 描述]</div>
    </div>
    <!-- 重复 -->
  </div>
</div>
```

**参数**:
- `.pipeline-block` 之间 `border-top:1px dashed` 分隔
- 第一个 pipeline-block 没有顶部分隔
- `.step` 顶部 `border-top:1px solid` —— 实线分隔每步
- `.nb` 斜体英文小字(Playfair),编号
- `.title` 非衬线粗体 / 1.4vw
- `.desc` 非衬线 / 1vw / opacity .78

**列数**:`.pipeline[data-cols="N"]`(N=2/3/4/5)。默认 3。

**编号规则**:**整段连续**(01-02-03 / 04-05-06,不重置)。

---

## 13. Before/After 对比(.compare / .col)

```html
<div class="compare">
  <div class="col before">
    <div class="kicker">Before · [对照场景]</div>
    <h4>[流程 4 字概括]</h4>
    <ul>
      <li>[要点 1]</li>
      <li>[要点 2]</li>
      <li>⚠️ [负面结果]</li>
    </ul>
  </div>
  <div class="col after">
    <div class="kicker">After · [我的方案]</div>
    <h4>[流程 4 字概括]</h4>
    <ul>
      <li>[要点 1]</li>
      <li>[要点 2]</li>
      <li>✓ [正面结果]</li>
    </ul>
  </div>
</div>
```

**参数**:
- `.col.before` `opacity:.55` —— 视觉弱化
- `.col` 都加 `border-left:3px solid currentColor`
- `<h4>` 衬线 / 600 / 1.9vw
- `<ul>` padding-left:1.2em / 列表项 1.1vw / opacity .86

**最后一条要点用 ⚠️ / ✓ 标记结果**(对应 before/after 的负面/正面)。

---

## 14. 衍生家族图片网格(.family-grid / .family-cell)

```html
<div class="family-grid">
  <div class="family-cell">
    <div class="placeholder">
      <span class="plus">+</span>
      <div class="label">[图说]</div>
    </div>
    <div class="cap">
      <span>[标签]</span>
      <span>[说明]</span>
    </div>
  </div>
  <!-- 重复 5 次,共 6 cell -->
</div>
```

**参数**:
- `.family-grid` 默认 3 列 × 2 行(6 cell),响应式 → 2 列
- `.family-cell` 是 figure-style,placeholder + cap 两件
- `.placeholder` 强制 `aspect-ratio:1/1`(方图)
- `.cap` 等宽小字,左右两列(标签 + 说明)

**6 cell 是基准**;如果项目只有 4-5 个衍生物:
- 保留 placeholder 作为占位,或
- inline `style="grid-template-columns:repeat(2,1fr)"` 改成 2×2 / 2×3

---

## 15. 收尾 outro(.outro / blockquote / stamp / tags)

```html
<section class="outro" id="act-4">
  <div class="kicker">[Label]</div>
  <blockquote>[大引用 · 3-4 行]</blockquote>
  <p class="epilogue">[一段中文 + 英文]</p>
  <div class="stamp">
    <span>项目 / [项目名]</span>
    <span>类型 / [类型]</span>
    <!-- ... -->
  </div>
  <div class="tags">
    <span>[关键词 1]</span>
    <span>[关键词 2]</span>
    <!-- ... -->
  </div>
</section>
```

**参数**:
- 整段背景 `var(--ink)` 反白
- `<blockquote>` 字号 5.4vw —— 整页**最大字号**(比段 h3 还大)
- `.epilogue` 衬线 / 1.6vw / opacity .7
- `.stamp` 等宽小字 / 横向铺开,上方 1px solid 分隔
- `.tags` 等宽 / 带边框 / padding 5px 12px

**关键**:`<blockquote>` **不要超过 4 行**,超过了视觉就拥挤。

---

## 16. WebGL Hero 背景

```html
<canvas id="hero-bg" class="bg"></canvas>
```

**参数**:
- 只在 `.hero` 区
- 由 template.html 底部 JS 自动启动
- 暂停渲染当 hero 离开视口(IntersectionObserver,性能优化)
- 颜色用电子墨水流动 shader,自动适配主题色

**不要在其他段加 canvas** —— 长滚动版本只 Hero 区有 WebGL。

---

## 17. 滚动入场动画(.fade-in)

```html
<element class="fade-in">[内容]</element>
```

**机制**:
- 元素初始 `opacity:0; transform:translateY(24px)`
- 进入视口后(IntersectionObserver,threshold .12)加 `.in-view` 类
- 过渡 `opacity .9s + transform .9s cubic-bezier(.22,1,.36,1)`

**用法**:**所有需要淡入的元素加 `.fade-in`**:
- 大标题
- 副文段
- 数据卡
- 引用块
- 锚点金句
- 图片占位

**不要给 `<section>` 加** —— `.section` 是容器,内部元素分别淡入更有层次感。

---

*文档版本:v1*
*创建时间:2026-05-05*
*基础来源:箱子 火种车 LOGO 第一份长滚动作品页(2026-05-04)*
