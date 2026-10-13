<script setup lang="ts">
import { useId } from 'vue';
import IsoDrone from './IsoDrone.vue';
import SiteIcon from './SiteIcon.vue';
const group = `structure-${useId()}`;
const options = [{id:'assembly',label:'装配',aria:'装配结构',icon:'grid' as const},{id:'signal',label:'信号',aria:'信号路径',icon:'signal' as const},{id:'exploded',label:'展开',aria:'展开结构',icon:'layers' as const}];
</script>
<template>
  <section class="material-showcase" aria-label="无人机结构与操作指南">
    <div class="material-figure">
      <div class="material-figure-head"><span>FIG. 01</span><span>QUADROTOR / ISOMETRIC</span></div>
      <IsoDrone />
      <div class="material-figure-foot"><span>通用四旋翼结构示意</span><span class="material-readout"><span data-readout="assembly">装配结构</span><span data-readout="signal">信号路径</span><span data-readout="exploded">展开结构</span></span></div>
    </div>
    <div class="material-inspector">
      <p class="resource-kicker">Structure & workflow</p>
      <h2>看清结构，<br>再进入现场。</h2>
      <p class="material-intro">在装配、信号与展开视图之间切换，观察机体与部件的关系。</p>
      <fieldset class="material-control-group"><legend class="visually-hidden">无人机结构视图</legend>
        <label v-for="option in options" :key="option.id" class="material-option"><input type="radio" :name="group" :value="option.id" :checked="option.id === 'assembly'" :aria-label="option.aria"/><SiteIcon :name="option.icon" /><span>{{ option.label }}</span></label>
      </fieldset>
      <div class="material-guide-group"><p>Swarm 操作指南</p><a href="/products/swarm/connection"><SiteIcon name="signal"/><span>连接与状态</span><b aria-hidden="true">↗</b></a><a href="/products/swarm/device-operations"><SiteIcon name="unlock"/><span>解锁与起飞指南</span><b aria-hidden="true">↗</b></a><a href="/products/swarm/workflow"><SiteIcon name="launch"/><span>编队作业流程</span><b aria-hidden="true">↗</b></a></div>
      <a class="material-credit" href="https://iso-glow.vercel.app/">Made with ISO-GLOW ↗</a>
    </div>
  </section>
</template>
