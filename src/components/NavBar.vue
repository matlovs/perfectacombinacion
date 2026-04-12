<template>
  <header id="navbar" :style="{ background: bgColor }">
    <a href="#header" class="brand" aria-label="Torna all'inizio – Perfecta Combinación">Perfecta Combinacion</a>
    <nav aria-label="Navigazione principale">
      <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const links = [
  { href: '#two', label: 'Corsi' },
  { href: '#three', label: 'Sedi' },
  { href: '#four', label: 'Gallery' },
  { href: '#contact', label: 'Contatti' },
]

const bgColor = ref('rgba(17,17,17,0)')

let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const hero = document.getElementById('header')
    if (hero) {
      const progress = Math.min(window.scrollY / hero.offsetHeight, 1)
      bgColor.value = `rgba(17,17,17,${progress * 0.95})`
    }
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
