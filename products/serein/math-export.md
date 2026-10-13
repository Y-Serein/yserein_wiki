---
title: 公式与文档导出
description: LaTeX 数学公式、HTML 与带原生公式的 DOCX 导出。
---


# 公式与文档导出

## 数学公式

推荐使用标准 LaTeX 定界符：

```latex
行内公式：\( E = mc^2 \)

\[
E = mc^2
\]
```

富编辑与 HTML 导出使用随应用提供的 MathJax SVG 渲染。常见 equation、align、aligned、cases 与 matrix 等环境支持公式组织；原有美元定界符可继续读取。任意 LaTeX 页面布局与宏包不作为完整 TeX 引擎执行。

## DOCX 导出

DOCX 中的公式采用原生 OMML，而非截图。标题、列表和表格映射为 Word 对应结构；公式编号与交叉引用使用 Word 字段。字段显示未刷新时，在 Word 中选择内容并按 F9 更新。

## 导出前后

1. 保存原 Markdown，核对资源与公式。
2. 在导出入口选择格式与目标路径。取消保存不代表文件已生成。
3. 用目标阅读器打开导出副本，检查长表格、编号、引用和公式。
4. 保留 Markdown 与图片资源，不用导出副本覆盖原始文档。

文档 PDF 导出当前保留可读 LaTeX 源文，不等于 HTML 的 MathJax 排版。思维导图 PDF 是图像内容，见[导图导出](mindmap)。
