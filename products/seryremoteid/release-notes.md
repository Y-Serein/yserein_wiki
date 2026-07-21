---
title: SeryRemoteID 版本与发布
description: 固件、硬件兼容性、升级、校验和已知问题。
---

# 版本与发布

::: warning 待建立正式发布记录
仓库和产品已经存在，但本站尚未获得当前量产硬件版本、正式固件版本、下载文件和历史 Changelog。
:::

## 版本规则建议

- 固件采用语义化版本或明确的日期版本。
- 硬件 PCB Revision 单独编号，不与固件版本混用。
- 每个固件版本声明兼容硬件范围。
- Preview、Beta、Stable 和 Deprecated 使用统一定义。

## 发布记录模板

### `vX.Y.Z` — YYYY-MM-DD

| 字段 | 内容 |
|---|---|
| 发布等级 | Preview / Beta / Stable |
| 支持硬件 | 待补 |
| ESP-IDF | 待补 |
| 下载 | 待补 |
| SHA-256 | 待补 |
| 签名 | 待补 |
| 最低可升级版本 | 待补 |
| 回滚条件 | 待补 |

#### 新增

- 待补。

#### 修复

- 待补。

#### 兼容性变化

- 待补。

#### 已知问题

- 待补。

#### 升级后验证

- 检查版本、身份、飞控输入、WiFi/BLE 广播和参数持久化。

## 发布入口

- [GitHub Releases](https://github.com/Y-Serein/SeryRemoteID/releases)
- [下载中心](/downloads/)
- [OTA 与恢复](/products/seryremoteid/ota-recovery)
