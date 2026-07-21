---
layout: home

hero:
  name: "Y-Serein"
  text: "可靠的产品，<br>面向真实系统。"
  tagline: "由核心维护者主导，面向无人机厂商、飞控集成商、开发者与学生，提供硬件、固件、桌面软件和可执行文档。"
  image:
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 420'%3E%3Cdefs%3E%3ClinearGradient id='g' x2='1' y2='1'%3E%3Cstop stop-color='%23eef5f1'/%3E%3Cstop offset='1' stop-color='%23cfdfd8'/%3E%3C/linearGradient%3E%3Cfilter id='s'%3E%3CfeDropShadow dy='18' stdDeviation='16' flood-color='%23193632' flood-opacity='.16'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='640' height='420' rx='30' fill='url(%23g)'/%3E%3Cpath d='M0 84h640M0 336h640M128 0v420M512 0v420' stroke='%232d6159' stroke-opacity='.08'/%3E%3Cg filter='url(%23s)'%3E%3Crect x='138' y='62' width='364' height='296' rx='28' fill='%23f8fcfa' stroke='%232d6159' stroke-opacity='.22'/%3E%3Crect x='177' y='98' width='286' height='224' rx='22' fill='%231a3934'/%3E%3Crect x='205' y='126' width='82' height='70' rx='12' fill='%2396d4c6' opacity='.9'/%3E%3Crect x='303' y='126' width='132' height='26' rx='8' fill='%23fff' opacity='.18'/%3E%3Crect x='303' y='166' width='96' height='18' rx='6' fill='%23fff' opacity='.1'/%3E%3Ccircle cx='221' cy='258' r='10' fill='%23f0b35e'/%3E%3Ccircle cx='257' cy='258' r='10' fill='%2396d4c6'/%3E%3Ccircle cx='293' cy='258' r='10' fill='%2396d4c6' opacity='.45'/%3E%3Cpath d='M343 252h72M343 274h48' stroke='%23fff' stroke-width='8' stroke-linecap='round' opacity='.13'/%3E%3C/g%3E%3Cg fill='none' stroke='%232d6159' stroke-width='4' stroke-linecap='round' opacity='.65'%3E%3Cpath d='M515 166c31 20 31 68 0 88'/%3E%3Cpath d='M538 145c49 34 49 96 0 130'/%3E%3Cpath d='M125 166c-31 20-31 68 0 88'/%3E%3Cpath d='M102 145c-49 34-49 96 0 130'/%3E%3C/g%3E%3Ccircle cx='320' cy='34' r='5' fill='%23f0b35e'/%3E%3C/svg%3E"
    alt: Y-Serein 硬件与无线系统抽象示意图
  actions:
    - theme: brand
      text: 浏览产品
      link: /products/
    - theme: alt
      text: 获取支持
      link: /support/

features:
  - icon: "01"
    title: SeryRemoteID
    details: 面向无人机 Remote ID 的硬件与固件产品，连接飞控、身份数据和 WiFi/BLE 广播链路。
    link: /products/seryremoteid/
    linkText: 查看产品
  - icon: "02"
    title: Serein
    details: 本地优先的 Markdown 桌面软件，让写作、知识和项目资料保持可控、可迁移。
    link: /products/serein/
    linkText: 查看产品
  - icon: "03"
    title: ArduPilot Research
    details: 面向飞控、实时系统和可靠性研究的上游基线与工程工作区，不冒充独立产品。
    link: /engineering/ardupilot
    linkText: 查看工程入口
---

<div class="ys-home-content">
<section class="ys-proof-strip" aria-label="Y-Serein 产品原则">
<div><span>MAINTAINER-LED</span><strong>核心维护者主导</strong></div>
<div><span>FIELD-DEPLOYED</span><strong>已有真实硬件用户</strong></div>
<div><span>DOCUMENTATION-FIRST</span><strong>产品与文档同步交付</strong></div>
</section>

<section class="ys-home-section ys-flagship-section">
<div class="ys-section-copy"><span class="ys-eyebrow">FLAGSHIP HARDWARE</span><h2>SeryRemoteID</h2><p>为无人机厂商、飞控集成商、开发者与学生提供 Remote ID 硬件、固件和集成文档。支持 APM、PX4 等飞控生态，具体型号与版本将在兼容性矩阵中持续维护。</p><div class="ys-inline-actions"><a class="ys-action is-primary" href="/products/seryremoteid/">产品概览</a><a class="ys-action" href="/products/seryremoteid/getting-started">快速开始</a><a class="ys-action" href="/downloads/">下载</a></div></div>
<div class="ys-signal-panel" aria-label="SeryRemoteID 数据链路示意"><div class="ys-signal-node"><span>FLIGHT CONTROLLER</span><strong>APM / PX4</strong></div><i></i><div class="ys-signal-node is-core"><span>SERYREMOTEID</span><strong>IDENTITY + STATE</strong></div><i></i><div class="ys-signal-node"><span>BROADCAST</span><strong>WiFi / BLE</strong></div></div>
</section>

<section class="ys-home-section">
<div class="ys-home-heading"><span>PRODUCT-GRADE RESOURCES</span><h2>产品不止是代码。</h2><p>一个可用项目还需要安装、配置、更新、排障、版本、兼容性和支持入口。新的站点结构围绕用户完成任务，而不是围绕仓库目录展开。</p></div>
<div class="ys-resource-grid">
<a href="/docs/"><span>01</span><h3>用户文档</h3><p>快速开始、完整手册、硬件接线、集成、OTA、恢复与故障排查。</p></a>
<a href="/downloads/"><span>02</span><h3>版本与下载</h3><p>软件和固件版本、兼容硬件、校验值、升级说明与已知问题。</p></a>
<a href="/support/"><span>03</span><h3>支持与反馈</h3><p>按产品、问题类型和安全等级进入正确的支持渠道。</p></a>
</div>
</section>

<section class="ys-home-section ys-engineering-section">
<div class="ys-home-heading"><span>ENGINEERING PRINCIPLES</span><h2>安全、可靠、实时。</h2><p>可信不是宣传词，而是由接口边界、版本管理、验证矩阵、故障恢复和可复现证据共同构成。</p></div>
<div class="ys-principle-grid"><article><strong>安全</strong><p>明确身份、命令、更新和支持渠道的信任边界。</p></article><article><strong>可靠</strong><p>记录兼容性、失败模式、恢复方法和已知限制。</p></article><article><strong>实时</strong><p>关注端到端时限、抖动和资源压力下的系统行为。</p></article></div>
</section>
</div>
