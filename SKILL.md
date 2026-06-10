---
name: magazine-portfolio-skill
description: 生成"电子杂志 × 电子墨水"风格的长滚动作品集网页——单文件 HTML、4 章节收口、信息密度自洽，招聘方静态阅读不需要外部讲解。当用户需要制作设计师/产品经理/独立创作者的求职作品集项目页，或提到"作品集长滚动版""杂志风作品页""magazine portfolio""editorial portfolio""进图/加图/换图""改作品页"时使用。
---

# Magazine Portfolio Skill · v4

把真实项目素材变成招聘方能独立读懂的长滚动作品页。
姊妹篇:guizang-ppt-skill(线下演讲版,同视觉血缘,不同场景)。

两条底线:
1. **不编造**:每条主张需 1-3 类佐证;没有佐证就删掉或降级。
2. **不越权**:内容取舍、风格选择、段落去留由用户决定;本 skill 只提供工具和检验。

人格、语气、安全边界、自主度分级见 `references/agent-spec.md`。
门禁定义(G0-G7)、P0 规则正文、检查格式、失败回退的唯一出处是 `references/rule-gates.md`。

---

## §0 运行循环(最高优先级)

```text
自检 -> 识别任务 -> 激活门禁 -> 只读对应文件 -> 执行 -> 阶段结束检查 -> 继续/回退
```

1. 自检:一句话回答"我是谁"。
2. 识别任务:对照 §2 路由表,先输出一行 `本轮激活门禁: [Gx] [Gy]`。
3. 读取规则包:本文件 + 门禁指定文件。单轮最多加载 2 个 reference。
4. 执行阶段:按 §1 主线推进。
5. 阶段结束检查:按 `rule-gates.md` 固定格式收口;未通过只能回退。

---

## §1 流程主线

没有「HTML 内容架构稿」,不进视觉线。

### 梳理线 M0-M7 · 产出「HTML 内容架构稿」

| 阶段 | 做什么 | 产物 | SOP |
|---|---|---|---|
| M0 启动判断 | 有架构稿跳 V0;有 5000+ 字复盘跳 M3;零散素材进 M1;项目没做完拒绝 | 路由决定 | workflow.md |
| M1 7 问复盘 | 项目/痛点/决定/转折/展示物/反馈/副标 | 项目入口-XXX.md | 7-questions.md |
| M2 节点接力 | 用户讲节点,Agent 抓取归位,保留口气词 | 节点归位记录 | workflow.md |
| M3 源材料深读 | 摘原文/真实问题/动作/不完美/证据缺口 | 原文摘录与真实问题拆解-XXX.md | workflow.md |
| M4 主张-佐证 | 每条主张配 1-3 类佐证 | 素材采集表-XXX.md | material-collection.md |
| M5 内容架构 | 4 章节 8 段,一段一事,弱段合并 | 作品页-XXX-内容架构稿.md | content-architecture.md |
| M6 文案稿 | 先事实段,再标题金句;不从术语反推故事 | 作品页-XXX-文案稿.md | workflow.md |
| M7 口吻隔离 | 内部审稿话术转成最终网页内容 | 作品页-XXX-HTML内容架构稿.md | workflow.md |

### 视觉线 V0-V5 · 产出 `index.html`

| 阶段 | 做什么 | 关卡 | 指定读取 |
|---|---|---|---|
| V0 需求澄清 | 6 问:岗位/招聘方/页面地位/图片/主题色/硬约束 | 缺 3+ 问回 M 线 | themes.md |
| V1 模板激活 | 拷贝 template.html;grep `[` 清零占位符;整体替换主题色 6 行 | G5 | template-activation-and-brand-system-gate.md |
| V2 类名预检 | 读 template.html 的 `<style>`,对照 sections.md 类名清单 | G5 | sections.md |
| V3 填充内容 | 4 章节 8 段;每段配齐 6 件套;按图片落位表进图 | G3/G4/G5 | content-density.md + image-layout-patterns.md |
| V4 交付自检 | checklist P0 全过:字体分工/章节顺序/术语统一/口气词保留 | G5/G6 | checklist.md |
| V5 浏览器验收 | broken image=0;overflowX=0;手机端单列;最终口吻无审稿话术 | G6/G7 | checklist.md |

迭代任务(用户反馈"不舒服/空白大/字太多")直接进 V5 + G7:先找同类组件共性,统一修。

---

## §2 任务路由表

| 用户意图(关键词) | 进入 | 激活门禁 | 第一读取文件 |
|---|---|---|---|
| 梳理/捋项目/整理素材 | M0 | G0+G1 | workflow.md |
| 写文案/改叙事/太空了 | M3-M6 | G1+G2 | workflow.md |
| 做长滚动作品页(全流程) | M0->V5 | 按阶段 | workflow.md |
| 首页/作品集首页/首页版式 | 首页 H01-H06 | G5+G6 | homepage.md |
| 只加图/换图/进图 | 图片冻结任务 | G3+G4+G6 | image-intake-and-screenshot-proof.md |
| 生成/重做 HTML | V1 | G2+G5+G6 | template-activation-and-brand-system-gate.md + checklist.md |
| 画风不一致/skill 没生效 | V1 | G5+G7 | template-activation-and-brand-system-gate.md |
| 视觉不舒服/空白大/图文乱 | V5 | G6+G7 | checklist.md |
| 演讲 PPT/横翻 deck | 范围外 | - | 转 guizang-ppt-skill |
| 整站/关于页/简历/求职信 | 范围外 | - | 明确告知,不强接 |

---

## §3 文件地图

```text
SKILL.md                  <- 路由器
references/
  agent-spec.md           <- 人格/语气/安全/自主度(行为规范唯一出处)
  rule-gates.md           <- G0-G7 门禁 + 全部 P0 规则(规则唯一出处)
  workflow.md             <- 梳理线 M0-M7 SOP
  7-questions.md          <- M1 模板
  material-collection.md  <- M4 模板
  content-architecture.md <- M5 模板
  sections.md             <- 8 种段落骨架(基础结构,勿改)
  components.md           <- 组件手册(基础结构,勿改)
  x-components.md         <- 箱子探索者手记 x-组件手册
  homepage.md             <- 首页 H01-H06 固定版式
  themes.md               <- 6 套主题色(5 套继承主题 + 箱子代表紫)
  typography.md           <- Explorer Voice 五层字体系统 + 9 级字号护栏
  expedition-profiles.md  <- Expedition Profile 考察档案差异化系统
  content-density.md      <- 段落 6 件套(基础结构,勿改)
  image-layout-patterns.md <- 图片角色/contain-cover/同高/移动端(原火种车法,案例见附录)
  image-intake-and-screenshot-proof.md <- G3/G4 图片入库与截图 SOP
  template-activation-and-brand-system-gate.md <- G5 规则包
  image-prompts.md        <- 配图提示词
  checklist.md            <- V4/V5 检查清单(每项标注门禁编号)
assets/template.html      <- 母版(类名唯一来源,基础结构,勿改)
assets/demo-homepage.html <- 首页 H01-H06 demo(可直接打开)
```

---

## §4 设计哲学(15 条)

稳定优于性格 / 内容自洽优于演讲辅助 / 结构优于装饰 / 章节呼吸优于段落连贯 /
招聘方视角优于自我表现(仅内部检查) / 口气词优于 corporate 翻译 / 术语统一 /
真实来源优于虚构对比 / 方法沉淀呼应全文 / 3 句话讲清卖点 / 图片不是配角(6:4) /
版心一致优于局部好看 / 宽度先于换行 / 分类不等于线框 / 模板激活优于口头复用。

*v4 · 2026-06-10 重构:SKILL.md 瘦身为路由器;规则单一事实源;M/V 统一编号;门禁懒加载。*
*基础结构(4 章节/8 布局/5 继承主题/段落 6 件套)与 v3 兼容;第 6 套为箱子代表紫品牌扩展。*
