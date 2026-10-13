# YSerein 产品与文档

基于 VitePress 的官网、用户手册、下载与支持入口。Swarm、Scope、Serein 为主要软件产品，保留 SeryRemoteID、其他产品与研究工程资料。

## 本地运行与构建

```bash
npm ci
npm run dev -- --port 5188 --strictPort
npm run build
npm run check
```

开发地址为 http://127.0.0.1:5188/；未启动前不可访问。静态产物为 `.vitepress/dist/`。

## 内容与下载

- `products/`：产品和按任务组织的用户手册。
- `docs/`：用户文档入口；内部设计、发布和接手资料排除在公开构建之外。
- `downloads/`：版本、安装、组件、SDK 和校验说明。
- `.vitepress/data/releases.json`：公开静态资产清单；`url: null` 表示无公开文件链接，以支持入口获取。
- `.vitepress/theme/DownloadCatalog.vue`：SSR 下载清单与校验值复制/失败恢复。
- `.vitepress/theme/resource-center.css`：门户页面版式与基础视觉。
- `.vitepress/theme/material.css`：以 Swarm 为主参考的材质、选项组、按钮与文档导航。
- `.vitepress/theme/MaterialShowcase.vue`：原生选项控制的无人机结构观察与操作指南入口。

安装器和组件放 Releases，不进入源码仓库或 Pages 构建。只有文件实际公开并完成匿名下载及摘要核验后，才填写对应 `url`。页面不运行客户端 GitHub API 查询，服务故障不清空已有资料。

现有 `HomeMotion.vue` 与 `portal.css` 保留三大动效实现。`guide/`、`projects/` 和旧产品草稿保留为历史内容，按配置排除。

设计系统见 `docs/DESIGN_SYSTEM.md`，文档来源与版本对应关系见本地设计记录；发布前检查构建、内部链接、移动端、搜索、公开输出和下载摘要。构建 workflow 不等于公网已发布。
