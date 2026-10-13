---
title: SeryRemoteID 系统架构
description: 输入、状态聚合、配置、安全、Web 和无线广播的数据流与任务边界。
---

# 系统架构

## 逻辑数据流

```text
APM / PX4 / other flight controller
        │
        ├─ MAVLink OPEN_DRONE_ID_* over UART
        └─ DroneCAN Remote ID over CAN
        │
        ▼
Input validation and freshness
        │
        ▼
Remote ID state aggregation
        ├─ BasicID / Operator / System / Location / Self ID
        ├─ arming state
        └─ persistent parameters
        │
        ├─ WiFi Beacon Vendor IE
        ├─ WiFi NAN action frame
        ├─ BLE 4 legacy advertising
        └─ BLE 5 extended advertising
```

管理平面包括 Web 状态页、参数服务、SecureCommand、NVS 和签名 OTA。它们与实时广播任务之间的资源和权限边界需要明确。

## 架构分层

### 硬件与 ESP-IDF

- ESP32-S3、UART、TWAI/CAN、WiFi、BLE、NVS、OTA。
- 产品量产板与 DevKit 默认配置必须分开。

### 传输层

- MAVLink：串口消息解析、状态和参数服务。
- DroneCAN：节点分配、NodeStatus、消息和服务。

### 状态层

- 聚合不同输入来源。
- 判断数据新鲜度、arming 和身份有效性。
- 为广播、Web 和诊断提供一致快照。

### 输出层

- 按标准编码 Remote ID 消息。
- 维护 WiFi/BLE 广播周期和介质差异。

### 管理与安全

- 参数持久化。
- SecureCommand 和公钥管理。
- Web 状态、升级、版本和签名验证。

## 请核对的时序信息

| 项目 | 需要记录 |
|---|---|
| 输入周期 | MAVLink/DroneCAN 的预期和最小频率 |
| 新鲜度 | 各消息何时过期、过期后的广播行为 |
| 广播周期 | WiFi/BLE 的配置、最大抖动和优先级 |
| 共享状态 | 锁、快照、一致性和并发修改 |
| Web/NVS | 管理操作是否阻塞关键任务 |
| OTA | 升级期间广播和状态的行为 |

## 故障边界

架构说明最终应明确：输入丢失、身份无效、CAN 节点变化、NVS 损坏、无线失败、资源不足和 OTA 中断时，各模块如何降级、报告和恢复。
