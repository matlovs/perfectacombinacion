<template>
  <section id="header" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <canvas ref="canvas" class="stars-canvas"></canvas>
    <div class="inner">
      <div class="logo">
        <h1 class="sr-only">Perfecta Combinación – Scuola di Ballo a Legnano e Busto Arsizio</h1>
        <img
          src="/images/logo_dark-300x105.png"
          alt="Perfecta Combinación"
          fetchpriority="high"
          decoding="async"
        />
      </div>
<div class="actions">
        <a href="#two" class="button primary">Scopri i corsi</a>
        <a
          href="/docs/VOLANTINO-STAGIONE-2025-2026.pdf"
          target="_blank"
          rel="noopener"
          class="button outline"
        >
          Volantino 25/26
        </a>
      </div>
    </div>
    <div class="scroll-indicator">
      <i class="fa fa-chevron-down"></i>
    </div>
  </section>
</template>

<script setup>
import { useStarParticles } from '../composables/useStarParticles.js'

const { canvas, onMouseMove } = useStarParticles()
</script>

<style scoped>
.stars-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}
</style>
