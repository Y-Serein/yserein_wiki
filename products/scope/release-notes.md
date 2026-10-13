---
title: Scope 版本说明
description: Serein Scope 的安装、组件与使用说明。
---

# 版本说明

## Serein Scope 1.0.1

此版本的 Windows x64 交付由桌面宿主、独立组件包和 Core SDK 组成。宿主提供组件管理、工作区标签、面板布局和运行时加载/卸载。组件按各自版本维护，下载和兼容信息以组件包元数据为准。

Core SDK 1.0.1 提供 ABI 2 接口、公共头文件、共享库和导入库、CMake 包、`SDK_INFO.json`、组件模板、许可证及 SHA-256 清单。原生组件需使用与目标宿主匹配的 Qt、编译器、平台和 Core 构建。

可用组件及具体能力见[组件说明](components.md)。T256/T384/T640 的两点温度模型是实验性流程；HMI 的硬件下载需要目标后端；Universe 需要外部工具。有关安装和升级见[下载与安装](/downloads/#scope)。
