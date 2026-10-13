---
title: Scope Core SDK
description: Serein Scope 的安装、组件与使用说明。
---

# Core SDK 与组件接口手册

## 交付内容和版本

`component-sdk.zip` 包含公共头文件、Core 共享库和导入库、CMake 包配置、`SDK_INFO.json`、MIT 许可证、包内 SHA-256 清单与可独立构建的组件模板。当前 Core 版本为 1.0.1，组件接口版本为 ABI 2。SDK 不包含 Qt 开发环境。

组件开发者先读取 `SDK_INFO.json`，安装对应 Qt、编译器和目标平台工具链。当前 Windows SDK 由 Qt 6.11.1 / MinGW 13.1.0 构建。CMake 包检查 Qt 精确版本、编译器及其版本、CPU 架构和目标平台；组件还需与目标宿主的 Core 二进制兼容。ABI 2 不是跨编译器或跨任意 Core 版本的稳定 C ABI。

| 兼容维度 | 当前 Windows SDK |
| --- | --- |
| Core | 1.0.1，CMake 包按精确版本匹配 |
| 插件接口 | `com.serein.scope.IDevicePlugin/2.0`，`interfaceVersion: 2` |
| Qt | 6.11.1 |
| 编译器 | GNU MinGW 13.1.0 |
| 平台 | Windows x64（`SDK_INFO.json` 中为 `Windows` / `AMD64`） |

如需不同工具链，应为该目标重新构建宿主、Core 和组件，并重新执行加载/卸载验收。不要把一个 Windows DLL 直接用于 Linux/macOS。

## 最小构建流程

1. 解压 `component-sdk.zip`，校验 ZIP 的发布摘要和包内 `SHA256SUMS.txt`。
2. 复制 `examples/component_sdk/` 作为项目起点。
3. 修改 `plugin.json`、`TemplatePlugin::metadata()` 和输出文件名，使 ID、版本和描述一致。
4. 用 `SEREIN_SCOPE_SDK_PREFIX` 指向解压后的 SDK，通过 `find_package(SereinScopeCore CONFIG REQUIRED)` 链接 `SereinScopeCore::serein_scope_core`。
5. 构建 `.sscomponent`，在目标宿主上验证导入、加载、打开、关闭、卸载和移除。

模板中有可直接使用的 Windows CMake 命令，详见 SDK 内 `examples/component_sdk/README.md`。

`plugin.json` 至少需要稳定的 `id`、展示名称与描述、`version`、类别及 `interfaceVersion: 2`；模板还包含强调色和能力列表。运行时 `metadata()` 的 ID、版本和接口版本必须与包元数据一致。同一插件升级应保持 ID 不变并更新版本。模板的 `TemplatePlugin`、`TemplateWorkspace` 展示了插件、工作区和可选 UI Provider 的最小接线。

## 接口总览

| 接口/类型 | 作用 | 关键约束 |
| --- | --- | --- |
| `IDevicePlugin` | 元数据、初始化、创建工作区、卸载与关闭 | `plugin.json`、运行时元数据与 ABI 版本一致；初始化不启动采集 |
| `IDeviceWorkspace` | 工作区关闭时停止资源 | `shutdown()` 停止串口、定时器和后台任务 |
| `IWorkspaceUiProvider` | 可选地贡献 Context、Inspector、Output 和组件库 | 宿主拥有 Dock、布局与生命周期；切换内容前 `prepareContextChange()` |
| `IDataEngine` / `ParseResult` | 解析字节并产出 `PacketList` | `consumed` 精确，半包由 `BufferedDecoder` 保留；解析器不打开串口或控件 |
| `SerialTransport` | 串口扫描、异步收发和 Core 共享租约 | 同一端口不能绕过租约另开并行句柄 |
| `WorkspaceCanvas` / `ComponentSurface` | 中央工作区的标准画布和卡面 | 自由布局用 Canvas；普通布局用 Surface；组件不复制宿主壳层 |

公开声明位于 SDK 的 `include/serein/scope/`。详细签名以头文件为准；完整组件生命周期、版本管理和 ABI 1 迁移规则见[插件开发说明](sdk#生命周期与-ui-所有权)。

## 生命周期与 UI 所有权

插件实现 `QObject + IDevicePlugin`，使用 `Q_PLUGIN_METADATA(IID "com.serein.scope.IDevicePlugin/2.0" FILE "plugin.json")`。`initialize()` 保存宿主服务并完成轻量准备；`createWorkspace()` 创建带 parent 的 QWidget；工作区 `shutdown()` 先停止采集和任务；没有活动工作区时才允许 `canUnload()` 返回 true；插件 `shutdown()` 后不再调用宿主服务。

宿主管理 Activity Rail、全局栏、标签、Dock 和分割比例。组件提供中央业务视图，并通过可选 Provider 声明固定语义槽内容、标题和受控动作。槽内容由组件工作区持有，切换或销毁展示对象前必须调用 `prepareContextChange()`，让宿主归还临时挂载的控件。组件不可寻找宿主私有控件名或直接操作 Dock。

## 数据引擎与串口

`IDataEngine::feed(QByteArrayView)` 返回 `ParseResult { consumed, packets, needMore }`。`consumed` 在输入缓冲范围内；遇到半包时只消费确定可丢弃的字节，保留剩余数据给 `BufferedDecoder`。引擎不阻塞等待字节、不操作 UI、不持有独立串口。需要串口的组件调用 Core 的 `SerialTransport`，检查状态与错误信号，并在关闭工作区前释放租约。

## 打包与安装

组件产物是原生动态库，扩展名为 `.sscomponent`。可交付单文件，或把主库、依赖 DLL 与 QML 模块放入自包含目录/ZIP。宿主默认从 `<exe>/Components/` 扫描和安装，可通过 `SEREIN_COMPONENT_DIR` 覆盖仓库位置。安装包版本、组件版本、Core 版本分别记录；升级组件时在目标宿主上重新验证完整生命周期。

验收顺序建议固定为：配置阶段工具链检查 → SDK 示例独立构建 → 包元数据检查 → 导入 → 加载 → 打开工作区 → 关闭并停止任务 → 卸载 DLL → 移除安装项。开发有串口、网络或设备写入的组件，还应验证断开、超时、异常退出和同一资源被占用时的释放路径。

当前 Widgets 宿主使用以上通用 Provider 接口。QML 控制器仍对 Serial/TN160 有专用页面索引和控件名依赖，不能据此承诺任意第三方组件在 QML 路径具有同等操作入口。原生组件与宿主同进程运行，不提供对不可信代码的隔离。
