# 火种车图片处理法

> 从 `CURRENT__AI火种车品牌设计作品集__portfolio-latest.html` 提炼。用于长滚动作品集的图片落位、截图证据、成果图和过程图处理。

## 核心原则

图片不是正文旁边的插图,而是项目叙事材料。先判断图片在这一段承担的角色,再决定容器、比例和 `object-fit`。

1. **首页不急着放图**:Hero 先讲清项目、角色、结果和核心判断。项目主视觉可以放在 Hero 之后的独立总览区,不要和首屏大标题抢。
2. **一段一类图**:同一屏不要把成果图、过程截图、角色卡和数据图混在一起。需要多图时,按图像角色拆成总览 / 过程墙 / 细节条 / 成果归档。
3. **内容完整优先**:截图、文档、UI、品牌总览、成果合辑默认 `object-fit: contain`;禁止为了填满卡片把横图裁成方形或竖图。
4. **照片可以裁,证据不要裁**:现场照片、氛围照片、人物场景可 `cover`;界面截图、提示词过程、文档截图、LOGO、物料合辑必须 `contain`。
5. **固定槽位,不是固定裁切**:同组图片用统一高度或统一比例让版式稳,但图片本身在槽位内完整显示。留白可以接受,丢关键信息不可以。
6. **caption 像介绍,不是审稿**:可见 caption 说明“这是什么 / 为什么放这里”,避免“证据图”“证明了”这类内部口吻。
7. **移动端转上下结构**:窄屏下所有双列图文、三列图墙都降成单列;不要让正文被右栏图片压窄。

## 图片角色与处理方式

| 角色 | 典型素材 | 推荐容器 | 图片策略 |
|---|---|---|---|
| 主视觉总览 | 品牌系统总览、最终成果大图 | 独立 `visual-hero` / `visual-plate`, 16:9 或 16:10 | `contain`, 背景浅色,完整展示 |
| 左文右图 | 一张现场图、成果图、关键截图 | `.split` + `.img-col`, 1:1 / 3:2 / 16:9 | 内容图 `contain`;照片可 `cover` |
| 过程证据墙 | 提示词、平台接力、生成过程、方向探索 | `.process-wall` / `.proof-card.image-card` | 固定高度卡片 + `contain`;同组同高 |
| 细节证据条 | 字体、LOGO、KT板、表情包规格 | `.detail-strip` / 2-4 列 | 固定高度 + `contain`;照片类加 `.photo` 才可 `cover` |
| 成果归档 | KT 板合集、表情包合辑、上架截图 | `.detail-strip` 或独立成果区 | 合辑完整展示,不要裁掉边缘 |
| 截图证据板 | 网页、飞书、聊天、平台后台 | `screenshot-board` / framed screenshot | 原截图不重画;外部加背景、留白、边框;内容完整 |
| 现场照片 | 合照、课堂、手持物料 | `.frame-img.photo` 或 `.image-card.photo` | `cover`,但人脸/物料主体不可被裁掉 |

## CSS 落地模式

优先复用模板里的 `.frame-img` / `.proof-card.image-card`。如果当前页面是自定义 HTML,至少保留这组语义:

```css
.frame-img{overflow:hidden;background:#fff;border:1px solid rgba(var(--ink-rgb),.14)}
.frame-img > img{width:100%;height:100%;display:block;object-position:center center}
.frame-img.contain > img,
.proof-card.image-card .frame-img > img{object-fit:contain;background:#fff}
.frame-img.photo > img,
.proof-card.image-card.photo .frame-img > img{object-fit:cover}
.proof-card.image-card .frame-img{height:clamp(220px,28vh,380px)}
.process-wall .proof-card.image-card .frame-img{height:clamp(240px,30vh,420px)}
.detail-strip .proof-card.image-card .frame-img{height:clamp(220px,26vh,360px)}
@media (max-width:900px){
  .split,.process-wall,.detail-strip{grid-template-columns:1fr}
  .proof-card.image-card .frame-img{height:auto;min-height:0}
  .proof-card.image-card .frame-img > img{height:auto}
}
```

不要把 `cover` 写成全局默认。只能在 `.photo`、明确的氛围图、或设计上允许裁切的图上使用。

## 进图检查

进图前先给每张图标角色:

```text
文件 -> 页面段落 -> 图片角色 -> contain/cover -> 是否可裁 -> caption
```

交付前逐项检查:

- 横图是否仍然是横图;没有被裁成方形或窄竖图。
- 截图里的标题、数据、关键界面状态没有被裁掉。
- 同组卡片高度一致,标题紧跟图片,底部没有大白框。
- 如果一页两图让文字被挤压,改为上下结构或拆成两段。
- caption 没有“证据图 / 证明 / 佐证”这类内部审稿口吻。
- 手机/窄屏下所有多列图片区变为单列,正文宽度不被压缩。

