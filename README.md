# Magazine Portfolio Skill 📜

> 生成"电子杂志 × 电子墨水"风格的**长滚动作品集网页** —— 单文件 HTML,4 章节收口,招聘方静态阅读不需要任何外部讲解。

**最近更新 · v3.3(2026-05-13)**:
- 服务视角改为招聘方视角（内部质量检查，不在HTML中表现）
- 删除 `.service-note` 组件，作品页不再出现"服务视角"标签
- 新增「真实来源优于虚构对比」原则：设计判断必须从会议纪要等真实文档提取，禁止虚构 Before/After 对比
- 新增「方法沉淀呼应全文」原则：outro 总结必须按能力维度分类，逐一呼应前面章节具体案例

**最近更新 · v3.2(2026-05-10)**:
- 新增「前后一致性」「内容密度平衡」「数字物料兜底」3 项质量检查
- Hero 区新增定位指导(第一页必须说清楚项目是什么、定位、你的角色)
- 7 问新增「一句话定位」字段,确保招聘方 3 秒内 get 项目全貌
- 素材采集表新增 WeFlow / OpenCLI 外部工具来源备注

🌏 English version: README.en.md(待补)

[guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) 的姊妹篇 —— 视觉血缘相同(电子杂志 × 电子墨水)、字体系统相同、主题色继承,但**场景不同**:

| skill | 形态 | 场景 |
|---|---|---|
| `guizang-ppt-skill` | 横翻 deck | **线下演讲**(有人讲,一屏一句话) |
| `magazine-portfolio-skill` ★ | 长滚动 | **招聘方静态阅读**(无人讲,信息密度自洽) |

---

## 效果

- 📜 **4 章节收口结构** —— 项目背景 / 设计判断 / 落地交付 / 方法沉淀(招聘方注意力先收 4 大块,再向下展开)
- 🖋 **三级字体分工** —— 衬线大标题 + 非衬线正文 + 等宽元数据
- 🌊 **WebGL Hero 流体背景** —— 只在 Hero 区透出,正文段克制
- 📌 **顶部 sticky 章节锚点** —— 滚到对应章节自动高亮 + 点击跳转
- 🎬 **滚动驱动入场动画** —— IntersectionObserver,元素进视口淡入 + 上移
- 📐 **段落级信息密度** —— 每段 = 主标 + 副标 + 副文 2-3 段 + 锚点金句 + 引用 + 服务视角注脚
- 🎨 **5 套主题色预设**(继承 guizang) —— 墨水经典 / 靛蓝瓷 / 森林墨 / 牛皮纸 / 沙丘
- 📄 **单文件 HTML** —— 不需要构建、不需要服务器,浏览器直接打开

## 适合 / 不适合

✅ 合适:
- 设计师 / 产品经理 / 独立创作者的求职作品集项目页
- 个人 IP / 自媒体的项目复盘网页
- 需要"招聘方静态阅读 + 自洽 + 信息密度"的项目展示
- 已经过了「**作品集项目梳理协作 skill**」的项目(内容架构稿已成型)

❌ 不合适:
- 线下分享 / 演讲辅助 → 用 [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)
- 内容还没梳理完,只有零散素材 → 先做内容架构稿
- 大段表格数据 / 培训课件 / 数据看板
- 需要多人协作编辑(这是静态 HTML)

## 安装

### 方式一:一行命令安装(推荐)

```bash
npx skills add https://github.com/xiangzi-cyber/magazine-portfolio-skill --skill magazine-portfolio-skill
```

### 方式二:把下面这段话直接发给 AI

```
帮我安装 magazine-portfolio-skill 这个 Claude Code skill。请按下面步骤做:
1. 确保 ~/.claude/skills/ 目录存在(不存在就创建)
2. 执行 git clone https://github.com/xiangzi-cyber/magazine-portfolio-skill.git ~/.claude/skills/magazine-portfolio-skill
3. 验证:ls ~/.claude/skills/magazine-portfolio-skill/ 应该看到 SKILL.md、assets/、references/ 三项
4. 告诉我安装好了,之后我说"做一份长滚动作品集"之类的话就会触发这个 skill
```

把这段话复制粘贴给 Claude Code / Cursor / 任何有 shell 权限的 AI Agent,它会自动完成安装。

### 方式三:手动命令行

```bash
git clone https://github.com/xiangzi-cyber/magazine-portfolio-skill.git ~/.claude/skills/magazine-portfolio-skill
```

## 触发方式

装好后,Claude Code / Cowork / Cursor 会在对话里自动发现并调用这个 skill。触发关键词:

- "做一份长滚动作品集"
- "做作品页 长滚动版"
- "magazine portfolio" / "editorial portfolio"
- "杂志风作品集"
- "招聘方阅读型作品集"

## 使用流程

Skill 是**结构化工作流 7 步**,分两个阶段:

### 梳理阶段(产出内容架构稿)

- **Step 0 · 梳理判断** —— 用户是否已有内容架构稿?有 → 跳到 Step 2;没有 → 进 Step 1
- **Step 1 · 梳理阶段** —— 7 问轻量复盘 / 节点接力 / 主张-佐证拆解 / 内容架构稿生成

> 详细 SOP 见 `references/workflow.md`(8 阶段 A-H)

### 视觉化阶段(产出长滚动 HTML)

- **Step 2 · 需求澄清** —— 6 问清单:岗位 / 目标招聘方 / 项目地位 / 图片 / 主题色 / 隐私约束
- **Step 3 · 拷贝模板** —— `assets/template.html` → 项目目录,改 `<title>` / `.brand` / Hero 占位符,换主题色
- **Step 4 · 填充内容**(按 4 章节结构):
   - 章节一 项目背景:项目定位 + 用户分层
   - 章节二 设计判断:流程压缩 + 视觉分诊 + 两轮迭代
   - 章节三 落地交付:工艺兜底 + 衍生家族
   - 章节四 方法沉淀:Adaptive Methodology 收尾(直接 outro)
- **Step 5 · 类预检 + 质量门** —— 对照 `sections.md` 顶部的 Pre-flight 类清单 + 每段过 5 项反向自检 + 对照 `references/checklist.md` P0-P3 分级
- **Step 6 · 预览** —— 浏览器直接打开
- **Step 7 · 迭代** —— 根据用户反馈修改

详细说明见 [SKILL.md](./SKILL.md)。

## 与姊妹 skill 的协作关系

```
[用户:零散素材 / 模糊想法 / 已有长复盘 等任意状态]
                          ↓
            ┌─── Step 0 启动判断 ───┐
            ↓                        ↓
   [Step 1 梳理阶段]              [跳过梳理]
   (7 问 / 节点 / 采集)           (已有架构稿)
            ↓                        ↓
            └────→ [内容架构稿] ←────┘
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                    ↓
  [magazine-portfolio-skill ★]        [guizang-ppt-skill]
   Step 2-7 视觉化                    线下演讲版本
        ↓                                    ↓
  [项目页.html  长滚动招聘版 主形态]   [项目页-PPT.html  演讲版补充]
```

**v3 关键变化**:**梳理阶段已合并到本 skill 内部**(原作品集项目梳理协作 skill 不再独立),不再有"上游 skill"——只有内部阶段。

跟 guizang-ppt-skill 是**平行姊妹**:共享内容架构稿,产出两种形态。
**长滚动版是主战场**(招聘方阅读),PPT 版是补充(线下演讲 / 路演)。

---

## Showcase / 效果展示

> 截图 / Demo 链接位 —— 等本 skill 跑出第一个完整作品页之后,在这里放:
>
> **截图区**(等用户提供 1-3 张关键截图,放到 `screenshots/` 目录):
>
> - `screenshots/01-hero.jpg` — Hero 区(WebGL 流体背景 + 项目元数据 + 5 数据卡)
> - `screenshots/02-act-cover.jpg` — 章节封面(深底反白大字)
> - `screenshots/03-stats-grid.jpg` — 数据大字报段(L1-L3 三层卡)
> - `screenshots/04-thumbnail.jpg` — 完整页面缩略图(长截图)
>
> **在线 Demo**:
>
> - [ ] 待部署到 GitHub Pages 或 Vercel(火种车 LOGO 长滚动作品页 — 本 skill 母本)

> **AI 火种车 LOGO 案例**(本 skill 第一份验证产物,2025.11):
> - 4 章节(项目背景 / 设计判断 / 落地交付 / 方法沉淀)
> - 8 段 + Hero + 4 章节封面 + outro = 14 屏滚动
> - 主题色:🌿 森林墨
> - 体量:~3600 字 / 14 数据点 / 6-9 条引用 / 8 张图位
> - 阅读时长:扫读 3 分钟 / 深读 8 分钟

## 目录结构

```
magazine-portfolio-skill/
├── SKILL.md                       ← Skill 主文件:Agent 行为规范 + 工作流 7 步 + 触发词
├── README.md                      ← 本文件
├── CHANGELOG.md                   ← 版本变更记录
├── LICENSE                        ← MIT License 全文
├── assets/
│   └── template.html              ← 完整可运行的长滚动种子 HTML(CSS + WebGL + 滚动 JS 全配好)
└── references/
    │  ── 梳理阶段(Step 0-1) ──
    ├── workflow.md                ← 完整梳理 SOP(8 阶段 A-H)
    ├── 7-questions.md             ← 7 问轻量复盘模板
    ├── content-architecture.md    ← 内容架构稿模板(4 章节 8 段)
    ├── material-collection.md     ← 主张-佐证素材采集表
    │
    │  ── 视觉化阶段(Step 2-7) ──
    ├── sections.md                ← 8 种段落布局骨架(可直接粘贴)
    ├── components.md              ← 组件手册(字体 / 色 / 网格 / 章节封面 / 数据卡 / Pipeline / 引用块 / 服务视角)
    ├── themes.md                  ← 5 套主题色预设(继承 guizang)
    ├── content-density.md         ← 段落级信息密度规则(必配 9 件 + 反向自检 5 项)
    ├── image-prompts.md           ← 配图类型、比例、提示词(作品集场景版)
    └── checklist.md               ← 质量检查清单(P0/P1/P2/P3 分级)
```

## 主题色预设

从 `references/themes.md` 里选一套 —— **不允许自定义 hex 值**,保护美学比给自由更重要。

| 主题 | 适合 |
|------|------|
| 🖋 墨水经典 | 通用 / 商业 / 互联网大厂 / 不知道选啥的默认 |
| 🌊 靛蓝瓷 | 科技 / 研究 / AI / 工程师作品集 |
| 🌿 森林墨 ★ 默认 | 公益 / 教育 / 文化 / 可持续 / 自然 |
| 🍂 牛皮纸 | 怀旧 / 人文 / 文学 / 内容创作 |
| 🌙 沙丘 | 设计 / 艺术 / 创意 / 视觉品牌 |

切换主题只需替换 `template.html` 开头 `:root{}` 里的 6 行变量,其他 CSS 全走 `var(--...)`。

## 8 种段落布局

| Layout | 用途 | 适用段 |
|---|---|---|
| 1. Hero | 项目封面 + WebGL 背景 + 5 数据卡 | 整页第一段 |
| 2. 章节封面(act-cover) | 深底反白大字,视觉断点 | 每章节开头 |
| 3. 数据大字报 | 6 数据卡 / 3 大数据卡(L1-L3) | 1A 项目定位 / 3A 兜底能力 |
| 4. 左文右图(split) | 7:5,左副文右 sticky 图 | 1B / 2B 视觉锚段 |
| 5. Before/After 对比 | 1:1 双列对比 | 2A 流程压缩 / 旧 vs 新 |
| 6. 双 Pipeline | 流水线拆解 | 2C 两轮迭代 / 工作流 |
| 7. 衍生家族图片网格 | 3×2 方图网格 | 3B 衍生家族 / 品牌物料 |
| 8. 收尾 outro | 深底大引用 + 角章 + 标签 | 4A 方法沉淀 |

## 核心设计原则

> 这些原则是从**箱子第一份长滚动作品页(2026-05-04 火种车 LOGO)** 迭代出来的。违反任何一条,招聘方阅读体验就垮。

1. **稳定优于性格** — 招聘方需要"安心阅读"的稳定感,不是"性格抓眼球"的冲击感
2. **内容自洽优于演讲辅助** — 招聘方一个人扫,看完就 get,每段含完整副文 + 引用 + 服务视角
3. **结构优于装饰** — 不用阴影 / 浮动卡片 / padding box,信息靠**字号 + 字体对比 + 网格留白**
4. **章节呼吸优于段落连贯** — 每个章节封面是深底反白的视觉断点,让招聘方滚到那里就知道"进入新章节"
5. **服务视角优于自我表现** — 每段必须过"服务视角"门:主语是项目方,不是"我"
6. **保留口气词优于 corporate 翻译** — "兜底能力""一眼卯定"这种用户原话保留,不要换成"全链路 / 闭环交付"
7. **术语统一** — 同一概念中英文一致,不混译

## 与 guizang-ppt-skill 的差异速查

| 维度 | guizang-ppt-skill | magazine-portfolio-skill |
|---|---|---|
| 形态 | 横翻 deck | 长滚动单页 |
| 场景 | 线下演讲(有人讲) | 招聘方静态阅读(无人讲) |
| 每屏字数 | 一句话 + 数据 | 完整副文 + 引用 + 服务视角 |
| 翻页交互 | ← → / 滚轮 / 触屏 / 圆点 | 滚轮 / 触控板 / 顶部章节锚点 |
| WebGL 背景 | 双 canvas(light/dark 切换) | 单 canvas(只 Hero 区) |
| 章节呼吸 | hero 页穿插 | act-cover 章节封面(深底反白) |
| 信息密度 | 低(克制留白) | 高(密度自洽,但仍克制) |
| 总长度 | 10-30 屏 | 6-12 段 |

## 视觉参考

- *Monocle* 杂志的版式
- guizang-ppt-skill 的电子墨水美学
- Maggie Appleton / Geoffrey Litt / thesephist 等独立创作者作品集
- 箱子 火种车 LOGO 第一份长滚动作品页(本 skill 的母本)

## 贡献

Bug、排版问题、新布局需求 —— 欢迎开 Issue 或 PR。改动请优先:

- 在 `template.html` 里补类,不要让 `sections.md` 使用未定义的类
- 把踩过的坑写到 `checklist.md` 对应的 P0 / P1 / P2 / P3 级别
- 新主题色进 `themes.md` 并给出适合的求职方向

## 致谢

- [@op7418 / 歸藏](https://github.com/op7418) —— [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) 的视觉血缘、字体系统、主题色预设
- *Monocle* 杂志的版式启发
- AI 火种车 LOGO 项目(2025.11)—— 本 skill 的真实迭代母本

## FAQ

### Q1 · 可以自定义主题色吗?

**不可以**。只能从 5 套预设里选一套(墨水经典 / 靛蓝瓷 / 森林墨 / 牛皮纸 / 沙丘)。
**为什么**:色彩搭配错了画面瞬间变丑,**保护美学比给自由更重要**(继承 guizang-ppt-skill 的硬规则)。
**作品集场景的额外约束**:整站(首页 + 关于页 + 所有项目页)用同一套主题,加深品牌记忆。

### Q2 · 可以加自定义布局吗?

**可以**,但要按规范:
1. 在 `assets/template.html` 的 `<style>` 块里**先补类**(不要发明新类)
2. 在 `references/sections.md` 里**加完整可粘贴的骨架**(对照其他 8 种 layout 的格式)
3. 加主题节奏建议(light / dark / hero light / hero dark 哪种)
4. 把踩过的坑写到 `references/checklist.md` 对应的 P0/P1/P2/P3 级别

### Q3 · 可以用这个 skill 做整站(首页 + 关于页 + 多个项目页)吗?

**当前 v3 不行**。本 skill 只生成**单个项目页**的长滚动 HTML。
**计划**:整站功能放在更上层的"作品集站点 skill"里(尚未做),会调用本 skill 做每个项目页。

### Q4 · 能不能让 AI 替我写主张 / 副文 / 锚点金句?

**部分可以,但有边界**:
- ✅ AI 可以**包装**(把你的大白话用专业术语 + 节奏感升级)
- ✅ AI 可以**整理**(把你说的零散事项归到对应章节)
- ❌ AI 不能**编造**(数据 / 客户名 / 项目方信息必须来自你的口述或文档)
- ❌ AI 不能**虚构**(每条主张需要 1-3 类佐证才能写)

详细规则见 SKILL.md 的「能力边界 ✅❌」段。

### Q5 · 配图必须是真实素材吗?

**优先真实素材,真实素材 > AI 生成图**:
- 真实素材(项目交付物 / 过程截图 / 微信对话 / 朋友圈)在招聘方眼里**力度差三倍**
- 只有当真实素材**确实没有**或者**涉及隐私必须打码到无法识别**时,才考虑 GPT-M 2.0 / Lovart 等工具补图

详细见 `references/image-prompts.md`。

### Q6 · 已经有内容架构稿了,可以跳过梳理阶段(Step 0-1)直接生成 HTML 吗?

**可以**。Step 0 就是"梳理判断"——
- 已有完整内容架构稿(4 章节 / 8 段已过质量门) → 直接进 Step 2
- 已有 5000+ 字长复盘文 → Step 1 简化路径(读复盘 → 拆主张 → 跳过 7 问)
- 没有任何梳理产物 → Step 1 完整走完

### Q7 · 这个 skill 跟 guizang-ppt-skill 必须二选一吗?

**不**。两个是**平行姊妹**,共享同一份内容架构稿,产出**两种形态**:
- magazine-portfolio-skill:**长滚动 HTML**(招聘方静态阅读)= 主战场
- guizang-ppt-skill:**横翻 deck**(线下演讲 / 路演)= 补充

最佳实践:**两个都用**,内容架构稿做一次,产出两份适配不同场景。

### Q8 · 我修改了 template.html 后会不会跟未来的 v4 / v5 冲突?

**会**。建议:
- 个人定制版改动放 **fork** 仓库,不直接改主仓库
- 主仓库的 v4 / v5 升级时,**手动 merge** 你需要的新功能
- 如果你的改动有通用价值,提 **PR** 合并回主仓库

---

## Changelog

详见 [CHANGELOG.md](./CHANGELOG.md)。

**最新版本**:[v3.1 — 2026-05-06](./CHANGELOG.md#v31--2026-05-06)
- 修 4 个过时 bug(install 链接 / 协作图 / 目录结构 / 使用流程)
- 加 Showcase 段(等用户截图)
- Changelog 拆出独立 CHANGELOG.md
- 加 FAQ 段

---

## License

[MIT License](./LICENSE) © 2026 [@xiangzi-cyber](https://github.com/xiangzi-cyber)
