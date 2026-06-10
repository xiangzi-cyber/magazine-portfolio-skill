# 图片布局模式(Image Layout Patterns)

> 用于长滚动作品集的图片落位、截图承托、成果图和过程图处理。触发词兼容:"火种车"、图片被裁、双图挤压、图文不平衡、移动端横溢。

---

## 核心原则

图片不是正文旁边的插图,而是项目叙事材料。先判断图片在这一段承担的角色,再决定容器、比例和 `object-fit`。

1. **先定角色**:每张图先归入项目语境、过程证据、细节证据、上线记录四类之一。
2. **一段一类图**:同一屏不要把成果图、过程截图、角色卡和数据图混在一起。
3. **内容完整优先**:截图、文档、UI、品牌总览、成果合辑默认 `object-fit: contain`。
4. **照片可以裁,证据不要裁**:现场照片、氛围照片、人物场景可 `cover`;界面截图、文档截图、LOGO、物料合辑用 `contain`。
5. **固定槽位,不是固定裁切**:同组图片用统一高度或统一比例让版式稳,图片本身在槽位内完整显示。
6. **caption 像介绍,不是审稿**:可见 caption 说明“这是什么 / 为什么放这里”,避免内部检查口吻。
7. **移动端转上下结构**:窄屏下所有双列图文、三列图墙都降成单列;不要让正文被右栏图片压窄。

---

## 图片四角色

| 角色 | 典型素材 | 推荐容器 | 图片策略 |
|---|---|---|---|
| 项目语境 | 现场、活动、合作场景、任务入口 | 独立总览区 / `.split` | 照片可 `cover`,信息图用 `contain` |
| 过程证据 | 提示词、平台接力、生成过程、方向探索 | 过程墙 / 证据卡 | 固定高度卡片 + `contain`;同组同高 |
| 细节证据 | 字体、LOGO、规格、局部对比、迭代细节 | 细节条 / 2-4 列 | 固定高度 + `contain` |
| 上线记录 | 上架截图、发布页、公众号、交付归档 | 独立成果区 / 归档条 | 保留界面状态,不要裁掉边缘 |

---

## contain / cover 判断

| 问题 | 选择 |
|---|---|
| 图里有可读文字、界面状态、数据、LOGO、文档边界吗? | `contain` |
| 图的价值来自现场氛围、人物动作、空间感吗? | `cover` |
| 裁掉边缘会不会丢证据关系? | `contain` |
| 只是作为章节气氛图,主体不依赖完整边界? | 可 `cover` |

不要把 `cover` 写成全局默认。只能在 `.photo`、明确的氛围图、或设计上允许裁切的图上使用。

---

## 同组同高

同一组 proof wall / detail strip / image cards 必须共享图片区高度,避免图片原始长宽不同导致卡片高低不齐、标题上下跳动。

```css
.proof-card.image-card .frame-img{height:clamp(220px,28vh,380px)}
.process-wall .proof-card.image-card .frame-img{height:clamp(240px,30vh,420px)}
.detail-strip .proof-card.image-card .frame-img{height:clamp(220px,26vh,360px)}
.frame-img > img{width:100%;height:100%;display:block;object-position:center center}
.frame-img.contain > img{object-fit:contain;background:#fff}
.frame-img.photo > img{object-fit:cover}
```

---

## 移动端单列

```css
@media (max-width:900px){
  .split,.process-wall,.detail-strip{grid-template-columns:1fr}
  .proof-card.image-card .frame-img{height:auto;min-height:0}
  .proof-card.image-card .frame-img > img{height:auto}
}
```

多列图片区在窄屏必须降级成单列或自然流;不要用固定列宽把页面撑出横向滚动。

---

## 进图检查

进图前先给每张图标角色:

```text
文件 -> 页面段落 -> 图片角色 -> contain/cover -> 是否可裁 -> caption
```

交付前逐项检查:

- 横图仍然是横图,没有被裁成方形或窄竖图。
- 截图里的标题、数据、关键界面状态没有被裁掉。
- 同组卡片高度一致,标题紧跟图片,底部没有大白框。
- 如果一页两图让文字被挤压,改为上下结构或拆成两段。
- caption 说明图片是什么,不写成内部审稿句。
- 手机/窄屏下所有多列图片区变为单列,正文宽度不被压缩。

---

## 附录:火种车案例

本文件从 `CURRENT__AI火种车品牌设计作品集__portfolio-latest.html` 的图片落位经验提炼而来。火种车案例里的有效做法是:

- Hero 先讲清项目、角色、结果和核心判断,主视觉放到首屏之后的总览区。
- 品牌系统总览、KT 板、表情包合辑等成果图用 `contain`,保留完整边界。
- 过程截图按过程墙组织,细节图按细节条组织,同组图片同高。
- 现场照片可用 `.photo` 做更饱满的 `cover`,但不能裁掉主体。
- 火种车只是案例来源;通用规则以本文件前文为准。
