<script setup lang="ts">
import { ref } from 'vue';
import catalog from '../data/releases.json';
import SiteIcon from './SiteIcon.vue';
const props = defineProps<{ product?: string; components?: boolean }>();
const assets = catalog.assets.filter(asset => props.components ? asset.kind !== 'installer' : props.product ? asset.id === props.product : asset.kind === 'installer');
const feedback = ref<Record<string, string>>({});
const fallback = ref<string | null>(null);
const attempts = new Map<string, number>();
function size(bytes: number) { return `${(bytes / 1048576).toFixed(1)} MiB`; }
async function copyHash(id: string, hash: string) {
  const attempt = (attempts.get(id) ?? 0) + 1;
  attempts.set(id, attempt);
  feedback.value[id] = '正在复制校验值…';
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await Promise.race([
      navigator.clipboard.writeText(hash),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('Clipboard timed out')), 2000);
      }),
    ]);
    if (attempts.get(id) !== attempt) return;
    feedback.value[id] = '已复制校验值';
    if (fallback.value === id) fallback.value = null;
  } catch {
    if (attempts.get(id) !== attempt) return;
    fallback.value = id;
    feedback.value[id] = '请选中下方校验值并复制';
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}
</script>
<template>
  <div class="resource-download-list">
    <article v-for="asset in assets" :key="asset.id" :id="asset.id" class="resource-download">
      <div class="resource-download-main">
        <div><p class="resource-kicker">{{ asset.platform }} · {{ asset.kind === 'component' ? '独立组件' : asset.kind === 'sdk' ? '开发者工具' : '安装器' }}</p><h2>{{ asset.name }}</h2><p class="resource-download-meta">{{ asset.version }} <span>·</span> {{ size(asset.bytes) }}</p></div>
        <a v-if="asset.url" class="resource-button" :href="asset.url"><SiteIcon name="download" />{{ asset.kind === 'component' ? '下载组件' : asset.kind === 'sdk' ? '下载 SDK' : '下载安装包' }}</a>
        <a v-else class="resource-button resource-button-secondary" :href="`/support/#software-downloads`"><SiteIcon name="support" />联系获取此版本</a>
      </div>
      <p v-if="!asset.url" class="resource-availability">此版本通过支持渠道提供。公开下载文件请查看下方版本入口。</p>
      <p v-if="asset.kind !== 'installer'" class="resource-download-note">适用于 Serein Scope 1.0.1 · Core ABI 2。{{ asset.kind === 'sdk' ? 'SDK 不包含 Qt 开发环境。' : '导入后加载组件并打开工作区；切换版本前先停止任务。' }}</p>
      <p v-if="asset.signed === false" class="resource-download-note">此安装器未带 Windows 发布者签名。核对来源和 SHA-256 后再运行。</p>
      <details class="resource-checksum"><summary>文件信息与 SHA-256</summary><p class="resource-filename">{{ asset.file }}</p><code>{{ asset.sha256 }}</code><button class="resource-copy" type="button" @click="copyHash(asset.id, asset.sha256)"><SiteIcon name="document" />复制校验值</button><p role="status" aria-live="polite">{{ feedback[asset.id] }}</p><input v-if="fallback === asset.id" class="resource-hash-input" :aria-label="`${asset.name} SHA-256，选中并复制`" :value="asset.sha256" readonly @focus="($event.target as HTMLInputElement).select()" /></details>
    </article>
  </div>
</template>
