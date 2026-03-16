<template>
  <div id="navbar" :style="{ background: bgColor }">
    <a href="#header" class="brand">Perfecta Combinacion</a>
    <nav>
      <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
    </nav>
  </div>
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

function onScroll() {
  const hero = document.getElementById('header')
  if (!hero) return
  const heroHeight = hero.offsetHeight
  const progress = Math.min(window.scrollY / heroHeight, 1)
  bgColor.value = `rgba(17,17,17,${(progress * 0.95).toFixed(3)})`
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
