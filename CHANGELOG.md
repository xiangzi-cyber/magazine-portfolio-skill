# Changelog

本文件按时间倒序记录 magazine-portfolio-skill 的版本变更。
格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),版本号遵循 [SemVer](https://semver.org/lang/zh-CN/)。

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
- **保义压缩规则**:长段落改成短判断时,必须保留事实、角色边界、关键动作和结果证据,避免改短后扭曲原意
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
