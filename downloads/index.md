---
title: 下载中心
description: Y-Serein 产品版本、下载、校验和兼容性入口。
---

# 下载中心

正式下载页不只提供文件，还必须同时提供版本、适用硬件、校验值、升级路径和已知问题。

::: warning 当前状态
页面框架已建立。正式发布文件、版本号、SHA-256、签名方式和兼容矩阵需要由维护者提供后才能公开填写。
:::

## SeryRemoteID

| 字段 | 当前状态 |
|---|---|
| 最新稳定版 | 待补 |
| 发布日期 | 待补 |
| 支持硬件版本 | 待补 |
| 固件下载 | [GitHub Releases](https://github.com/Y-Serein/SeryRemoteID/releases) |
| SHA-256 | 待补 |
| 升级方式 | 待补：串口 / Web OTA / 其他 |
| 回滚方式 | 待补 |
| 发布说明 | [版本与发布](/products/seryremoteid/release-notes) |

下载前请先阅读[硬件与接线](/products/seryremoteid/hardware)、[OTA 与恢复](/products/seryremoteid/ota-recovery)和[兼容性验证](/products/seryremoteid/verification)。

## Serein

| 字段 | 当前状态 |
|---|---|
| 最新稳定版 | 待补 |
| 支持系统 | Windows 验证待补 |
| 安装包下载 | [GitHub Releases](https://github.com/Y-Serein/Serein/releases) |
| SHA-256 | 待补 |
| 升级与迁移 | 待补 |
| 发布说明 | [版本与发布](/products/serein/release-notes) |

## 发布原则

- 不把未经验证的构建产物标记为 Stable。
- 每个硬件固件必须绑定兼容硬件和最低升级条件。
- 每个下载必须提供校验值；签名方案确定后同时提供验证方法。
- 破坏兼容性的变更必须写入升级说明和回滚条件。
- 已知问题不隐藏，按影响范围和规避方法公开。
