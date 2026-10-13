import { defineConfig } from "vitepress";

const ysereinLogo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='24' fill='%23202124'/%3E%3Crect x='10' y='10' width='76' height='76' rx='19' fill='none' stroke='%23d3d8df' stroke-opacity='.42'/%3E%3Cg fill='%23f3f4f6'%3E%3Ccircle cx='29' cy='27' r='5'/%3E%3Ccircle cx='48' cy='27' r='5' opacity='.72'/%3E%3Ccircle cx='67' cy='27' r='5' opacity='.42'/%3E%3Ccircle cx='29' cy='46' r='5' opacity='.58'/%3E%3Ccircle cx='48' cy='46' r='5'/%3E%3Ccircle cx='67' cy='46' r='5' opacity='.66'/%3E%3Ccircle cx='29' cy='65' r='5' opacity='.42'/%3E%3Ccircle cx='48' cy='65' r='5' opacity='.74'/%3E%3Ccircle cx='67' cy='65' r='5'/%3E%3C/g%3E%3Cpath d='M29 77h38' stroke='%23266df0' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E";

const wikiOutDir =
  process.env.YSEREIN_WIKI_OUT_DIR ||
  process.env.SEREIN_WIKI_OUT_DIR ||
  ".vitepress/dist";

export default defineConfig({
  outDir: wikiOutDir,
  srcExclude: [
    "HANDOFF.md",
    "MEMORY.md",
    "README.md",
    "docs/PRODUCT_ITERATION_LOG.md",
    "docs/DESIGN_SYSTEM.md",
    "C_context/**/*.md",
    "designs/**/*.md",
    "products/wiki.md",
    "products/access.md",
    "AGENTS.md",
    "CLAUDE.md",
    "docs/design/**/*.md",
    "docs/release/**/*.md",
    "docs/runbooks/**/*.md",
    "projects/**/*.md",
    "guide/**/*.md"
  ],
  lang: "zh-CN",
  title: "YSerein",
  description:
    "YSerein 产品、用户文档与下载：Swarm 无人机地面站、Scope 调试仪器与 Serein 本地写作。",
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,
  head: [
    ["meta", { name: "theme-color", content: "#fbfaf7" }],
    ["meta", { name: "color-scheme", content: "light" }],
    ["meta", { name: "application-name", content: "YSerein" }],
    ["meta", { property: "og:site_name", content: "YSerein" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: ysereinLogo }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: ysereinLogo,
    siteTitle: "YSerein",
    nav: [
      { text: "产品", items: [{ text: "YSerein Swarm", link: "/products/swarm/" }, { text: "Serein Scope", link: "/products/scope/" }, { text: "Serein", link: "/products/serein/" }, { text: "SeryRemoteID", link: "/products/seryremoteid/" }, { text: "全部产品", link: "/products/" }] },
      { text: "文档", link: "/docs/" }, { text: "下载", link: "/downloads/" },
      { text: "更新", link: "/updates/" }, { text: "支持", link: "/support/" },
      { text: "Cloud", link: "https://cloud.yserein.com/#console" }
    ],
    sidebar: {
      "/products/seryremoteid/": [
        {
          text: "SeryRemoteID",
          items: [
            { text: "产品概览", link: "/products/seryremoteid/" },
            {
              text: "快速开始",
              link: "/products/seryremoteid/getting-started"
            }
          ]
        },
        {
          text: "用户手册",
          items: [
            { text: "使用手册", link: "/products/seryremoteid/user-guide" },
            { text: "硬件与接线", link: "/products/seryremoteid/hardware" },
            { text: "参数配置", link: "/products/seryremoteid/configuration" },
            { text: "飞控集成", link: "/products/seryremoteid/integrations" },
            {
              text: "OTA 与恢复",
              link: "/products/seryremoteid/ota-recovery"
            },
            {
              text: "故障排查",
              link: "/products/seryremoteid/troubleshooting"
            }
          ]
        },
        {
          text: "验证与发布",
          items: [
            { text: "验证矩阵", link: "/products/seryremoteid/verification" },
            {
              text: "安全与合规",
              link: "/products/seryremoteid/security-compliance"
            },
            {
              text: "版本与发布",
              link: "/products/seryremoteid/release-notes"
            }
          ]
        },
        {
          text: "开发者文档",
          items: [
            {
              text: "开发者入口",
              link: "/products/seryremoteid/developer/"
            },
            {
              text: "系统架构",
              link: "/products/seryremoteid/developer/architecture"
            },
            {
              text: "构建与移植",
              link: "/products/seryremoteid/developer/build"
            }
          ]
        }
      ],
      "/products/swarm/": [
  {
    "text": "开始使用",
    "items": [
      {
        "text": "产品概览",
        "link": "/products/swarm/"
      },
      {
        "text": "快速开始",
        "link": "/products/swarm/getting-started"
      },
      {
        "text": "完整手册",
        "link": "/products/swarm/user-guide"
      }
    ]
  },
  {
    "text": "操作与连接",
    "items": [
      {
        "text": "网络与模拟联调",
        "link": "/products/swarm/connection"
      },
      {
        "text": "设备操作与维护",
        "link": "/products/swarm/device-operations"
      },
      {
        "text": "表演准备与执行",
        "link": "/products/swarm/workflow"
      },
      {
        "text": "应急处理",
        "link": "/products/swarm/emergency"
      },
      {
        "text": "排障与收尾",
        "link": "/products/swarm/troubleshooting"
      },
      {
        "text": "版本与范围",
        "link": "/products/swarm/release-notes"
      }
    ]
  }
],
      "/products/scope/": [
  {
    "text": "Serein Scope",
    "items": [
      {
        "text": "产品概览",
        "link": "/products/scope/"
      },
      {
        "text": "快速开始",
        "link": "/products/scope/getting-started"
      },
      {
        "text": "用户手册",
        "link": "/products/scope/user-guide"
      },
      {
        "text": "组件库",
        "link": "/products/scope/components"
      },
      {
        "text": "Swarm 模拟组件",
        "link": "/products/scope/swarm-simulator/"
      },
      {
        "text": "常见问题",
        "link": "/products/scope/faq"
      },
      {
        "text": "Core SDK",
        "link": "/products/scope/sdk"
      },
      {
        "text": "版本说明",
        "link": "/products/scope/release-notes"
      }
    ]
  }
],
      "/products/scope/swarm-simulator/": [
  {
    "text": "Swarm Simulator",
    "items": [
      {
        "text": "组件概览",
        "link": "/products/scope/swarm-simulator/"
      },
      {
        "text": "快速开始",
        "link": "/products/scope/swarm-simulator/getting-started"
      },
      {
        "text": "编队与舞步",
        "link": "/products/scope/swarm-simulator/playback"
      },
      {
        "text": "地面站联调",
        "link": "/products/scope/swarm-simulator/connection"
      },
      {
        "text": "常见问题",
        "link": "/products/scope/swarm-simulator/troubleshooting"
      },
      {
        "text": "完整手册",
        "link": "/products/scope/swarm-simulator/user-guide"
      }
    ]
  }
],
      "/products/serein/": [
  {
    "text": "Serein",
    "items": [
      {
        "text": "产品概览",
        "link": "/products/serein/"
      },
      {
        "text": "快速开始",
        "link": "/products/serein/getting-started"
      },
      {
        "text": "用户手册",
        "link": "/products/serein/user-guide"
      },
      {
        "text": "公式与导出",
        "link": "/products/serein/math-export"
      },
      {
        "text": "思维导图与 XMind",
        "link": "/products/serein/mindmap"
      },
      {
        "text": "本地数据与恢复",
        "link": "/products/serein/data-privacy"
      },
      {
        "text": "版本与安装",
        "link": "/products/serein/release-notes"
      },
      {
        "text": "开发者入口",
        "link": "/products/serein/developer"
      }
    ]
  }
],
      "/products/": [
        {
          text: "产品",
          items: [
            { text: "产品矩阵", link: "/products/" },
            {
              text: "产品架构与商业路径",
              link: "/products/#product-architecture"
            },
            { text: "Serein", link: "/products/serein/" },
            { text: "YSerein Swarm", link: "/products/swarm/" },
            { text: "Serein Scope", link: "/products/scope/" },
            { text: "SeryRemoteID", link: "/products/seryremoteid/" }
          ]
        }
      ],
      "/docs/": [
        {
          text: "文档中心",
          items: [{ text: "选择产品", link: "/docs/" }]
        }
      ],
      "/downloads/": [
        {
          text: "下载中心",
          items: [{ text: "版本与下载", link: "/downloads/" }]
        }
      ],
      "/engineering/": [
        {
          text: "研究与工程",
          items: [
            { text: "工程总览", link: "/engineering/" },
            { text: "ArduPilot Research", link: "/engineering/ardupilot" },
            { text: "研究方向", link: "/research/" }
          ]
        }
      ],
      "/research/": [
        {
          text: "研究与工程",
          items: [
            { text: "工程总览", link: "/engineering/" },
            { text: "ArduPilot Research", link: "/engineering/ardupilot" },
            { text: "研究方向", link: "/research/" }
          ]
        }
      ],
      "/support/": [
        {
          text: "支持",
          items: [{ text: "获取支持", link: "/support/" }]
        }
      ],
      "/about/": [
        {
          text: "关于 Y-Serein",
          items: [
            { text: "团队与原则", link: "/about/" },
            { text: "路线图", link: "/about/roadmap" }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Y-Serein" }
    ],
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索产品文档",
            buttonAriaLabel: "搜索产品文档"
          },
          modal: {
            displayDetails: "显示详细结果",
            backButtonTitle: "关闭搜索",
            noResultsText: "没有找到相关内容",
            resetButtonTitle: "清除查询",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭"
            }
          }
        }
      }
    },
    outline: {
      level: [2, 3],
      label: "本页内容"
    },
    skipToContentLabel: "跳到主要内容",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到浅色主题",
    darkModeSwitchTitle: "切换到深色主题",
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    },
    lastUpdated: {
      text: "最后更新"
    },
    footer: {
      message: '产品与文档 · <a href="/engineering/">研究与工程</a> · <a href="/about/">关于 YSerein</a>',
      copyright: "Copyright © 2026 Y-Serein"
    }
  }
});
