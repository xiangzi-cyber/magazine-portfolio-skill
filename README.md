# Magazine Portfolio Skill

> 生成“电子杂志 × 电子墨水”风格的长滚动作品集网页。现在它不只是一个 HTML 模板 skill，而是一套带 **规则门禁 / 阶段检查 / 失败回退** 的作品集生产流程。

它服务的场景很明确：设计师、产品经理、独立创作者需要把零散素材、项目复盘、图片证据和个人判断，整理成一份招聘方可以独立阅读的单项目长滚动作品页。

视觉血缘继承自 [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)：衬线大标题、非衬线正文、等宽元数据、电子墨水质感、5 套主题色。区别在于：`guizang-ppt-skill` 服务线下演讲，`magazine-portfolio-skill` 服务招聘方静态阅读。

---

## 最新架构：规则可应用，而不是规则堆叠

v3.7 之后，本 skill 的重点从“写更多注意事项”升级为“让规则在调用时真的生效”。

核心变化在 [`references/rule-gates.md`](./references/rule-gates.md)：

```text
规则 = 触发条件 + 所属阶段 + 需要读取的文件 + 结束检查 + 失败回退动作
```

每次调用 skill 时，Agent 不再一次性读取所有规则，而是按任务类型选择当前阶段需要的门禁：

```text
1. 识别任务类型
2. 选择门禁
3. 只读取对应规则包
4. 执行阶段
5. 阶段结束检查
6. 继续 / 回退 / 停止
```

这样以前容易被忽略的规则，例如“不要假大空”“先做文案稿再进 HTML”“进图不改文案”“同类组件统一修”“生成后必须浏览器验收”，都被挂到了对应流程节点上。

---

## 这套 skill 解决什么问题

很多作品集任务失败，不是因为没有规则，而是因为规则没有被流程触发。

常见问题：

- 素材很多，但写出来像空泛方法论。
- 文案很用力，但不像真实的人做的项目。
- 还没读懂材料，就直接进入 HTML。
- 用户只要求进图，页面文案却被顺手重写。
- 视觉问题只修截图里那一处，没有修同类组件。
- HTML 生成完，只做静态检查，没有浏览器验收。

v3.7 的解决方式：把所有关键规则挂到阶段门禁，每个阶段结束必须检查，没过就回退。

---

## 适合 / 不适合

适合：

- 设计师 / 产品经理 / 独立创作者的求职作品集项目页。
- 需要从零散素材整理出内容架构、文案稿和最终 HTML 的项目。
- 需要保留用户真实经历、口气词、证据链和不完美的作品集。
- 需要大量图片、截图、过程证据进入页面，并保持设计力。
- 需要招聘方静态阅读，不依赖现场讲解的项目展示。

不适合：

- 线下演讲辅助 deck。请用 [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)。
- 数据看板、课程培训、大段表格型报告。
- 多项目整站、首页、关于页、后端 API 或 SEO 工程。
- 帮用户编造不存在的项目、客户、数据或评价。

---

## 运行机制

### 1. 先识别任务类型

用户提出需求后，先判断本轮属于哪类任务：

| 用户意图 | 激活门禁 | 第一读取文件 |
|---|---|---|
| 梳理项目 / 整理素材 / 捋项目 | G0 + G1 | [`workflow.md`](./references/workflow.md) |
| 写文案 / 改叙事 / 招聘方视角 | G1 + G2 | [`workflow.md`](./references/workflow.md) |
| 加图 / 进图 / 替换图 | G3 + G4 + G6 | [`image-intake-and-screenshot-proof.md`](./references/image-intake-and-screenshot-proof.md) |
| 压缩包 / Eagle / 大图入库 | G3 + G6 | [`image-intake-and-screenshot-proof.md`](./references/image-intake-and-screenshot-proof.md) |
| 生成 HTML / 重做页面 | G2 + G5 + G6 | [`sections.md`](./references/sections.md) + [`checklist.md`](./references/checklist.md) |
| 视觉不舒服 / 空白大 / 图文乱 | G6 + G7 | [`checklist.md`](./references/checklist.md) |
| 最终交付 / 预览验收 | G6 | [`checklist.md`](./references/checklist.md) |

### 2. 再声明本轮激活门禁

每轮任务开始时，Agent 应先写出：

```text
本轮激活门禁: [G1 源材料] [G2 写作] [G6 浏览器验收]
```

然后只读取这些门禁需要的参考文件，避免规则过载。

### 3. 每个阶段结束必须检查

固定格式：

```text
阶段结束检查: [阶段名]
- 已产出: [文件 / 页面 / 清单]
- 已检查: [本阶段门禁编号]
- 未通过: [无 / 具体问题]
- 下一步: [继续到哪个阶段 / 回退补什么]
```

如果 `未通过` 不是“无”，不能继续推进，只能回退补材料、降级主张、重写文案、修图或重新验证。

---

## 核心产物链

完整项目会经历这些产物：

| 产物 | 作用 | 对应阶段 |
|---|---|---|
| `项目入口-XXX.md` | 7 问轻量复盘，确定项目基本语境 | B 7 问 |
| `原文摘录与真实问题拆解-XXX.md` | 把真实材料读出来，防止假大空 | D 源材料深读 |
| `素材采集表-XXX.md` | 每条主张绑定 1-3 类佐证 | E 主张-佐证 |
| `作品页-XXX-内容架构稿.md` | 4 章节 8 段，一段讲一件事 | F 内容架构 |
| `作品页-XXX-文案稿.md` | 先事实段，再服务视角，最后标题 / 金句 | F2 文案稿 |
| `index.html` | 最终长滚动作品集页面 | HTML 生成 |
| 图片落位表 / 素材清单 | 记录图片来源、用途、状态、缺口 | 图片入库 |
| 阶段结束检查记录 | 记录已产出、已检查、未通过和下一步 | 全流程 |

---

## 主要门禁

| 门禁 | 作用 | 失败时 |
|---|---|---|
| G0 任务路由 | 判断本轮是梳理、写作、进图、HTML、视觉修复还是验收 | 回到需求澄清 |
| G1 源材料深读 | 先读出真实问题、动作、不完美、证据缺口 | 不写文案、不做 HTML |
| G2 写作流程 | 文案必须先事实段，再服务视角，再标题 / 金句 | 不进 HTML，重写文案稿 |
| G3 图片入库 | 原图不动，筛选、命名、压缩、落位表、缺口分级 | 不替换页面 |
| G4 Image-only | 用户只要求进图时，只改图，不改文案 | 撤回文案改动 |
| G5 HTML 生成 | 类名、章节、段落密度、主题色过关 | 不交付 HTML |
| G6 浏览器验收 | 图片加载、横向溢出、语义对应、同类组件统一 | 回到 HTML / 图片阶段修 |
| G7 反馈迭代 | 用户指出问题时，找同类问题统一修 | 不只修截图那一处 |

---

## 典型工作流

### A. 从零散素材到作品页

```text
G0 任务路由
→ G1 源材料深读
→ G2 写作流程
→ G5 HTML 生成
→ G6 浏览器验收
```

适合：用户只有素材、长复盘、截图、文件夹，还没有稳定作品集结构。

关键原则：先读材料，再写判断；先文案稿，再进 HTML。

### B. 只做写作 / 文案重写

```text
G1 源材料深读
→ G2 写作流程
→ 阶段结束检查
```

适合：用户说“假大空”“不像我”“没读懂素材”“改成招聘方视角”。

关键原则：不从术语反推故事，不用空泛词补证据。

### C. 只进图 / 替换图

```text
G3 图片入库
→ G4 Image-only
→ G6 浏览器验收
```

适合：用户说“上图”“进图”“换图”“这里放这张截图”。

关键原则：进图 = 入库命名 + 压缩处理 + 替换占位 + 验证加载 + 更新清单。除此之外都不是进图。

### D. 视觉修复

```text
G6 浏览器验收
→ G7 反馈迭代
→ G6 复查
```

适合：用户说“这里不舒服”“空白太大”“线框太多”“图文节奏乱”。

关键原则：先判断是不是同类组件共性，再统一修，不只修截图那一处。

---

## 安装

### Codex 安装（推荐）

如果你在 Codex 里使用 skills，安装到 `~/.codex/skills`：

```bash
git clone https://github.com/xiangzi-cyber/magazine-portfolio-skill.git ~/.codex/skills/magazine-portfolio-skill
```

已安装过旧版时，进入本地 skill 目录更新：

```bash
git -C ~/.codex/skills/magazine-portfolio-skill pull
```

### 通用 Skills CLI

如果你的环境支持 `skills` CLI，也可以用：

```bash
npx skills add https://github.com/xiangzi-cyber/magazine-portfolio-skill --skill magazine-portfolio-skill
```

### Claude Code 手动安装

如果你在 Claude Code 的 skills 目录里使用：

```bash
git clone https://github.com/xiangzi-cyber/magazine-portfolio-skill.git ~/.claude/skills/magazine-portfolio-skill
```

### 发给 AI Agent 的安装提示

```text
帮我安装 magazine-portfolio-skill。请执行：
1. 判断当前环境的 skills 目录：Codex 用 ~/.codex/skills，Claude Code 用 ~/.claude/skills。
2. git clone https://github.com/xiangzi-cyber/magazine-portfolio-skill.git 到对应 skills 目录下的 magazine-portfolio-skill。
3. 验证目录里有 SKILL.md、assets/、references/。
4. 之后我说“做长滚动作品集 / 杂志风作品页 / magazine portfolio”时，请调用这个 skill，并先读取 references/rule-gates.md。
```

---

## 触发关键词

- “做一份长滚动作品集”
- “做作品页长滚动版”
- “杂志风作品集”
- “招聘方阅读型作品集”
- “magazine portfolio” / “editorial portfolio”
- “把这个项目素材整理成作品集 HTML”
- “先做内容架构稿，再做 HTML”
- “只进图，不改文案”

---

## 视觉系统

输出是一份单文件 HTML：

- 4 章节结构：项目背景 / 设计判断 / 落地交付 / 方法沉淀。
- Hero 区 WebGL 流体背景。
- 顶部 sticky 章节锚点。
- 滚动驱动入场动画。
- 段落级信息密度：主标、副标、副文、引用、图片证据、锚点金句。
- 图像叙事占主导：设计作品集默认图 60% / 文 40%。
- 5 套主题色预设：墨水经典、靛蓝瓷、森林墨、牛皮纸、沙丘。

主题与组件详见：

- [`references/themes.md`](./references/themes.md)
- [`references/components.md`](./references/components.md)
- [`references/sections.md`](./references/sections.md)
- [`assets/template.html`](./assets/template.html)

---

## 目录结构

```text
magazine-portfolio-skill/
├── SKILL.md
├── README.md
├── CHANGELOG.md
├── LICENSE
├── assets/
│   └── template.html
└── references/
    ├── rule-gates.md
    ├── workflow.md
    ├── 7-questions.md
    ├── content-architecture.md
    ├── material-collection.md
    ├── image-intake-and-screenshot-proof.md
    ├── sections.md
    ├── components.md
    ├── themes.md
    ├── content-density.md
    ├── image-prompts.md
    └── checklist.md
```

核心文件说明：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | skill 入口、行为规范、总工作流 |
| `references/rule-gates.md` | 规则运行架构、门禁、阶段结束检查、规则索引 |
| `references/workflow.md` | 梳理、源材料深读、文案稿生成流程 |
| `references/image-intake-and-screenshot-proof.md` | 图片入库、截图证据板、Image-only Mode |
| `references/checklist.md` | HTML 与视觉交付前的 P0/P1/P2/P3 检查 |
| `assets/template.html` | 可运行的长滚动 HTML 种子模板 |

---

## 与 guizang-ppt-skill 的关系

| 维度 | guizang-ppt-skill | magazine-portfolio-skill |
|---|---|---|
| 形态 | 横向翻页 deck | 长滚动单页 |
| 场景 | 线下演讲，有人讲 | 招聘方静态阅读，无人讲 |
| 内容密度 | 一屏一句话 / 强节奏 | 信息密度自洽 / 可独立阅读 |
| 图片作用 | 演讲视觉节奏 | 作品集主叙事材料 |
| 输出 | HTML deck | 单文件长滚动 HTML |

两者可以共享同一份内容架构稿：`magazine-portfolio-skill` 做招聘方阅读版，`guizang-ppt-skill` 做线下演讲版。

---

## 版本记录

完整记录见 [`CHANGELOG.md`](./CHANGELOG.md)。

当前重点版本：

- v3.7：规则应用架构、运行循环、阶段结束检查、规则索引。
- v3.6：Image-only Mode、截图插入双模式、进图不改文案。
- v3.5：图片入库与截图证据 SOP。
- v3.4：图像叙事节奏、视觉 QA、保义压缩。

---

## License

[MIT License](./LICENSE)
