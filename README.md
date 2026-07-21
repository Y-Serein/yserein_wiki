# Y-Serein 产品与公开资源中心

这是 Y-Serein 的产品官网、用户文档、下载、支持和研究工程入口，使用 VitePress 构建。

当前公开产品：

- **SeryRemoteID**：Remote ID 硬件与 ESP32-S3 固件产品。
- **Serein**：本地优先的 Markdown 桌面软件。

工程与研究入口：

- **ArduPilot Research**：上游飞控研究基线，不作为 Y-Serein 独立产品宣传。
- **可信智能计算与智能物理系统**：安全、可靠与实时计算的长期方向。

## 内容结构

```text
products/       产品介绍、用户手册、开发与发布文档
docs/           文档中心入口
downloads/      版本与下载入口
engineering/    ArduPilot 与工程研究入口
research/       长期研究方向
support/        用户支持与问题反馈
about/          团队、原则与路线图
C_context/      不发布的内部素材清单
```

旧 `products/access.md`、`products/wiki.md`、`projects/` 和 `guide/` 内容保留为历史草稿，但通过 `srcExclude` 排除，不进入公开站点。

## 本地运行

```bash
npm install
npm run dev
```

默认地址：<http://127.0.0.1:5173>

## 构建

```bash
npm run build
```

静态产物生成到 `.vitepress/dist/`。
