<script setup lang="ts">
import { airframe, upperDeck, propellers, signals, top } from './iso-drone';
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false });
const frame = airframe(), cover = upperDeck(), blades = propellers(), paths = signals();
</script>
<template>
  <svg :class="['iso-drone', { 'ys-drone-mark': compact }]" :viewBox="compact ? '0 0 680 420' : '0 -42 680 470'" role="img" aria-label="通用四旋翼等距结构示意">
    <ellipse class="iso-contact" cx="340" cy="288" rx="187" ry="53" />
    <g v-if="!compact" :transform="top(5, 5, 0)"><rect class="iso-plinth" width="267" height="267" rx="14"/><rect class="iso-plinth-inset" x="9" y="9" width="249" height="249" rx="10"/><path class="iso-detail" d="M24 23h19M23 24v19M244 23h-19M245 24v19M23 244h19M24 245v-19M244 245h-19M245 244v-19"/></g>
    <g v-html="frame" />
    <g class="iso-moving" data-part="cover" v-html="cover" />
    <g class="iso-moving" data-part="rotors" v-html="blades" />
    <g class="iso-signal-paths"  v-html="paths" />
  </svg>
</template>
