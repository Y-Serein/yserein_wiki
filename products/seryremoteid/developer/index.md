---
title: SeryRemoteID 开发者文档
description: 固件架构、构建、移植、测试和贡献入口。
---

# 开发者文档

SeryRemoteID 是 ESP-IDF 原生 ESP32-S3 固件，不继承 Arduino 运行时或旧工程工具。开发者文档与用户手册分开维护，避免让最终用户依赖源码细节完成安装。

## 开发入口

- [系统架构](/products/seryremoteid/developer/architecture)
- [构建与移植](/products/seryremoteid/developer/build)
- [验证矩阵](/products/seryremoteid/verification)
- [仓库源码](https://github.com/Y-Serein/SeryRemoteID)

## 当前主要模块

| 模块 | 作用 |
|---|---|
| `firmware/main/app_main.c` | 系统初始化和任务启动 |
| `firmware/main/cfg.*` | NVS 配置层 |
| `firmware/main/protocol/rid_state.*` | Remote ID 状态聚合 |
| `firmware/main/transport/rid_mavlink.*` | MAVLink 输入 |
| `firmware/main/transport/rid_dronecan.*` | DroneCAN 输入和服务 |
| `firmware/main/net/rid_wifi.*` | WiFi Beacon/NAN 广播 |
| `firmware/main/net/rid_ble.*` | BLE 4/5 广播 |
| `firmware/main/web/` | 状态页与 OTA |
| `firmware/components/` | OpenDroneID、MAVLink、Monocypher、libcanard 等组件 |

## 开发文档还需补齐

- 任务、队列、锁和共享状态关系。
- 各输入与广播任务的周期和优先级。
- 错误码、日志级别和诊断方式。
- 硬件抽象边界和量产板配置。
- 单元、集成、上板和抓包测试入口。
- 代码风格、提交、Review 和发布流程。

## 贡献边界

涉及身份、密钥、签名、OTA、CAN、射频和量产硬件的修改需要明确威胁模型、兼容性和验证方法，不能只以“编译通过”作为合并依据。
