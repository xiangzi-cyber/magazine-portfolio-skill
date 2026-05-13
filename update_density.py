with open('references/content-density.md', 'r') as f:
    content = f.read()

# 1. 删除表格中的 service-note 行
content = content.replace(
    '| 6 | `.service-note`(服务视角注脚) | ✅ | 一段(40-80 字) | 项目方价值 |\n',
    ''
)

# 2. 删除整个 service-note 章节（从 ### 6. 到下一个 ###）
import re
content = re.sub(
    r'### 6\. `\.service-note`\(服务视角注脚\).*?(?=### 7\.|## 反向自检)',
    '',
    content,
    flags=re.DOTALL
)

# 3. 更新反向自检中的服务视角
content = content.replace(
    '| 1 | **服务视角** | 这一段的主语是"我"还是"项目方"?有没有 `.service-note`? |',
    '| 1 | **招聘方视角** | 这一段的主语是"我"还是"项目方"?（内部检查，不在HTML中表现） |'
)

with open('references/content-density.md', 'w') as f:
    f.write(content)

print('content-density.md updated')
