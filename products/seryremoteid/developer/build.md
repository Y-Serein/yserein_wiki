---
title: SeryRemoteID 构建与移植
description: ESP-IDF 构建环境、源码组件、量产硬件配置和移植检查。
---

# 构建与移植

## 已记录的构建基线

仓库记录 ESP-IDF 5.5.4、目标 `esp32s3` 可编译：

```bash
cd firmware
export IDF_PATH=/tmp/esp-idf-v5.5.4
export IDF_TOOLS_PATH=/tmp/espressif-tools
. "$IDF_PATH/export.sh"
idf.py build
```

推荐使用独立构建目录，避免生成物污染源码：

```bash
IDF_PATH=/tmp/esp-idf-v5.5.4 \
IDF_TOOLS_PATH=/tmp/espressif-tools \
bash -lc '. "$IDF_PATH/export.sh" && cd firmware && idf.py -B /tmp/seryremoteid-build build'
```

## 源码依赖

必须保留 `firmware/components/` 下的本地组件，包括 OpenDroneID、MAVLink、Monocypher、libcanard 和 DroneCAN generated code。当前项目不要求 Arduino 或在线 managed components。

不要把以下生成物当作源码交付：

- `firmware/build/`
- `firmware/managed_components/`
- `dependencies.lock`

## 产品硬件配置

仓库 README 中的 ESP32-S3 DevKit GPIO 只能作为开发默认值，不能替代实际销售硬件配置。量产板应有独立的：

- board target 或配置文件。
- GPIO、UART、TWAI、LED 和按键定义。
- Flash 分区、NVS、OTA slot 和 secure version 规则。
- 硬件 Revision 与固件兼容映射。

## 构建产物

正式发布流程应明确生成：

- 应用固件和必要 bootloader/partition 文件。
- 版本、commit、硬件兼容和构建环境清单。
- SHA-256 和签名描述符。
- 可升级包与工厂恢复包的区别。

## 移植检查

1. GPIO、电平、CAN 收发器和天线配置。
2. Flash、分区和 OTA 空间。
3. UART/CAN 负载和任务栈。
4. WiFi/BLE 共存和地区配置。
5. NVS 参数迁移和默认密钥。
6. Web 资源、产品名和 app descriptor。
7. 上板、抓包、故障和升级恢复验证。
