---
title: Serein 开发者文档
description: Tauri 2、React、TypeScript、Rust、Milkdown 和 CodeMirror 工程入口。
---

# 开发者文档

## 主线目录

```text
apps/serein-desktop/
```

## Web 构建

```bash
cd apps/serein-desktop
npm ci
npm run build
```

## Tauri 静态检查

```bash
cd apps/serein-desktop/src-tauri
env CARGO_TARGET_DIR=/tmp/serein-tauri-target cargo check
```

## 技术栈

- Tauri 2：桌面容器和系统能力。
- React + TypeScript：界面与应用状态。
- Rust：桌面后端和文件系统边界。
- Milkdown：Rich Edit。
- CodeMirror：Plain Edit。

## 开发文档还需补齐

- 应用状态和窗口架构。
- Vault、文件监听、索引和缓存模型。
- Plain/Rich 编辑的数据同步边界。
- 反链、图谱和标签索引流程。
- Windows 文件关联、WebView2 和安装包。
- 测试结构、性能基线和发布检查单。

## 质量重点

- 中文 IME 组合输入不能被编辑器状态更新破坏。
- 富文本不能悄悄损坏用户原始 Markdown。
- 外部文件修改和异常退出不能造成数据覆盖。
- 大文档和大目录需要明确性能边界。
- 未来 AI 功能必须明确联网和隐私边界。
