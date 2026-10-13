---
title: Serein 开发者入口
description: Tauri、React、CodeMirror 与本地文件结构。
---


# 开发者入口

Serein 使用 Tauri 2、React、TypeScript、Rust 与 CodeMirror 6。源码编辑与富编辑共享同一个 Markdown buffer；文件与导出通过原生接口处理。

- [源码与构建说明](https://github.com/Y-Serein/Serein)。
- [公开版本](https://github.com/Y-Serein/Serein/releases)。
- [使用与格式边界](user-guide)。

按仓库当前 README 配置对应工具链。Windows 安装器应由正式 Windows 构建入口生成；Linux/WSL 构建检查不等于 Windows 原生安装和文件关联验收。

项目使用 MIT 许可证；依赖各自保留对应许可，分发时核对完整软件包。
