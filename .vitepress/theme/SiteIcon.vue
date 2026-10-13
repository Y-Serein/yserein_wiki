<script setup lang="ts">
import layers from './assets/icons/layers.svg';
import signal from './assets/icons/signal.svg';
import grid from './assets/icons/grid.svg';
import folder from './assets/icons/folder-open.svg';
import download from './assets/icons/arrow-down.svg';
import support from './assets/icons/wrench.svg';
import unlock from './assets/icons/lock-open.svg';
import launch from './assets/icons/rocket-launch.svg';
import reset from './assets/icons/arrow-path.svg';
import document from './assets/icons/rectangle-stack.svg';
const icons = { layers, signal, grid, folder, download, support, unlock, launch, reset, document };
defineProps<{ name: keyof typeof icons }>();
</script>
<template><span class="site-icon" aria-hidden="true" :style="{ '--icon-source': `url('${icons[name]}')` }" /></template>
