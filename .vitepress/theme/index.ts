import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import HomeMotion from "./HomeMotion.vue";
import "./portal.css";

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(context) {
    DefaultTheme.enhanceApp?.(context);
    context.app.component("HomeMotion", HomeMotion);

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
