<template>
  <section id="header" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <canvas ref="canvas" class="stars-canvas"></canvas>
    <div class="inner">
      <div class="logo">
        <img
          src="/images/logo_dark-300x105.png"
          alt="Perfecta Combinacion"
        />
      </div>
<div class="actions">
        <a href="#two" class="button primary">Scopri i corsi</a>
        <a
          href="https://perfectacombinacion.it/wp-content/uploads/2025/07/VOLANTINO-STAGIONE-2025-2026.pdf"
          target="_blank"
          rel="noopener"
          class="button outline"
        >
          <i class="fa fa-download"></i> Volantino 25/26
        </a>
      </div>
    </div>
    <div class="scroll-indicator">
      <i class="fa fa-chevron-down"></i>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
let ctx = null
let animFrame = null
const particles = []

const COLORS = ['#f450a5', '#ffffff', '#d63d8f', '#832ba9', '#ffaadd']

function spawnParticles(x, y) {
  const count = 3
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 0.5 + Math.random() * 2
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      size: 2 + Math.random() * 4,
      alpha: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      isStar: Math.random() > 0.4,
    })
  }
}

function drawStar(ctx, x, y, size, rotation) {
  const points = 4
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.beginPath()
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? size : size * 0.4
    const angle = (i * Math.PI) / points
    i === 0 ? ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
             : ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function loop() {
  if (!canvas.value) return
  const c = canvas.value
  ctx.clearRect(0, 0, c.width, c.height)

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.vy += 0.05
    p.alpha -= 0.022
    p.rotation += p.rotSpeed

    if (p.alpha <= 0) { particles.splice(i, 1); continue }

    ctx.globalAlpha = p.alpha
    ctx.fillStyle = p.color

    if (p.isStar) {
      drawStar(ctx, p.x, p.y, p.size, p.rotation)
    } else {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  ctx.globalAlpha = 1
  animFrame = requestAnimationFrame(loop)
}

function resize() {
  if (!canvas.value) return
  const section = canvas.value.parentElement
  canvas.value.width = section.offsetWidth
  canvas.value.height = section.offsetHeight
}

function onMouseMove(e) {
  const rect = canvas.value.parentElement.getBoundingClientRect()
  spawnParticles(e.clientX - rect.left, e.clientY - rect.top)
}

function onMouseLeave() {}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  loop()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
.stars-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}
</style>
