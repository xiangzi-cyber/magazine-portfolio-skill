import re

with open('SKILL.md', 'r') as f:
    content = f.read()

# 1. 质量门：服务视角 → 招聘方视角
content = content.replace(
    '每段过 5 项质量门(服务视角 / 专业度 / 保留口气 / 金句锚点 / 素材闭环)',
    '每段过 5 项质量门(招聘方视角 / 专业度 / 保留口气 / 金句锚点 / 素材闭环)'
)

# 2. 段落级信息密度：删除 + 服务视角
content = content.replace(
    '每段含主标 + 副标 + 副文 + 锚点金句 + 引用 + 服务视角',
    '每段含主标 + 副标 + 副文 + 锚点金句 + 引用'
)

# 3. 每段必须包含的元素：删除服务视角注脚
content = content.replace(
    '每段的:主标 / 副标 / 完整副文(2-3 段)/ 锚点金句 / 1-2 条原话引用 / 服务视角注脚 / 数据卡(如有)/ 图片占位说明',
    '每段的:主标 / 副标 / 完整副文(2-3 段)/ 锚点金句 / 1-2 条原话引用 / 数据卡(如有)/ 图片占位说明'
)

# 4. 组件表：删除 .service-note 行
content = content.replace(
    '| 8 | `.service-note`(服务视角注脚) | 一段 | `招聘方读到的是: ...` |\n',
    ''
)

# 5. 反向自检：服务视角 → 招聘方视角（内部检查，不在HTML表现）
content = content.replace(
    '- ✅ **服务视角**:这一段的主语是"我"还是"项目方"?',
    '- ✅ **招聘方视角**:这一段的主语是"我"还是"项目方"?（内部检查项，不在HTML中表现）'
)

# 6. Step 5 自检：删除"每段必须有服务视角注脚"
content = content.replace(
    '3. **每段必须有「服务视角」注脚** —— 没有就是没过门',
    '3. **每段必须过招聘方视角门** —— 主语是项目方不是"我"，但这是内部检查，不在HTML中表现'
)

# 7. 组件手册：删除服务视角
content = content.replace(
    '├── components.md              ← 组件手册(字体 / 色 / 网格 / 章节封面 / 数据卡 / Pipeline / 引用块 / 服务视角)',
    '├── components.md              ← 组件手册(字体 / 色 / 网格 / 章节封面 / 数据卡 / Pipeline / 引用块)'
)

# 8. 内容自洽：删除 + 服务视角
content = content.replace(
    '每段含完整副文 + 引用 + 服务视角',
    '每段含完整副文 + 引用'
)

# 9. 服务视角优于自我表现 → 招聘方视角优于自我表现
content = content.replace(
    '5. **服务视角优于自我表现** — 每段必须过"服务视角"门:主语是项目方,不是"我"',
    '5. **招聘方视角优于自我表现** — 每段必须过"招聘方视角"门:主语是项目方,不是"我"（内部检查,不在HTML中表现）'
)

# 10. content-density.md 中的"必须配齐 9 件"改为 8 件（去掉 service-note）
content = content.replace(
    '├── content-density.md         ← 段落级信息密度规则(必须配齐 9 件)',
    '├── content-density.md         ← 段落级信息密度规则(必须配齐 8 件)'
)

with open('SKILL.md', 'w') as f:
    f.write(content)

print('SKILL.md updated')
