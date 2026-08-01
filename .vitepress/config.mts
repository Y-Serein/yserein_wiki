import { defineConfig } from "vitepress";

const ysereinLogo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='24' fill='%23142f2c'/%3E%3Crect x='10' y='10' width='76' height='76' rx='19' fill='none' stroke='%2397d7c9' stroke-opacity='.3'/%3E%3Cg fill='%2397d7c9'%3E%3Ccircle cx='29' cy='27' r='5'/%3E%3Ccircle cx='48' cy='27' r='5' opacity='.55'/%3E%3Ccircle cx='67' cy='27' r='5' opacity='.28'/%3E%3Ccircle cx='29' cy='46' r='5' opacity='.45'/%3E%3Ccircle cx='48' cy='46' r='5'/%3E%3Ccircle cx='67' cy='46' r='5' opacity='.5'/%3E%3Ccircle cx='29' cy='65' r='5' opacity='.28'/%3E%3Ccircle cx='48' cy='65' r='5' opacity='.58'/%3E%3Ccircle cx='67' cy='65' r='5'/%3E%3C/g%3E%3Cpath d='M29 77h38' stroke='%23f0b35e' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E";

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
    "C_context/**/*.md",
    "products/wiki.md",
    "projects/**/*.md",
    "guide/**/*.md"
  ],
  lang: "zh-CN",
  title: "Y-Serein",
  description:
    "Y-Serein 产品与公开资源中心：无人机硬件、嵌入式固件、桌面软件、用户文档与工程验证。",
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,
  head: [
    ["meta", { name: "theme-color", content: "#e8f1ed" }],
    ["meta", { name: "color-scheme", content: "light" }],
    ["meta", { name: "application-name", content: "Y-Serein" }],
    ["meta", { property: "og:site_name", content: "Y-Serein" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: ysereinLogo }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: ysereinLogo,
    siteTitle: "Y-Serein",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "产品",
        items: [
          { text: "产品总览", link: "/products/" },
          { text: "YSerein Access", link: "/products/access" },
          { text: "SeryRemoteID", link: "/products/seryremoteid/" },
          { text: "Serein", link: "/products/serein/" }
        ]
      },
      { text: "文档", link: "/docs/" },
      { text: "下载", link: "/downloads/" },
      {
        text: "研究与工程",
        items: [
          { text: "工程总览", link: "/engineering/" },
          { text: "ArduPilot Research", link: "/engineering/ardupilot" },
          { text: "研究方向", link: "/research/" }
        ]
      },
      { text: "支持", link: "/support/" },
      { text: "关于", link: "/about/" }
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
      "/products/serein/": [
        {
          text: "Serein",
          items: [
            { text: "产品概览", link: "/products/serein/" },
            { text: "快速开始", link: "/products/serein/getting-started" },
            { text: "用户手册", link: "/products/serein/user-guide" },
            { text: "数据与隐私", link: "/products/serein/data-privacy" },
            { text: "版本与发布", link: "/products/serein/release-notes" },
            { text: "开发者文档", link: "/products/serein/developer" }
          ]
        }
      ],
      "/products/": [
        {
          text: "产品",
          items: [
            { text: "产品总览", link: "/products/" },
            { text: "SeryRemoteID", link: "/products/seryremoteid/" },
            { text: "Serein", link: "/products/serein/" }
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
      message: "产品、文档与工程证据，由 Y-Serein 核心维护者持续维护。",
      copyright: "Copyright © 2026 Y-Serein"
    }
  }
});
