# Changelog

本文件按时间倒序记录 magazine-portfolio-skill 的版本变更。
格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),版本号遵循 [SemVer](https://semver.org/lang/zh-CN/)。

---

## [v5.3] — 2026-06-18

### Added

- 补齐本地未入库的模板审查产物,包括 `baseline.md5`、`baseline-task1.md5` 和 5 张模板审查截图。
- README 新增「2026-06-18 · 模板审查产物补齐」,说明这些文件用于回看模板评审、视觉方向和基线保护,不改变 skill 的触发方式、页面生成流程或校验器规则。

---

## [v5.2] — 2026-06-12

### Added

- 新增 `references/design-constraints.md`:沉淀"箱子反平庸清单",把禁纯白纯黑、hex 白名单、紫色四铁律、动效边界、真实图优先、版式骨架锁定和文字落图自适应写成"为什么 + 机器检测方式"。
- 新增 `references/eval-rubric.md`:定义 100 分视觉质量评分表,覆盖燃烧态对比、信息密度、克制度、科学手账完整性和品牌一致性;总分低于 80 必须回炉。
- 新增 `references/gotchas.md`:建立踩坑记录模板,预填紫底大字发糊、批注移动端溢出、截图裸放显廉价三条已知坑。
- 新增 `x-adaptive-caption` 图上文字组件,用 `data-contrast="dark|light"` 和纯色遮罩条处理图上文字可读性。
- 校验器扩展到 30 项,新增渐变色相、紫色 glow、backdrop blur、动效属性和图上文字 contrast 标注检查。

---

## [v5.1] — 2026-06-11

### Changed

- README 首页介绍改为外部读者视角,将项目定位为面向求职作品集生产的 AI 设计工程系统。
- README 的“简历说明”调整为“对外项目说明”,突出问题背景、系统方案、关键产出和可验证价值。
- README 的参考关系说明降权为“参考与边界”,避免把项目叙事中心放在 `guizang-ppt-skill` 来源关系上。

---

## [v5.0] — 2026-06-10

### Added

- 新增 `references/typography.md`:定义 Explorer Voice 五层字体系统、9 级字号阶梯、中文排版规则和字体加载策略。
- 新增 `references/x-components.md`:沉淀箱子探索者手记组件库,包括读数卡、图号、批注、戳记、路径、探索者剪影、标本网格、对照样本和收尾宣言。
- 新增 `references/homepage.md` 与 `assets/demo-homepage.html`:定义首页 H01-H06 固定版式。
- 新增 `references/expedition-profiles.md`:定义 `gold / rose / cyan` 三份考察档案,用于多项目页的差异化表达。
- 新增 `scripts/validate-xiangzi-page.mjs` 与 pass/fail fixtures,把页面护栏扩展为 22 项自动校验。
- README 新增 v5 品牌系统说明与“简历说明”区块,方便把本项目写入作品集或简历。

### Changed

- `assets/template.html` 注入 Explorer Violet 品牌扩展、Explorer Voice 字体 token、`data-expedition` 档案切换和 `.voice-*` 声调类。
- `x-` 组件的 accent 使用收束到 `--accent-current`,避免同一项目页混用多种副色。
- 校验器新增 `data-expedition` 注册、accent 档案一致性和 `.voice-*` 使用边界检查。
- `references/themes.md` 补充第 6 套电紫 Explorer Violet 的品牌发散规则。
- README / SKILL.md 将与 `guizang-ppt-skill` 的关系改为“早期受启发、场景相邻、系统独立”,避免把本 skill 描述成 guizang 的二次改版。
- README 的“简历说明”改为面向外部读者的专业项目表述,突出 AI 工作流系统、非结构化材料转译、品牌组件与自动化质量护栏。

---

## [v4.0] — 2026-06-10

### Changed

- 2026-06-10 · 结构重构：SKILL.md 瘦身为路由器，规则收归 rule-gates 单一事实源，M/V 统一编号。输出结构（4 章节/8 布局/5 套继承主题）保持兼容。
- 2026-06-10 · 品牌色系校准：第 6 套主题从箱子主图提取为「电紫 Explorer Violet」,用 `--brand-purple` / `--line-purple` / `--accent-*` 支撑首页、文字、主线和组件发散。

### Added

- 新增 README 区块「2026-06-10 更新：v4 结构重构」,用普通读者能理解的方式解释本次重构方向。
- 新增 `assets/v4-architecture-refactor.png`:用 GPT 图片模型生成中文信息图,说明 `SKILL.md` 变薄、规则归位、编号统一和图片规则通用化。

---

## [v3.10] — 2026-05-29

### Added

- 新增 README 区块「2026-05-29 更新：模板激活与图片落位」,解释本次模板生效和图片处理升级。
- 新增 `assets/template-and-image-gates.png`:用 GPT 图片模型生成中文信息图,说明“先让模板生效,再让每张图承担清楚角色”。
- 新增 `references/template-activation-and-brand-system-gate.md`:定义模板是否真的被激活、品牌系统是否真的继承的检查方式。
- 新增 `references/huozhongche-image-layout.md`:沉淀火种车母本图片处理法,按图片角色决定总览区、过程墙、细节条、现场照片和移动端结构。
- 新增 P0「模板激活保护」:必须先证明页面继承母版 template / class / token / 节奏,再做局部优化。

### Changed

- `SKILL.md` 加入模板激活保护与火种车图片处理法的触发说明。
- `references/rule-gates.md` 增加“品牌系统没生效 / 同一个 skill 但画风不一致”的任务路由。
- `references/checklist.md` 加强类名预检和内容图裁切检查。

## [v3.9] — 2026-05-27

### Added

- 新增 README 区块「2026-05-27 更新：终稿交付三道门」,用通俗语言解释本次交付前检查升级。
- 新增 `assets/final-review-gates.png`:用 GPT 图片模型生成中文信息图,解释口吻隔离、图片去重、交付验收三道门。
- 新增 `作品页-XXX-HTML内容架构稿.md` 作为从文案稿进入 HTML 前的中间产物,用于把内部检查口吻转成最终网页内容。
- 新增 P0「终稿口吻隔离」,防止审稿口吻进入最终 HTML。
- 新增 P0「图片证据去重」,要求重复图片有清楚落位理由。

### Changed

- `assets/template.html` 移除 `.service-note` 可见组件,章节说明改为成品作品页口吻。
- `references/workflow.md` 增加阶段 G2,要求先生成 HTML 内容架构稿,再进入 HTML。
- `references/checklist.md` 增加内部口吻门禁和重复图片门禁。

---

## [v3.8] — 2026-05-26

### Added

- 新增 README 首图 `assets/readme-cover.png`,用中文信息图说明 skill 的核心卖点和最终产出。
- 新增 `assets/workflow-for-designers.png`,用 5 步流程图说明从素材到作品集网页的制作路径。
- 新增 `assets/rules-as-checkpoints.png`,用通俗信息图解释“规则不是提醒,而是检查点”。
- 新增 `prompts/readme-illustrations.md`,记录 README 配图的信息结构、风格和目标。

### Changed

- README 改为面向设计师、产品经理和独立创作者的通俗介绍,减少维护者视角和过度专业术语。
- README 补充 `magazine-portfolio-skill` 与 `guizang-ppt-skill` 的源流关系:不是替代关系,而是同一套视觉基因在求职作品集场景里的延展。
- 移除早期不够清晰的架构说明图和 SVG 运行图,改用更容易理解的中文 PNG 信息图。

---

## [v3.7] — 2026-05-25

### Added

- 新增 `references/rule-gates.md`:把规则按任务阶段拆成 G0-G7 门禁,要求每轮先声明"本轮激活门禁",防止长 checklist 被忽略。
- 新增"阶段结束检查协议"和阶段结束检查表:每个环节结束都要记录已产出、已检查、未通过项和下一步。
- 新增"规则应用架构":每条规则必须挂到触发条件、所属阶段、读取文件、结束检查和失败回退动作。
- 新增"运行循环"、"任务类型到门禁映射"、"规则索引"和"新增规则接入模板",把旧规则改造成可调度的规则包。
- 新增源材料深读产物 `原文摘录与真实问题拆解-XXX.md`,用于素材多、个人经历强、用户反馈"假大空 / 没读懂素材 / 不像我"的作品集任务。
- 新增 `阶段 F2 · 文案稿生成`:规定先事实段、再服务视角、再标题 / 金句、最后专业包装。
- 新增 P0-11A 图片入库门禁:压缩包、Eagle 图、打印级大图需先入库、命名、压缩、落位表、缺口分级,再进页面。

### Changed

- `SKILL.md` 加载顺序调整为先读 `rule-gates.md`,再按当前任务读取 workflow / image SOP / checklist。
- Step 1 核心产物从"三件"扩展为源材料、素材采集、内容架构、文案稿的连续链路。

---

## [v3.6] — 2026-05-18/19

### Added

- 新增 P0「文案冻结保护」和对应进图执行边界。
- 新增进图前落位核查要求:"哪张图 → 哪个占位 → 用途 → 状态"必须先对齐再执行。
- 新增 P0「截图插入双模式」,用当前主题背景、留边、窗口/细边框和轻阴影承托截图。
- 新增"原图裸放"触发条件:只有用户明确要求"原封不动 / 保持原图 / 不要处理 / 裸放"时才直接插入原图。
- 补充截图 caption 规则:当用户说明截图来源或意义时,在图下用一句小字说明"这是什么 / 证明什么",不扩写成正文。
- 补充截图落位规则:截图优先上下承接对应论点,避免把无关文案和截图硬做左右并排。

### Changed

- `SKILL.md` 图片约定新增"截图插入约定"。
- `references/checklist.md` 新增 P0-11,防止进图任务顺手新增文案、重构页面或混入复合图任务。
- `references/image-intake-and-screenshot-proof.md` 补充"进图 = 入库命名 + 压缩处理 + 替换占位 + 验证加载 + 更新清单"执行口令,并新增截图双模式 SOP。

---

## [v3.5] — 2026-05-17

### Added

- 新增 `references/image-intake-and-screenshot-proof.md`:把"用户给图 → 命名入库 → 压缩/清理 → 替换 HTML → 浏览器验证"固化为小闭环 SOP。
- 增加截图证据美化规则:证据必须真实,但也必须好看;优先保留原截图内容,再用统一背景、比例、留白、阴影包装。
- 增加与 `guizang-ppt-skill` 最新截图包装能力的协作方式:需要截图美化时读取 `references/screenshot-framing.md` 与内置截图背景资产。
- 增加品牌系统总览图处理规则:真实素材优先,生成图可做气质参考;用户提供更好的最终整板图时,优先接纳并插入作品集。

### Changed

- `SKILL.md` 图片约定补充"进图 / 截图证据 / 真实素材优先"三条硬规则。
- `README.md` FAQ 补充"不要把图片资产流程做重,先跑通一组素材小闭环"的使用建议。

---

## [v3.4] — 2026-05-14

### Added
- **guizang 图片节奏合并**:新增路由规则,当用户要求用 PPT 图片规划优化作品集时,仍输出长滚动网页,但借用图像叙事、拆页、高潮/低谷节奏
- **图像叙事占主导原则**:设计作品集默认图 60% / 文 40%,图片承担叙事、证据和视觉高潮,不是辅助装饰
- **长段落压缩规则**:把事实、角色边界、关键动作和结果证据作为压缩校验点
- **P0-10 视觉 QA**:新增版心一致、标题宽度、右侧大空白、线框密度、收尾页光感、桌面/手机双端检查
- **版心/空白扫描**:交付前建议扫描 `.section h3` / `.visual-plate .plate-title` / `.act-cover h2` / `.outro blockquote` / `.hero .subtitle`

### Changed
- **章节封面规范**:从居中海报式改为左对齐同版心;色块降级为小型识别锚点;`.act-sub` 可拓宽到 72em
- **收尾页规范**:从黑底强对比 outro 改为浅底总结页;使用轻色条 + 方法卡片;避免左侧大标题、右侧灰字、中间大空白
- **线框策略**:分类不再默认使用满格边框;优先使用留白、字号层级、色彩锚点和轻分隔线
- **标题宽度策略**:放宽 hero subtitle、section h3、visual-plate title、outro quote 的 `max-width`,避免大标题被压窄导致右侧空白

---

## [v3.2] — 2026-05-10

### Added
- **P0-9 前后一致性检查**:新增到 checklist.md,确保交付物数量前后对得上、"我做的"vs"团队做的"明确区分、标签命名一致、时间线无空白
- **P1-8 内容密度平衡**:新增到 checklist.md,指导"内容太多拆子板块、内容太少合并、标签数量≤4个"
- **P1-9 数字物料兜底**:新增到 checklist.md,覆盖表情/小程序/网页等数字交付物的平台规格与上架工序
- **Hero 定位指导**:新增到 content-architecture.md,明确第一页必须交代清楚的三件事(这是什么项目、项目定位、你的角色)
- **Q1 一句话定位**:7-questions.md Q1 新增"一句话定位"字段,要求 3 秒内让招聘方 get 到项目全貌
- **外部工具来源备注**:material-collection.md 新增备注,说明 WeFlow(聊天记录导出)和 OpenCLI(网站/社媒内容下载)可作为素材来源

---

## [v3.1] — 2026-05-06

### Fixed
- **安装链接错误**:README 里的 `npx skills add` / `git clone` URL 之前误写为 `op7418/magazine-portfolio-skill`(guizang 作者),已改为 `xiangzi-cyber/magazine-portfolio-skill`(本仓库)
- **协作关系图过时**:v2 的图还显示「作品集梳理 skill」是上游(已合并到本 skill 的 Step 0-1),已重画为 v3 后的形态
- **目录结构过时**:遗漏了 v3 新增的 4 个 reference 文件 + 新加的 LICENSE,已补全
- **使用流程过时**:写的是 7 条但没标 Step 0(梳理判断)和 Step 1(梳理阶段),已更新为完整 7 步 + 分阶段呈现

### Added
- **Showcase 段**:占位等用户截图(`screenshots/` 目录)+ 在线 Demo 链接(待部署)
- **CHANGELOG.md 独立文件**:把 v1 / v2 / v3 / v3.1 的变更记录从 README 拆出来,避免后期 README 越来越臃肿
- **FAQ 段**:解答常见疑问(可不可以自定义颜色 / 改布局 / 做整站 / 等)

### Changed
- README License 段:`MIT` → `[MIT License](./LICENSE)`,加单独 LICENSE 文件,GitHub 自动识别协议

---

## [v3] — 2026-05-05

### Added(重大新增)

合并「**作品集项目梳理协作 skill**」(原独立 skill,未推 GitHub)进来。本 skill 现在涵盖**从「零散素材 / 模糊想法」→「长滚动 HTML」的全流程**,不再是"只做视觉化"。

**新增 4 个 reference**:
- `workflow.md` — 完整梳理 SOP(8 阶段 A-H)
- `7-questions.md` — 7 问轻量复盘模板
- `content-architecture.md` — 内容架构稿模板(4 章节 8 段)
- `material-collection.md` — 主张-佐证素材采集表

### Changed

**工作流 6 步 → 7 步**:
- **Step 0**(新增):梳理判断 — 用户是否已有内容架构稿?
- **Step 1**(新增):梳理阶段 — 7 问 / 节点接力 / 主张-佐证 / 内容架构稿
- Step 2-7(原 1-6):需求澄清 / 拷模板 / 类预检 / 填充 / 自检 / 预览

**Agent Behavior Specification 扩展**:
- 身份核心定位:从"内容架构稿 → HTML"扩展为"零散素材 → HTML 全流程"
- 能力边界 ✅ 加上梳理阶段的 4 项能力
- 任务路由表简化(去掉"上游 skill"分支,已合并)
- agent-delegation 协作图重画:不再有上游,只剩下游 guizang-ppt-skill

---

## [v2] — 2026-05-05

### Added

注入 **Agent Behavior Specification**(借鉴 [kangarooking/system-prompt-skills](https://github.com/kangarooking/system-prompt-skills) 的 system prompt 设计模式)。在 SKILL.md 顶部加一节,从 15 个跨厂商提示词模式中挑 5 个最相关的注入:

| 层 | 来源模式 | 注入内容 |
|---|---|---|
| **1 身份** | persona-design | 名称(作品集陪练)/ 能力边界 ✅❌ / 行为修饰符 / 关系框架 |
| **2 语气** | personality-system | 反陈词滥调清单 / 不带节奏 / 不 GPT-like / 保留口气词 |
| **3 安全** | safety-guardrails | 多层纵深防御 / 拒答策略 / 级联锁定 |
| **4 流程** | conversation-flow | 澄清完成度判断 / 自主度 5 级 / 任务路由表 |
| **5 协作** | agent-delegation | 上下游 skill 关系 / 子任务委派 / 上下文隔离 |

最有用的两条新增:
- **能力边界 ❌ 明确划线**(不替用户做内容创作 / 不编造数据 / 不改简历)
- **自主度 5 级**(模板填充 = 高自主;主张措辞 = 中;删段 = 必须问;口气词 = 零自主)

---

## [v1] — 2026-05-05

### Added(初始发布)

Initial release. Fork from [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) 的长滚动版本。

- **8 种段落布局骨架**(Hero / 章节封面 / 数据大字报 / 左文右图 / Before/After / 双 Pipeline / 衍生家族图片网格 / 收尾 outro)
- **5 套主题色预设**(继承 guizang):墨水经典 / 靛蓝瓷 / 森林墨 / 牛皮纸 / 沙丘
- **WebGL Hero 流体背景**(只在 Hero 区,正文段克制)
- **顶部 sticky 章节锚点** + **滚动驱动入场动画**(IntersectionObserver)
- **4 章节收口结构**(项目背景 / 设计判断 / 落地交付 / 方法沉淀)
- **段落级信息密度规则**(每段必配 9 件 + 反向自检 5 项 + 13 条大白话→术语替换表)
- **质量检查清单**(P0/P1/P2/P3 分级)

**完整文件**:
- SKILL.md(主工作流 + 触发词)
- assets/template.html(单文件可运行种子模板)
- references/sections.md / components.md / themes.md / content-density.md / image-prompts.md / checklist.md

**视觉血缘**:guizang-ppt-skill / Monocle 杂志 / Maggie Appleton / Geoffrey Litt / thesephist 等独立创作者作品集

---

## 后续 Roadmap(暂定)

### v4(计划)
- [ ] 加 **Mobile-first 主题变体**(< 768px 屏幕的优化布局)
- [ ] 加 **Dark mode 切换**(让招聘方一键切换深浅色)
- [ ] 加 **更多布局骨架**(如 9 — 时间轴 / 10 — 双图对比 / 11 — 嵌套 callout)
- [ ] **screenshots/ 目录补全**(Hero / 章节封面 / 完整缩略图)
- [ ] **在线 Demo 部署**(GitHub Pages / Vercel)

### v5(更远)
- [ ] **多语言支持**(英文版 README + 英文版 SKILL.md + 主题色文化适配)
- [ ] **打印版样式**(`@media print`,可导出 PDF 作品集)
- [ ] **A/B 测试 hooks**(让用户验证不同主题色对招聘方的影响)

### 触发条件
等用户**用本 skill 跑过 3-5 个项目**(KA21 / 火种车 Skill 系统作品页 / AI 产品研究 / 等)之后,根据使用经验决定 v4 / v5 的优先级。

---

*遵守 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 格式*
