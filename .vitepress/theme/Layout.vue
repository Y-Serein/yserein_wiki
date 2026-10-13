<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { onMounted, onBeforeUnmount } from 'vue';

const Layout = DefaultTheme.Layout;
let observer: MutationObserver | undefined;
function labelNavigation() {
  const button = document.querySelector('.VPNavBarHamburger');
  if (button?.getAttribute('aria-label') !== '主导航') button?.setAttribute('aria-label', '主导航');
}
onMounted(() => {
  labelNavigation();
  const nav = document.querySelector('.VPNav');
  if (nav) {
    observer = new MutationObserver(labelNavigation);
    observer.observe(nav, { subtree: true, attributes: true, attributeFilter: ['aria-label'] });
  }
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <Layout>
    <template #layout-top>
      <noscript>
        <nav class="resource-static-nav" aria-label="无脚本页面导航">
          <a href="/">首页</a><a href="/products/">产品</a><a href="/docs/">文档</a><a href="/downloads/">下载</a><a href="/support/">支持</a>
        </nav>
      </noscript>
    </template>
  </Layout>
</template>
