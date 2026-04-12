import { ref, onMounted, onBeforeUnmount } from 'vue'

const COLORS = ['#f450a5', '#ffffff', '#d63d8f', '#832ba9', '#ffaadd']

export function useStarParticles() {
  const canvas = ref(null)
  let ctx = null
  let animFrame = null
  const particles = []

  function spawnParticles(x, y) {
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.5 + Math.random() * 2
      particles.push({
        x, y,
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

  function drawStar(x, y, size, rotation) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    ctx.beginPath()
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? size : size * 0.4
      const angle = (i * Math.PI) / 4
      i === 0
        ? ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
        : ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  function loop() {
    if (!canvas.value) return
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx; p.y += p.vy; p.vy += 0.05
      p.alpha -= 0.022; p.rotation += p.rotSpeed
      if (p.alpha <= 0) { particles.splice(i, 1); continue }
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = p.color
      if (p.isStar) {
        drawStar(p.x, p.y, p.size, p.rotation)
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
    canvas.value.width = canvas.value.parentElement.offsetWidth
    canvas.value.height = canvas.value.parentElement.offsetHeight
  }

  function onMouseMove(e) {
    const rect = canvas.value.parentElement.getBoundingClientRect()
    spawnParticles(e.clientX - rect.left, e.clientY - rect.top)
  }

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

  return { canvas, onMouseMove }
}
