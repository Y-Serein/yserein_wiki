---
title: Scope 组件库
description: Serein Scope 的安装、组件与使用说明。
---

# 组件说明

组件版本以组件包自身元数据为准，可能与宿主版本不同。

| 组件 ID | 当前元数据版本 | 用途与边界 |
| --- | --- | --- |
| `serial-scope` | 1.0.1 | 通用串口、Delimited numeric、Raw text、波形、通道与终端 |
| `tn160-thermal` | 1.0.1 | 原生串口 TN160 的 UF2、实时热诊断和设备标定流程；需要对应设备与固件 |
| `tn160-thermal-ncm` | 1.2.0 | TN160 USB CDC-NCM 设备诊断、UF2 与生产标定流程；需要对应设备与固件 |
| `t384-thermal-ncm` | 0.2.0 | T256/T384/T640 USB NCM 热图、RAW16 和实验性两点温度模型；不是 OEM 正式测温 |
| `yserein-swarm-sim` | 0.1.0 | UDP 双协议、网格编队和舞步预览；大规模容量需按目标主站与硬件单独验收 |
| `yserein-hmi` | 0.1.0 | 离线 HMI 工程、页面、控件、绑定、预览和本机目标包；真实串口与硬件下载需要目标后端 |
| `yserein-universe` | 0.1.0 | 调用 GMAT → YSerein Adapter → OpenSpace 流程；需配置外部工程和软件 |

## 热成像数据与标定

热成像工作区把实时视图放在中央，设备与流程操作放在 Context，测量信息放在 Inspector，趋势和结果放在 Output。TN160 以 Center 5×5 为主要测量量；T256/T384/T640 组件使用独立的 RAW16 与模型链路，不套用 TN160 的标定结果。

T256/T384/T640 的两点模型目前属于实验性流程。只有有效设备模型时才应显示温度；没有模型时可查看 Y16。模型写入和回读成功也不代表全画面、全温区或 OEM 测温精度已经验收。

## 外部系统

Swarm Simulator 的网络效果取决于所选协议、主站和网络环境；不要把界面创建数量当成主站实际在线或可控数量。Universe 要先选定本机工程路径并保证 GMAT、适配器与 OpenSpace 可用。HMI 的预览和本机目标包不等于屏幕已下载或真实串口已联通。
