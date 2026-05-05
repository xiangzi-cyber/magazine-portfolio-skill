# 段落布局库(Sections)

本文档收录 **8 种**最常用的长滚动作品页段落骨架。每种都是完整可粘贴的 `<section class="...">...</section>` 代码块,直接替换文案/图片即可使用。

---

## ⚠️ 生成前必读(Pre-flight)

### A. 类名必须来自 template.html

sections.md 使用的所有类(`.topbar` / `.hero` / `.act-cover` / `.section` / `.chrome` / `.kicker` / `.h-sub` / `.body` / `.anchor-quote` / `.callout` / `.service-note` / `.stats-grid` / `.stat-card` / `.split` / `.compare` / `.pipeline-block` / `.pipeline` / `.step` / `.family-grid` / `.family-cell` / `.img-placeholder` / `.outro` / `.fade-in`)都在 `assets/template.html` 的 `<style>` 块里预定义。

**不要发明新类名**。如果某个类缺失,**先在 template.html 的 `<style>` 里补上**,再 reference。

### B. 4 章节顺序不能错

```
Hero → 章节一 项目背景(act-1) → 章节二 设计判断(act-2) → 章节三 落地交付(act-3) → 章节四 方法沉淀(act-4 / outro) → site-footer
```

每章节封面必须在该章节的内容段之前。

### C. 每段必须配齐 6 件(信息密度门)

`.section` 内必须有:
1. `.chrome`(段顶元数据 · 一行)
2. `.kicker`(短前缀 · 一行)
3. `<h3>` 主标(一句话主张)
4. `.h-sub` 副标(补一句)
5. `<p class="body">` 副文(2-3 段)
6. `.service-note`(服务视角注脚)

按需:`.anchor-quote` / `.callout` / 数据卡 / 对比 / Pipeline / 图片占位

### D. 滚动入场动画

每个需要淡入的元素加 `class="fade-in"`(或追加到现有 class)。模板已绑定 IntersectionObserver,元素进视口自动淡入 + 上移。

---

## Section 1 · Hero(开场,WebGL 背景)

整页第一段。深色底反白,WebGL 流动背景在 hero 区透出。

```html
<section class="hero" id="hero">
  <canvas id="hero-bg" class="bg"></canvas>

  <div class="meta fade-in">[项目分类] · [合作方] · [项目类型]</div>

  <h1 class="fade-in">[项目名]</h1>

  <div class="subtitle fade-in">
    [一句话项目主张] ——<br>
    [关键时间数据] · [关键交付数据] · [差异化数据]
  </div>

  <p class="lead fade-in">
    [2-3 句 lead,80 字内,讲清楚:这是什么 + 你做了什么独特的事 + 服务对象是谁]
  </p>

  <div class="stats fade-in">
    <div class="item"><div class="num">[数 1]</div><div class="lab">[标签 1]</div></div>
    <div class="item"><div class="num">[数 2]</div><div class="lab">[标签 2]</div></div>
    <div class="item"><div class="num">[数 3]</div><div class="lab">[标签 3]</div></div>
    <div class="item"><div class="num">[数 4]</div><div class="lab">[标签 4]</div></div>
    <div class="item"><div class="num">[数 5]</div><div class="lab">[标签 5]</div></div>
  </div>

  <div class="scroll-hint">Scroll ↓ 项目背景</div>
</section>
```

**要点**:
- `min-height:100vh` 让 Hero 占满首屏
- WebGL 背景由 template.html 底部 JS 自动启动,不用改
- `<h1>` 字号默认 11vw,如果项目名很长可以 inline `font-size:8vw`
- `.subtitle` 是项目副标,`.lead` 是 2-3 句叙述
- `.stats` 5 个数据卡,数字必须**短**(2-3 字符),太长用 K/h/cm 等单位简写

---

## Section 2 · 章节封面(Act Cover)

每章节开头一个独立段落。深底反白大字,留白多,作为视觉断点。

```html
<section class="act-cover" id="act-N">
  <div class="act-tag">Act N · [English Term]</div>
  <div class="act-num fade-in">Act N</div>
  <h2 class="fade-in">[章节中文名 · 4 字]</h2>
  <p class="act-sub fade-in">
    招聘方在这一章 get 到的:**[这一章的核心价值]** —— [展开一句]。
  </p>
</section>
```

**4 章节标准命名**(必须遵守):

| Act | 中文 | 英文 |
|---|---|---|
| I | 项目背景 | Project Framing |
| II | 设计判断 | Design Reasoning |
| III | 落地交付 | Execution & Delivery |
| IV | 方法沉淀 | Adaptive Methodology |

**要点**:
- `id="act-N"` 必须设置,匹配顶部 sticky 导航的锚点
- `act-num` 用斜体英文,小字(1.6vw),作为大标题前的"小前缀"
- `<h2>` 是章节中文名,字号 8.5vw(大但不至于撑破)
- `act-sub` 一段说明,用 `**强调**` 标重点
- 章节四(方法沉淀)**不用 act-cover**,直接进 outro(见 Section 8)

---

## Section 3 · 数据大字报(Big Numbers Grid)

适用于 1A 项目定位、3A 兜底能力等需要数据冲击的段落。

```html
<section class="section">
  <div class="chrome">
    <div>NX · [4 字标签] / [English Term]</div>
    <div>Act N · 0X</div>
  </div>
  <div class="kicker fade-in">NX · [4 字标签]</div>
  <h3 class="fade-in">[主标 · 一句话主张]</h3>
  <p class="h-sub fade-in">[副标]</p>

  <p class="body fade-in">
    [副文段 1 · 介绍数据背景 / 项目约束]
  </p>

  <div class="stats-grid fade-in">
    <div class="stat-card">
      <div class="label">[Label 1]</div>
      <div class="num">[数字]<span class="unit">[单位]</span></div>
      <div class="note">[一句注释]</div>
    </div>
    <!-- 重复 5 次,共 6 个数据卡;或用 cols-3 显示 3 个大卡 -->
  </div>

  <p class="body fade-in">
    [副文段 2 · 数据后的解读]
  </p>

  <div class="service-note fade-in">
    <span class="label">服务视角</span>
    [招聘方读到的是: ...]
  </div>
</section>
```

**要点**:
- `stats-grid` 默认 3×2(6 卡),可换 `cols-3`(3 卡 · 用于 L1-L3 这种)
- 数字用 `<span class="unit">` 包单位(天 / h / cm / × / K / M)
- 数字越短越好(2-3 字符),太长会溢出
- 数据**不解释**(数字本身就是冲击),解释放副文里
- 副文在数据卡上方介绍背景,数据卡下方做解读

---

## Section 4 · 左文右图(Quote + Image)

适用于 1B 用户分层、2B 视觉分诊等需要视觉锚的段落。

```html
<section class="section">
  <div class="chrome">
    <div>NX · [4 字标签] / [English Term]</div>
    <div>Act N · 0X</div>
  </div>
  <div class="kicker fade-in">NX · [4 字标签]</div>
  <h3 class="fade-in">[主标]</h3>
  <p class="h-sub fade-in">[副标]</p>

  <div class="split">
    <div class="text-col">
      <p class="body fade-in">[副文段 1]</p>
      <p class="body fade-in">[副文段 2]</p>
      <p class="body fade-in">[副文段 3]</p>

      <div class="anchor-quote fade-in">
        [锚点金句 · 中英对仗,1-2 行]
      </div>

      <div class="callout fade-in">
        "[原话 1]"
        <span class="src">— [来源 · 时间]</span>
      </div>

      <div class="callout fade-in">
        "[原话 2(可选)]"
        <span class="src">— [来源]</span>
      </div>
    </div>

    <div class="img-col fade-in">
      <div class="img-placeholder">
        <span class="plus">+</span>
        <div class="label">[图片说明]</div>
        <div class="meta">[待补 · 4:3]</div>
      </div>
    </div>
  </div>

  <div class="service-note fade-in">
    <span class="label">服务视角</span>
    [招聘方读到的是: ...]
  </div>
</section>
```

**要点**:
- `.split` 默认 7:5(左文右图),已在 template 预设
- `.img-col` 有 `position:sticky; top:8vh` —— 滚动时图片会**跟随左侧文字**(图片粘在视口顶部,直到该段滚出),让用户长时间阅读副文时图片一直可见
- 图片占位用 `.img-placeholder`,可加修饰类:`.r-1x1`(方图)、`.r-3x2`、`.r-3x4`(竖图)、`.r-16x9`(全屏比例)
- 替换实图时:把 `.img-placeholder` 整个换成 `<figure class="frame-img r-4x3"><img src="images/XX.jpg"></figure>`
- 锚点金句**放在副文之后**,作为本段视觉钩子
- callout 引用是脚注层,**不能取代副文**,只是佐证

---

## Section 5 · Before/After 对比

适用于 2A 流程压缩、新旧方法对比类段落。

```html
<section class="section">
  <div class="chrome">
    <div>NX · [4 字标签] / [English Term]</div>
    <div>Act N · 0X</div>
  </div>
  <div class="kicker fade-in">NX · [4 字标签]</div>
  <h3 class="fade-in">[主标 · 比如「先出文字稿我没采纳 —— 不是不专业,是不够快」]</h3>
  <p class="h-sub fade-in">[副标]</p>

  <p class="body fade-in">[副文段 1 · 描述要解决的问题]</p>

  <p class="body fade-in" style="margin-left:1.5em;border-left:2px solid var(--ink);padding-left:1em">
    <strong>1 · [第一层]</strong>。[展开]
  </p>

  <p class="body fade-in" style="margin-left:1.5em;border-left:2px solid var(--ink);padding-left:1em">
    <strong>2 · [第二层]</strong>。[展开]
  </p>

  <div class="compare">
    <div class="col before fade-in">
      <div class="kicker">Before · [对照场景]</div>
      <h4>[对照流程的 4 字概括]</h4>
      <ul>
        <li>[要点 1]</li>
        <li>[要点 2]</li>
        <li>[要点 3]</li>
        <li>⚠️ [负面结果]</li>
      </ul>
    </div>
    <div class="col after fade-in">
      <div class="kicker">After · [我的方案]</div>
      <h4>[我的流程 4 字概括]</h4>
      <ul>
        <li>[要点 1]</li>
        <li>[要点 2]</li>
        <li>[要点 3]</li>
        <li>✓ [正面结果]</li>
      </ul>
    </div>
  </div>

  <div class="anchor-quote fade-in">[锚点金句]</div>

  <div class="callout fade-in">
    "[原话 1]"
    <span class="src">— [来源]</span>
  </div>

  <div class="callout fade-in">
    "[原话 2]"
    <span class="src">— [来源]</span>
  </div>

  <div class="service-note fade-in">
    <span class="label">服务视角</span>
    [招聘方读到的是: ...]
  </div>
</section>
```

**要点**:
- `.col.before` 默认 `opacity:.55` —— 旧方案视觉弱化
- `.col.after` 满亮度 —— 我的方案突出
- 两列都用 `border-left:3px solid` —— 引用块感
- 列内结构统一:kicker → h4 → ul(要点 3-4 条)
- 最后一条要点用 ⚠️ / ✓ 标记结果(对应 before/after 的负面/正面)
- 中间穿插 inline 缩进段落(`margin-left + border-left`)用来**分点说明** —— 可选,但比纯 ol/ul 更专业

---

## Section 6 · 双 Pipeline(流水线)

适用于 2C 两轮迭代、工作流拆解、N 步流程类段落。

```html
<section class="section">
  <div class="chrome">
    <div>NX · [4 字标签] / [English Term]</div>
    <div>Act N · 0X</div>
  </div>
  <div class="kicker fade-in">NX · [4 字标签]</div>
  <h3 class="fade-in">[主标]</h3>
  <p class="h-sub fade-in">[副标]</p>

  <p class="body fade-in">[副文段 1 · 介绍流程总体]</p>

  <div class="pipeline-block fade-in">
    <div class="pipeline-label">[Pipeline 1 名称] · [English]</div>
    <div class="pipeline">
      <div class="step">
        <div class="nb">01</div>
        <div class="title">[Step 1 标题]</div>
        <div class="desc">[Step 1 描述]</div>
      </div>
      <div class="step">
        <div class="nb">02</div>
        <div class="title">[Step 2]</div>
        <div class="desc">[描述]</div>
      </div>
      <div class="step">
        <div class="nb">03</div>
        <div class="title">[Step 3]</div>
        <div class="desc">[描述]</div>
      </div>
    </div>
  </div>

  <p class="body fade-in">[Pipeline 1 的副文 · 解释这一轮做了什么 / 为什么这么拆]</p>

  <div class="pipeline-block fade-in">
    <div class="pipeline-label">[Pipeline 2 名称] · [English]</div>
    <div class="pipeline">
      <div class="step">
        <div class="nb">04</div>
        <div class="title">[Step 1]</div>
        <div class="desc">[描述]</div>
      </div>
      <div class="step">
        <div class="nb">05</div>
        <div class="title">[Step 2]</div>
        <div class="desc">[描述]</div>
      </div>
      <div class="step">
        <div class="nb">06</div>
        <div class="title">[Step 3]</div>
        <div class="desc">[描述]</div>
      </div>
    </div>
  </div>

  <p class="body fade-in">[Pipeline 2 的副文]</p>

  <div class="anchor-quote fade-in">[锚点金句]</div>

  <div class="callout fade-in">
    "[原话]"
    <span class="src">— [来源]</span>
  </div>

  <div class="service-note fade-in">
    <span class="label">服务视角</span>
    [招聘方读到的是: ...]
  </div>
</section>
```

**要点**:
- `.pipeline` 默认 3 列;若 4 步用 `data-cols="4"`,5 步用 `data-cols="5"`,2 步用 `data-cols="2"`
- 每个 `.pipeline-block` 之间有顶部分隔线(`pipeline-label::before`)
- step 编号用斜体英文(`.nb`),注意编号要**全篇连续**(01-02-03 / 04-05-06)
- 每 pipeline-block 后面跟一段 body 副文,解释这一轮的逻辑
- 不要超过 2 个 pipeline-block 在同一段(超过就拆段)

---

## Section 7 · 衍生家族图片网格(Family Grid)

适用于 3B 衍生家族、品牌物料展示、IP 系统类段落。

```html
<section class="section">
  <div class="chrome">
    <div>NX · [4 字标签] / [English Term]</div>
    <div>Act N · 0X</div>
  </div>
  <div class="kicker fade-in">NX · [4 字标签]</div>
  <h3 class="fade-in">[主标 · 比如「一颗母提示词,长出整套品牌家族」]</h3>
  <p class="h-sub fade-in">[副标]</p>

  <p class="body fade-in">[副文段 1 · 介绍衍生家族的方法论]</p>

  <p class="body fade-in">[副文段 2 · 具体衍生关系]</p>

  <div class="family-grid fade-in">
    <div class="family-cell">
      <div class="placeholder"><span class="plus">+</span><div class="label">[母 / 中心元素]</div></div>
      <div class="cap"><span>Seed</span><span>[说明]</span></div>
    </div>
    <div class="family-cell">
      <div class="placeholder"><span class="plus">+</span><div class="label">[衍生 1]</div></div>
      <div class="cap"><span>[标签]</span><span>[说明]</span></div>
    </div>
    <!-- 重复 4 次,共 6 个 cell -->
  </div>

  <div class="anchor-quote fade-in">[锚点金句]</div>

  <div class="callout fade-in">
    "[原话 / 自述]"
    <span class="src">— [来源 · 概念名]</span>
  </div>

  <div class="service-note fade-in">
    <span class="label">服务视角</span>
    [招聘方读到的是: ...]
  </div>
</section>
```

**要点**:
- `.family-grid` 默认 3×2(6 cell),响应式自动 → 2×3
- 每个 cell 是**等比方图(1:1)**,不要用其他比例
- `.cap` 是 figure caption,左右两列(类型标签 + 说明)
- 替换实图:把 `.placeholder` 整个换成 `<img>` 即可,外面 `.family-cell` 保持
- **6 个 cell 是基准**,如果只有 4 个或 5 个项目,空 cell 可保留占位框,或调整 grid 列数(用 inline `style="grid-template-columns:repeat(2,1fr)"` 改成 2×2)

---

## Section 8 · 收尾 outro(章节四 · 方法沉淀)

整页**最后一段**。深底反白大引用,作为整页收口。**不要用 `.section`,用 `.outro`**。

```html
<section class="outro" id="act-4">
  <div class="kicker fade-in">Act IV · Adaptive Methodology · 方法沉淀</div>

  <blockquote class="fade-in">
    [大引用主体 · 反方法论金句 · 或本项目核心总结 ·<br>
    分行呈现,3-4 行,长不超过 120 字]
  </blockquote>

  <p class="epilogue fade-in">
    [Adaptive Methodology — 方法论是工具,不是模板。]<br>
    [项目变了,方法跟着变;但<em>判断的顺序</em>,不变。]
  </p>

  <p class="epilogue fade-in" style="font-size:1.3vw;opacity:.6;max-width:55vw;margin-bottom:5vh">
    [可选副文 · 列出本项目的所有判断标签,小字呈现]
  </p>

  <div class="stamp fade-in">
    <span>项目 / [项目名]</span>
    <span>类型 / [项目类型]</span>
    <span>时间 / [年.月]</span>
    <span>身份 / [角色 · 一人扛完 / 团队中的角色]</span>
    <span>归属 / [合作方 / 自发 / 子项目归属]</span>
  </div>

  <div class="tags fade-in">
    <span>[关键词 1]</span>
    <span>[关键词 2]</span>
    <span>[关键词 3]</span>
    <span>[关键词 4]</span>
  </div>
</section>
```

**要点**:
- `.outro` 不需要 `.chrome` / `.kicker` / `<h3>` / 副文 / 锚点金句 / 服务视角 —— **只有 6 件**:kicker + blockquote + epilogue × 1-2 + stamp + tags
- `<blockquote>` 字号 5.4vw,衬线粗体 —— 整页最大字号(比 `<h3>` 还大)
- `epilogue` 是引用下方的小段落,opacity 较低,不和大引用抢
- `stamp` 是项目角章 —— 5-6 个字段,等宽字体,小字
- `tags` 是项目关键词标签 —— 4-5 个,带边框,作为整页"指纹"
- 这一段**取代** 4A 的 `.section` —— 不要在 outro 之外再写一个 4A section

---

## 段落组合参考表(8 段标准结构)

| 段 | 章节 | 推荐布局 | 关键内容 |
|---|---|---|---|
| Hero | — | Section 1 | 项目名 + 副标 + lead + 5 数据 |
| 1A 项目定位 | 一 | **Section 3 数据大字报** | 6 数据卡 + 副文 |
| 1B 用户分层 | 一 | **Section 4 左文右图** | 副文 + 锚点金句 + 引用 + 视觉锚 |
| 2A 流程压缩 | 二 | **Section 5 Before/After** | 副文 + 双列对比 + 引用 |
| 2B 视觉分诊 | 二 | **Section 4 左文右图** | 同 1B 结构 |
| 2C 两轮迭代 | 二 | **Section 6 双 Pipeline** | 双 Pipeline + 段间副文 |
| 3A 工艺兜底 | 三 | **Section 3 数据大字报(cols-3)** | 3 大数据卡(L1-L3) |
| 3B 衍生家族 | 三 | **Section 7 图片网格** | 副文 + 6 cell 网格 |
| 4A 方法沉淀 | 四 | **Section 8 outro** | 大引用 + epilogue + 角章 |

---

## 长度参考(典型项目页)

| 段 | 大致字数(中文) | 主要资源 |
|---|---|---|
| Hero | 200 字 | 1 个 WebGL canvas |
| 章节封面 ×4 | 80 字 / 个 | — |
| 1A 项目定位 | 350 字 + 6 数据 | 6 数据卡 |
| 1B 用户分层 | 500 字 + 引用 | 1 张图 + 锚点金句 |
| 2A 流程压缩 | 600 字 + 引用 | 双列对比 |
| 2B 视觉分诊 | 500 字 + 引用 | 1 张图 + 锚点金句 |
| 2C 两轮迭代 | 450 字 | 双 Pipeline 6 step |
| 3A 工艺兜底 | 400 字 + 3 数据 | 3 大数据卡 |
| 3B 衍生家族 | 400 字 | 6 cell 网格 |
| 4A 方法沉淀 | 200 字 | 大引用 + 角章 |

**总字数:~ 4500-5000 字 + 约 8 张图**。
招聘方扫读约 3 分钟,深读约 8 分钟。

---

## 反向自检(每段写完前过)

写完每段 `<section>`,**逐条对照**:

- ✅ **服务视角**:这一段的主语是"我"还是"项目方"?有没有 `.service-note`?
- ✅ **专业度**:主文里有没有大白话直接出现?(如"孩子的眼睛""心中筛子""在算交付链")
- ✅ **保留口气**:用户的口气词("兜底能力""一眼卯定"等)有没有被换成 corporate 术语?
- ✅ **金句锚点**:有没有 `.anchor-quote` 一句中英对仗术语?
- ✅ **素材闭环**:每条主张有 1-3 类佐证(数据 / 引用 / 图)?

5 项全过 → 这一段可以交付。任意一项不过 → 不要交,改完再过门。

---

## 常见错误(已踩坑)

1. **章节四用 `.section` 而不是 `.outro`** → outro 是收尾,不要混用
2. **stat-card 数字超过 4 字符** → 溢出 `font-feature-settings:"tnum"`,排版崩
3. **图片 `.img-placeholder` 没指定比例类**(.r-1x1 / .r-3x2 等) → 默认 4:3,可能跟实图比例不匹配
4. **callout 引用占据主文位置** → callout 是**脚注层**,不能取代副文
5. **服务视角注脚漏了** → 没过质量门,招聘方 get 不到项目方价值
6. **章节封面 `id="act-N"` 没设** → 顶部 sticky 导航的滚动 active 失效
7. **fade-in 漏加** → 元素直接显示,没有滚动入场动画
8. **章节顺序错位** → 一 二 三 四,叙事弧不能换

---

*文档版本:v1*
*创建时间:2026-05-05*
*基础来源:箱子 火种车 LOGO 第一份长滚动作品页(2026-05-04)*
