<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

type MotionPolicy = "full" | "auto" | "reduced";
type ReframeState = "armed" | "playing" | "settled";

const stages = [
  { id: "context", label: "Context", note: "产品边界、用户任务与适用条件沿同一条场线进入系统。" },
  { id: "decisions", label: "Decisions", note: "文档、版本与支持入口形成清楚、可检查的决策波纹。" },
  { id: "evidence", label: "Evidence", note: "构建、硬件验证与已知问题进入同一条公开证据轨道。" }
] as const;

const stageMs = 8000;
const cycleMs = stageMs * stages.length;
const activeStage = ref(0);
const motionPolicy = ref<MotionPolicy>("full");
const signalMode = ref<"autoplay" | "static">("autoplay");
const sectionRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const cleanups: Array<() => void> = [];

function readMotionPolicy(): MotionPolicy {
  if (typeof window === "undefined") return "full";
  const requested = new URLSearchParams(window.location.search).get("motion");
  return requested === "auto" || requested === "reduced" || requested === "full" ? requested : "full";
}

function shouldReduce(policy: MotionPolicy, systemReduced: boolean) {
  return policy === "reduced" || (policy === "auto" && systemReduced);
}

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const smoothstep = (from: number, to: number, value: number) => {
  const amount = clamp((value - from) / (to - from));
  return amount * amount * (3 - 2 * amount);
};

function setupPill(policy: MotionPolicy) {
  const pill = document.querySelector<HTMLElement>("[data-motion-pill]");
  const beam = pill?.querySelector<HTMLElement>(".ys-landing-pill-beam");
  if (!pill || !beam) return () => undefined;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cycleDuration = 4000;
  let frame = 0;
  let visible = false;
  let phaseStart = performance.now();

  const pointOnRail = (progress: number, width: number, height: number) => {
    const phase = ((progress % 1) + 1) % 1;
    const radius = Math.min(13, height / 2 - 1);
    const topY = radius;
    const bottomY = Math.max(radius, height - radius - 2);
    const leftX = radius;
    const rightX = Math.max(radius, width - radius);

    if (phase < 0.45) {
      const amount = phase / 0.45;
      return { x: leftX + (rightX - leftX) * amount, y: topY, angle: -80, segment: "top" };
    }
    if (phase < 0.5) {
      const amount = (phase - 0.45) / 0.05;
      return { x: rightX, y: topY + (bottomY - topY) * amount, angle: -80 + 180 * amount, segment: "right" };
    }
    if (phase < 0.95) {
      const amount = (phase - 0.5) / 0.45;
      return { x: rightX - (rightX - leftX) * amount, y: bottomY, angle: 100, segment: "bottom" };
    }
    const amount = (phase - 0.95) / 0.05;
    return { x: leftX, y: bottomY - (bottomY - topY) * amount, angle: 100 + 180 * amount, segment: "left" };
  };

  const render = (now: number) => {
    const bounds = pill.getBoundingClientRect();
    const progress = ((now - phaseStart) % cycleDuration) / cycleDuration;
    const point = pointOnRail(progress, bounds.width, bounds.height);
    beam.style.setProperty("--beam-x", `${point.x.toFixed(2)}px`);
    beam.style.setProperty("--beam-y", `${point.y.toFixed(2)}px`);
    beam.style.setProperty("--beam-angle", `${point.angle.toFixed(2)}deg`);
    pill.dataset.beamPhase = progress.toFixed(4);
    pill.dataset.beamSegment = point.segment;
  };

  const loop = (now: number) => {
    render(now);
    frame = window.requestAnimationFrame(loop);
  };

  const sync = () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    if (!visible || document.hidden || shouldReduce(policy, reducedMotion.matches)) {
      pill.dataset.pillActive = "false";
      render(phaseStart + cycleDuration * 0.12);
      return;
    }
    pill.dataset.pillActive = "true";
    frame = window.requestAnimationFrame(loop);
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible) phaseStart = performance.now() - Number(pill.dataset.beamPhase || 0) * cycleDuration;
    sync();
  }, { threshold: 0.08 });
  const onResize = () => render(performance.now());

  observer.observe(pill);
  reducedMotion.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("resize", onResize, { passive: true });
  render(performance.now());
  sync();

  return () => {
    if (frame) window.cancelAnimationFrame(frame);
    observer.disconnect();
    reducedMotion.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", sync);
    window.removeEventListener("resize", onResize);
  };
}

function setupProductReframe(policy: MotionPolicy) {
  const runway = document.querySelector<HTMLElement>("[data-product-motion]");
  const product = runway?.querySelector<HTMLElement>(".ys-drone-system");
  if (!runway || !product) return () => undefined;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const resetVisibility = 0.1;
  const timelineMs = 1000;
  let transitionFrame = 0;
  let scrollFrame = 0;
  let finishTimer = 0;
  let run = 0;
  let state: ReframeState = "armed";
  let instantMode = false;
  let anchorOffset = 70;
  const readNav = () => document.querySelector<HTMLElement>(".VPNav")?.getBoundingClientRect();
  const syncStageGeometry = () => {
    const nav = readNav();
    const navBottom = nav?.bottom ?? 110;
    const runwayDocumentTop = runway.getBoundingClientRect().top + window.scrollY;
    anchorOffset = navBottom - runwayDocumentTop;
    runway.style.setProperty("--ys-motion-nav-bottom", `${navBottom.toFixed(2)}px`);
  };
  const readAnchorTop = () => {
    return runway.getBoundingClientRect().top + anchorOffset;
  };
  syncStageGeometry();
  let previousTop = readAnchorTop();

  const triggerTop = () => readNav()?.bottom ?? 110;
  const render = (progress: 0 | 1, nextState: ReframeState, settled: boolean) => {
    state = nextState;
    runway.style.setProperty("--product-reframe", String(progress));
    runway.style.setProperty("--product-satellites", String(progress));
    runway.dataset.motionState = nextState;
    runway.dataset.motionProgress = progress.toFixed(4);
    runway.dataset.motionSettled = settled ? "true" : "false";
  };
  const clearTransition = () => {
    if (transitionFrame) window.cancelAnimationFrame(transitionFrame);
    if (finishTimer) window.clearTimeout(finishTimer);
    transitionFrame = 0;
    finishTimer = 0;
  };
  const reset = () => {
    clearTransition();
    render(0, "armed", true);
  };
  const settleImmediately = () => {
    clearTransition();
    render(1, "settled", true);
  };
  const start = () => {
    if (instantMode || state !== "armed") return;
    clearTransition();
    run += 1;
    runway.dataset.motionRun = String(run);
    render(0, "playing", false);
    transitionFrame = window.requestAnimationFrame(() => {
      transitionFrame = 0;
      render(1, "playing", false);
      finishTimer = window.setTimeout(() => {
        finishTimer = 0;
        render(1, "settled", true);
      }, timelineMs);
    });
  };
  const syncMode = () => {
    syncStageGeometry();
    const nextInstant = window.innerWidth < 768 || shouldReduce(policy, reducedMotion.matches);
    runway.dataset.motionMode = window.innerWidth < 768 ? "compact" : nextInstant ? "reduced" : "position-trigger";
    if (nextInstant) settleImmediately();
    else if (instantMode) reset();
    instantMode = nextInstant;
    previousTop = readAnchorTop();
  };
  const checkPosition = () => {
    scrollFrame = 0;
    if (instantMode) return;
    const currentTop = readAnchorTop();
    const line = triggerTop();
    const crossedDown = previousTop >= line && currentTop < line;
    const crossedUp = previousTop < line && currentTop >= line;
    if (state === "armed" && crossedDown) start();
    else if (state !== "armed" && crossedUp) reset();
    previousTop = currentTop;
  };
  const onScroll = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(checkPosition);
  };
  const observer = new IntersectionObserver(([entry]) => {
    if (!instantMode && (entry?.intersectionRatio ?? 0) < resetVisibility && state !== "armed") reset();
  }, { threshold: [0, resetVisibility] });

  runway.dataset.motionRun = "0";
  reset();
  syncMode();
  observer.observe(product);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", syncMode, { passive: true });
  reducedMotion.addEventListener("change", syncMode);

  return () => {
    clearTransition();
    if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    observer.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", syncMode);
    reducedMotion.removeEventListener("change", syncMode);
  };
}

function cubicPoint(start: number, controlA: number, controlB: number, end: number, amount: number) {
  const inverse = 1 - amount;
  return inverse ** 3 * start + 3 * inverse ** 2 * amount * controlA + 3 * inverse * amount ** 2 * controlB + amount ** 3 * end;
}

function ellipsePoint(cx: number, cy: number, rx: number, ry: number, angle: number, tilt: number) {
  const x = Math.cos(angle) * rx;
  const y = Math.sin(angle) * ry;
  const cosine = Math.cos(tilt);
  const sine = Math.sin(tilt);
  return [cx + x * cosine - y * sine, cy + x * sine + y * cosine] as const;
}

function drawDot(context: CanvasRenderingContext2D, x: number, y: number, radius: number, alpha: number) {
  context.fillStyle = `rgba(249,250,252,${alpha * 0.08})`;
  context.beginPath();
  context.arc(x, y, radius * 4.5, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = `rgba(249,250,252,${alpha})`;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function drawContext(context: CanvasRenderingContext2D, width: number, height: number, cx: number, cy: number, now: number, alpha: number) {
  const radius = Math.min(width, height) * 0.43;
  for (let index = 0; index < 6; index += 1) {
    const rx = radius * (0.5 + index * 0.16);
    const ry = radius * (0.12 + index * 0.065);
    context.beginPath();
    context.ellipse(cx, cy - ry, rx, ry, 0, 0, Math.PI * 2);
    context.strokeStyle = `rgba(162,174,188,${alpha * (0.1 + index * 0.018)})`;
    context.lineWidth = index === 2 ? 0.9 : 0.65;
    context.stroke();
  }
  for (let index = 0; index < 14; index += 1) {
    const ratio = index / 13 * 2 - 1;
    const edge = Math.abs(ratio);
    const endX = cx + ratio * radius * 1.3;
    const endY = cy - radius * (0.38 + (1 - edge) * 0.48 + Math.sin(index * 1.7) * 0.06);
    const controlX1 = cx + ratio * radius * 0.18;
    const controlY1 = cy - radius * 0.16;
    const controlX2 = cx + ratio * radius * 0.7;
    const controlY2 = endY + radius * 0.16;
    context.beginPath();
    context.moveTo(cx, cy);
    context.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    context.strokeStyle = `rgba(162,174,188,${alpha * (0.13 + (1 - edge) * 0.15)})`;
    context.lineWidth = 0.75;
    context.stroke();
    if (index % 3 === 0) {
      const travel = 1 - ((now * 0.000085 + index * 0.13) % 1);
      drawDot(context, cubicPoint(cx, controlX1, controlX2, endX, travel), cubicPoint(cy, controlY1, controlY2, endY, travel), 1.35, alpha * Math.sin(Math.PI * travel));
    }
  }
  context.beginPath();
  context.moveTo(cx, cy);
  context.lineTo(cx, cy + radius * 0.95);
  context.strokeStyle = `rgba(162,174,188,${alpha * 0.24})`;
  context.lineWidth = 0.8;
  context.stroke();
  drawDot(context, cx, cy, 2.5, alpha * 0.86);
}

function drawDecisions(context: CanvasRenderingContext2D, width: number, height: number, cx: number, cy: number, now: number, alpha: number) {
  const radius = Math.min(width, height) * 0.38;
  for (let index = 1; index <= 5; index += 1) {
    const pulse = 1 + Math.sin(now * 0.0011 + index * 0.7) * 0.006;
    context.beginPath();
    context.arc(cx, cy, radius * index / 5 * pulse, 0, Math.PI * 2);
    context.strokeStyle = `rgba(166,177,190,${alpha * (index === 3 ? 0.29 : 0.17)})`;
    context.lineWidth = index === 3 ? 1 : 0.7;
    context.stroke();
  }
  for (let index = 0; index < 24; index += 1) {
    const angle = index / 24 * Math.PI * 2;
    const tick = index % 6 === 0 ? 7 : 3;
    context.beginPath();
    context.moveTo(cx + Math.cos(angle) * (radius - tick), cy + Math.sin(angle) * (radius - tick));
    context.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    context.strokeStyle = `rgba(181,191,202,${alpha * (index % 6 === 0 ? 0.2 : 0.1)})`;
    context.lineWidth = 0.65;
    context.stroke();
  }
  const sweep = now * 0.00042;
  context.beginPath();
  context.arc(cx, cy, radius * 0.6, sweep, sweep + Math.PI * 0.46);
  context.strokeStyle = `rgba(234,238,243,${alpha * 0.48})`;
  context.lineWidth = 1.15;
  context.stroke();
  drawDot(context, cx, cy, 3.8, alpha);
  drawDot(context, cx, cy - radius + ((now * 0.035) % (radius * 2)), 1.25, alpha * 0.9);
}

function drawEvidence(context: CanvasRenderingContext2D, width: number, height: number, cx: number, cy: number, now: number, alpha: number) {
  const radius = Math.min(width, height) * 0.38;
  for (let index = 0; index < 5; index += 1) {
    const tilt = -0.34 + index * 0.055;
    const rx = radius * (0.48 + index * 0.14);
    const ry = radius * (0.21 + index * 0.065);
    const arcStart = now * (0.00012 + index * 0.000018) + index * 1.37;
    context.save();
    context.translate(cx, cy);
    context.rotate(tilt);
    context.beginPath();
    context.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    context.strokeStyle = `rgba(166,177,190,${alpha * (0.15 + index * 0.022)})`;
    context.lineWidth = 0.72;
    context.stroke();
    context.beginPath();
    context.ellipse(0, 0, rx, ry, 0, arcStart, arcStart + 0.58);
    context.strokeStyle = `rgba(229,234,240,${alpha * (0.26 + index * 0.035)})`;
    context.lineWidth = 1.05;
    context.stroke();
    context.restore();
    const [x, y] = ellipsePoint(cx, cy, rx, ry, arcStart + 0.58, tilt);
    drawDot(context, x, y, index === 2 ? 1.9 : 1.25, alpha * (0.62 + index * 0.07));
  }
  drawDot(context, cx, cy, 2.4, alpha * 0.82);
}

function setupSignal(policy: MotionPolicy) {
  const section = sectionRef.value;
  const canvas = canvasRef.value;
  const context = canvas?.getContext("2d");
  if (!section || !canvas || !context) return () => undefined;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const requestedStage = new URLSearchParams(window.location.search).get("signalStage");
  const forcedStage = stages.findIndex((stage) => stage.id === requestedStage);
  let frame = 0;
  let visible = false;
  let width = 1;
  let height = 1;
  let pixelRatio = 1;
  let cycleStart = performance.now();
  let pausedAt: number | null = performance.now();
  let staticStage = 2;
  let reduced = shouldReduce(policy, reducedMotion.matches);

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.floor(bounds.width));
    const nextHeight = Math.max(1, Math.floor(bounds.height));
    const nextRatio = Math.min(window.devicePixelRatio || 1, 1.25);
    if (nextWidth === width && nextHeight === height && nextRatio === pixelRatio) return;
    width = nextWidth;
    height = nextHeight;
    pixelRatio = nextRatio;
    canvas.width = Math.max(1, Math.floor(width * pixelRatio));
    canvas.height = Math.max(1, Math.floor(height * pixelRatio));
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };
  const draw = (now: number) => {
    context.clearRect(0, 0, width, height);
    const elapsed = forcedStage >= 0
      ? forcedStage * stageMs + 2800
      : reduced
        ? staticStage * stageMs + 2800
        : ((now - cycleStart) % cycleMs + cycleMs) % cycleMs;
    const position = elapsed / stageMs;
    const stage = Math.floor(position) % stages.length;
    const within = position - Math.floor(position);
    const mix = within > 0.86 ? smoothstep(0.86, 1, within) : 0;
    const next = mix > 0 ? (stage + 1) % stages.length : stage;
    const displayed = mix >= 0.5 ? next : stage;
    activeStage.value = displayed;
    section.dataset.motionPhase = stages[displayed].id;
    section.dataset.motionTransition = mix > 0 ? `${stages[stage].id}-${stages[next].id}` : "settled";
    section.style.setProperty("--signal-progress", reduced ? "1" : within.toFixed(4));
    const cx = width * 0.53;
    const cy = height * 0.53;
    const paint = (index: number, alpha: number) => {
      if (index === 0) drawContext(context, width, height, cx, cy, now, alpha);
      else if (index === 1) drawDecisions(context, width, height, cx, cy, now, alpha);
      else drawEvidence(context, width, height, cx, cy, now, alpha);
    };
    paint(stage, 1 - mix);
    if (next !== stage) paint(next, mix);
  };
  const stop = () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    canvas.dataset.animationActive = "false";
    section.dataset.animationActive = "false";
  };
  const pause = (now: number) => {
    if (pausedAt === null) pausedAt = now;
  };
  const resume = (now: number) => {
    if (pausedAt === null) return;
    cycleStart += now - pausedAt;
    pausedAt = null;
  };
  const loop = (now: number) => {
    frame = window.requestAnimationFrame(loop);
    draw(now);
  };
  const sync = () => {
    reduced = shouldReduce(policy, reducedMotion.matches);
    signalMode.value = reduced ? "static" : "autoplay";
    section.dataset.motionMode = signalMode.value;
    const now = performance.now();
    if (!visible || reduced || document.hidden || forcedStage >= 0) {
      if (forcedStage < 0) pause(now);
      stop();
      draw(now);
      return;
    }
    resume(now);
    if (!frame) {
      canvas.dataset.animationActive = "true";
      section.dataset.animationActive = "true";
      frame = window.requestAnimationFrame(loop);
    }
  };
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    sync();
  }, { threshold: 0.04 });
  const resizeObserver = new ResizeObserver(() => {
    resize();
    draw(performance.now());
  });
  const onResize = () => {
    resize();
    draw(performance.now());
  };

  visibilityObserver.observe(section);
  resizeObserver.observe(canvas);
  reducedMotion.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("resize", onResize, { passive: true });
  resize();
  sync();
  draw(performance.now());

  (section as HTMLElement & { selectSignalStage?: (index: number) => void }).selectSignalStage = (index: number) => {
    const now = performance.now();
    if (reduced) staticStage = index;
    else {
      cycleStart = now - index * stageMs;
      if (pausedAt !== null) pausedAt = now;
    }
    activeStage.value = index;
    draw(now);
  };

  return () => {
    stop();
    visibilityObserver.disconnect();
    resizeObserver.disconnect();
    reducedMotion.removeEventListener("change", sync);
    document.removeEventListener("visibilitychange", sync);
    window.removeEventListener("resize", onResize);
    delete (section as HTMLElement & { selectSignalStage?: (index: number) => void }).selectSignalStage;
  };
}

function selectStage(index: number) {
  sectionRef.value?.selectSignalStage?.(index);
}

onMounted(() => {
  motionPolicy.value = readMotionPolicy();
  document.querySelector<HTMLElement>(".ys-home-content")?.setAttribute("data-motion-policy", motionPolicy.value);
  cleanups.push(setupPill(motionPolicy.value));
  cleanups.push(setupProductReframe(motionPolicy.value));
  cleanups.push(setupSignal(motionPolicy.value));
});

onBeforeUnmount(() => {
  while (cleanups.length) cleanups.pop()?.();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="ys-signal-story"
    aria-labelledby="ys-signal-title"
    :data-motion-policy="motionPolicy"
    :data-motion-mode="signalMode"
    data-animation-active="false"
  >
    <div class="ys-signal-inner">
      <div class="ys-signal-copy">
        <p class="ys-signal-kicker">ONE SYSTEM · THREE STATES</p>
        <h2 id="ys-signal-title">公开系统，应该能看见<br><span>它如何被证明。</span></h2>
        <a href="/engineering/">查看工程方法 →</a>
        <div class="ys-signal-tabs" aria-label="公开证据阶段">
          <button
            v-for="(stage, index) in stages"
            :key="stage.id"
            type="button"
            :class="{ 'is-active': activeStage === index }"
            :aria-pressed="activeStage === index"
            @click="selectStage(index)"
          >
            <strong>{{ stage.label }}</strong>
            <p>{{ stage.note }}</p>
            <i aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="ys-signal-canvas-wrap">
        <canvas ref="canvasRef" role="img" aria-label="Y-Serein Context、Decisions 与 Evidence 三态信号图"></canvas>
      </div>
    </div>
  </section>
</template>
