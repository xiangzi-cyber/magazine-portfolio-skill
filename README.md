# Magazine Portfolio Skill

![Magazine Portfolio Skill 封面](./assets/readme-cover.png)

一句话说：这是一个给设计师、产品经理、独立创作者用的作品集网页 skill。它帮你把聊天记录、项目截图、复盘文档、图片文件夹，整理成一页招聘方能独立读懂的长滚动作品集网页。

它不是单纯的 HTML 模板。它更像一个作品集制作流程：先读懂素材，再写清项目故事，再放图片，最后生成网页并检查。

它是在 [`guizang-ppt-skill`](https://github.com/op7418/guizang-ppt-skill) 的基础上，针对“求职作品集”这个更垂直的场景做的再迭代：保留杂志风、网页化表达和视觉节奏，但把重点从“演讲展示”改成“招聘方自己阅读”。

---

## 它解决什么问题

很多作品集不是做不出来，而是卡在这几件事上：

- 素材很多，但不知道怎么讲成一个项目故事。
- AI 写出来很漂亮，但像空话，不像真实经历。
- 图片放进页面后，图文关系不清楚。
- 用户只想加图，AI 却顺手改了文案。
- 页面生成完了，但没有认真看浏览器效果。

这个 skill 的目标很简单：让作品集从“素材堆”变成“招聘方看得懂、信得过、能判断你能力”的项目页。

---

## 它怎么帮你做

![它怎么帮你做作品集](./assets/workflow-for-designers.png)

完整流程可以理解成 5 步：

| 步骤 | 做什么 | 产出 |
|---|---|---|
| 1. 给素材 | 你提供截图、复盘、聊天记录、文件夹 | 素材入口 |
| 2. 找重点 | 从素材里找真实问题、你的动作、证据 | 源材料拆解 |
| 3. 写文案 | 先写事实，再写标题和金句 | 作品页文案稿 |
| 4. 放图片 | 每张图确认放哪、证明什么 | 图片落位表 |
| 5. 生成网页 | 做成长滚动 HTML，并用浏览器检查 | 单文件作品集网页 |

重点是：不要一上来就写页面。先把项目讲清楚，页面才会稳。

---

## 新版最大的变化：每一步都有检查点

过去很多规则会失效，是因为它们只是“提醒”：比如不要乱写、不要乱改文案、记得检查图片。任务一长，模型就容易忘。

新版把这些提醒改成检查点：每个阶段结束都要回答“做了什么、检查了什么、哪里没过、下一步怎么办”。如果没过，就不能继续往下走。

![规则变成检查点](./assets/rules-as-checkpoints.png)

简单说：

```text
规则 = 什么时候触发 + 用在哪一步 + 要读哪些文件 + 怎么检查 + 没过怎么办
```

例子：

| 场景 | 检查点 | 没过怎么办 |
|---|---|---|
| 写文案 | 这句话有没有真实素材支撑？ | 没有就删掉或降级 |
| 进图 | 这张图放哪里、证明什么？ | 说不清就先不放 |
| 只加图 | 有没有改动已确认文案？ | 改了就撤回 |
| 生成网页 | 图片是否加载、手机端是否溢出？ | 回去修页面 |

详细规则放在 [`references/rule-gates.md`](./references/rule-gates.md)，但普通使用者只需要记住一句：每一步都要检查，没过就回退。

---

## 你会得到什么

一次完整使用，通常会得到这些东西：

| 产物 | 用途 |
|---|---|
| `项目入口-XXX.md` | 用 7 个问题先把项目说清楚 |
| `原文摘录与真实问题拆解-XXX.md` | 从真实素材里找问题、动作和证据 |
| `素材采集表-XXX.md` | 每个主张对应哪些图片、截图、记录 |
| `作品页-XXX-内容架构稿.md` | 4 个章节，安排页面骨架 |
| `作品页-XXX-文案稿.md` | 先确认文案，再进入 HTML |
| `index.html` | 最终长滚动作品集网页 |
| 图片落位表 / 素材清单 | 记录每张图放哪里、证明什么 |

最终网页是单文件 HTML，可以直接用浏览器打开。

---

## 适合谁

适合：

- 设计师、产品经理、独立创作者做求职作品集。
- 你手里有素材，但还没有讲成一个完整项目故事。
- 你希望作品集能被招聘方独立阅读，不需要你在旁边解释。
- 你需要真实图片、截图、过程证据进入页面。

不适合：

- 线下演讲 PPT。请用 [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)。
- 数据看板、课程课件、大段表格报告。
- 多页面整站、后端 API、复杂 SEO 工程。
- 编造不存在的项目、客户、数据或评价。

---

## 怎么触发

安装后，说这些话就适合调用它：

- “做一份长滚动作品集”
- “把这个项目素材整理成作品集网页”
- “做一个招聘方能读懂的项目页”
- “先做内容架构稿，再做 HTML”
- “只进图，不改文案”
- “这个作品集写得太空，帮我重新梳理”

---

## 安装

### Codex 安装

```bash
git clone https://github.com/xiangzi-cyber/magazine-portfolio-skill.git ~/.codex/skills/magazine-portfolio-skill
```

已安装过旧版时更新：

```bash
git -C ~/.codex/skills/magazine-portfolio-skill pull
```

### Claude Code 手动安装

```bash
git clone https://github.com/xiangzi-cyber/magazine-portfolio-skill.git ~/.claude/skills/magazine-portfolio-skill
```

---

## 文件结构

```text
magazine-portfolio-skill/
├── SKILL.md
├── README.md
├── CHANGELOG.md
├── assets/
│   ├── template.html
│   ├── readme-cover.png
│   ├── workflow-for-designers.png
│   └── rules-as-checkpoints.png
├── prompts/
│   └── readme-illustrations.md
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

核心文件：

| 文件 | 作用 |
|---|---|
| `SKILL.md` | skill 入口，告诉 AI 怎么调用这套流程 |
| `references/rule-gates.md` | 新版检查点系统，防止规则被忽略 |
| `references/workflow.md` | 从素材到文案稿的完整流程 |
| `references/image-intake-and-screenshot-proof.md` | 图片入库、截图证据板、只进图不改文案 |
| `references/checklist.md` | HTML 和视觉交付前检查清单 |
| `assets/template.html` | 可运行的长滚动网页模板 |

---

## 和 guizang-ppt-skill 的关系

这个 skill 不是从零开始做的。它是基于 [`guizang-ppt-skill`](https://github.com/op7418/guizang-ppt-skill) 的一次场景化再迭代。

可以这样理解：

- `guizang-ppt-skill` 解决的是“怎么做一份有杂志感、有节奏的网页 PPT”。
- `magazine-portfolio-skill` 解决的是“怎么把一个真实项目讲成求职作品集，让招聘方自己看懂”。

它继承了 guizang 的这些能力：

- 杂志风网页视觉。
- 电子墨水质感。
- 图文节奏和章节感。
- 单文件 HTML 的轻交付方式。

但它重新优化了求职作品集里的痛点：

- 招聘方不会听你现场讲，所以页面必须自己讲清楚。
- 作品集不能只好看，还要证明你做过什么、怎么判断、怎么落地。
- 不能把项目写成空泛方法论，要从真实素材里找证据。
- 图片不能只是装饰，要说明它放在哪里、证明什么。
- AI 不能边做边飘，所以每一步都要有检查点。

|  | guizang-ppt-skill | magazine-portfolio-skill |
|---|---|---|
| 原始场景 | 演讲、分享、发布会 | 求职作品集、项目复盘 |
| 阅读方式 | 有人讲，观众跟着翻页 | 没人讲，招聘方自己扫读 |
| 输出形态 | 横向翻页 PPT 网页 | 长滚动单项目作品页 |
| 核心重点 | 视觉节奏、演讲氛围、页面冲击力 | 项目故事、证据链、能力可信度 |
| 图片作用 | 增强演讲节奏 | 作为作品证据和叙事主材料 |
| 新增能力 | - | 素材深读、文案稿、图片落位、阶段检查、失败回退 |

两个可以一起用：同一份项目素材，先用 `magazine-portfolio-skill` 做招聘方阅读版，再按需要用 `guizang-ppt-skill` 改成演讲版。

---

## License

[MIT License](./LICENSE)
