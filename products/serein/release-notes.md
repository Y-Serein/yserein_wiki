---
title: Serein 版本与发布
description: Windows 安装包、系统要求、校验值、升级、迁移和已知问题。
---

# 版本与发布

::: warning 正式发布资料待补
仓库 README 说明 Windows 打包验证完成后才发布下载。当前页面不应提供未经验证的安装包。
:::

## 发布模板

### `vX.Y.Z` — YYYY-MM-DD

| 字段 | 内容 |
|---|---|
| 发布等级 | Preview / Beta / Stable |
| Windows 版本 | 待补 |
| WebView2 要求 | 待补 |
| 下载 | 待补 |
| SHA-256 | 待补 |
| 配置迁移 | 待补 |
| 数据格式变化 | 待补 |

#### 新增

- 待补。

#### 修复

- 待补。

#### 已知问题

- Windows release、中文 IME、WebView2、文件关联和大文档性能验证结果待补。

## Windows 构建

仓库提供：

```powershell
.\scripts\build_windows.ps1
```

Windows 发布必须在 Windows 环境完成。不要对由 WSL/Linux 创建的 `node_modules` 使用 `-SkipInstall`。

## 发布入口

- [GitHub Releases](https://github.com/Y-Serein/Serein/releases)
- [下载中心](/downloads/)
