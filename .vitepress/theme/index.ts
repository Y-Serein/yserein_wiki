import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import HomeMotion from "./HomeMotion.vue";
import "./portal.css";
import "./resource-center.css";
import "./fonts/docs.css";
import DownloadCatalog from "./DownloadCatalog.vue";
import Layout from "./Layout.vue";
import IsoDrone from "./IsoDrone.vue";
import MaterialShowcase from "./MaterialShowcase.vue";
import SiteIcon from "./SiteIcon.vue";
import "./material.css";

const theme: Theme = {
  ...DefaultTheme,
  Layout,
  enhanceApp(context) {
    DefaultTheme.enhanceApp?.(context);
    context.app.component("HomeMotion", HomeMotion);
    context.app.component("DownloadCatalog", DownloadCatalog);
    context.app.component("IsoDrone", IsoDrone);
    context.app.component("MaterialShowcase", MaterialShowcase);
    context.app.component("SiteIcon", SiteIcon);

    if (typeof window === "undefined") return;

    window.requestAnimationFrame(() => {
      document
        .querySelector<HTMLButtonElement>(".VPNavBarHamburger")
        ?.setAttribute("aria-label", "主导航");
    });

    if (document.documentElement.dataset.ysSearchFocusRestore) return;

    document.documentElement.dataset.ysSearchFocusRestore = "true";
    window.addEventListener("keydown", (event) => {
      if (
        event.key !== "Escape" ||
        !document.querySelector(".VPLocalSearchBox")
      ) {
        return;
      }

      window.requestAnimationFrame(() => {
        document.querySelector<HTMLButtonElement>(".DocSearch-Button")?.focus();
      });
    });
  }
};

export default theme;
