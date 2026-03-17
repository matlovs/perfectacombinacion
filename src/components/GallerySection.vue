<template>
  <section id="four">
    <div class="inner">
      <div class="section-header">
        <h2>Galleria foto</h2>
        <p>Momenti indimenticabili dai nostri show ed eventi speciali.</p>
      </div>

      <div class="gallery-show" v-for="(show, showIdx) in shows" :key="show.title">
        <h3>{{ show.title }}</h3>

        <div class="slider-wrapper">
          <!-- Freccia sinistra -->
          <button
            class="slider-arrow left"
            @click="prev(showIdx)"
            :disabled="offsets[showIdx] === 0"
          >
            <i class="fas fa-chevron-left"></i>
          </button>

          <!-- Finestra slide -->
          <div class="slider-viewport"
            @touchstart.passive="onTouchStart($event, showIdx)"
            @touchend.passive="onTouchEnd($event, showIdx, show.images.length)"
          >
            <div
              class="slider-track"
              :style="{ transform: `translateX(calc(-${offsets[showIdx]} * (100% / ${visible})))` }"
            >
              <div
                class="slide-item"
                v-for="(img, idx) in show.images"
                :key="idx"
                :class="{ placeholder: !img.src, center: idx === offsets[showIdx] + Math.floor(visible / 2) }"
                @click="openLightbox(showIdx, idx)"
              >
                <img
                  v-if="img.src"
                  :src="img.src"
                  :alt="img.alt || show.title"
                  loading="lazy"
                  @error="onImgError($event)"
                />
                <div class="overlay"><i class="fas fa-expand"></i></div>
              </div>
            </div>
          </div>

          <!-- Freccia destra -->
          <button
            class="slider-arrow right"
            @click="next(showIdx, show.images.length)"
            :disabled="offsets[showIdx] >= show.images.length - visible"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <!-- Indicatori puntini -->
        <div class="slider-dots">
          <span
            v-for="dot in dotCount(show.images.length)"
            :key="dot"
            class="dot"
            :class="{ active: activeDot(showIdx) === dot }"
            @click="goToDot(showIdx, dot, show.images.length)"
          ></span>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxImage"
        class="lightbox-overlay"
        @click.self="closeLightbox"
        @touchstart.passive="onLightboxTouchStart"
        @touchend.passive="onLightboxTouchEnd"
      >
        <span class="lightbox-close" @click="closeLightbox">
          <i class="fas fa-times"></i>
        </span>
        <button class="lightbox-arrow left" @click="lightboxPrev" :disabled="lightboxIdx === 0">
          <i class="fas fa-chevron-left"></i>
        </button>
        <img :src="lightboxImage.src" :alt="lightboxImage.alt" />
        <button class="lightbox-arrow right" @click="lightboxNext" :disabled="lightboxIdx === shows[lightboxShowIdx].images.length - 1">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useVisible } from '../composables/useVisible.js'

const visible = useVisible()

// Un offset per ogni show
const offsets = ref([0, 0])

function prev(showIdx) {
  if (offsets.value[showIdx] > 0) offsets.value[showIdx]--
}

function next(showIdx, total) {
  if (offsets.value[showIdx] < total - visible.value) offsets.value[showIdx]++
}

function dotCount(total) {
  return Math.ceil(total / visible.value)
}

function activeDot(showIdx) {
  return Math.floor(offsets.value[showIdx] / visible.value) + 1
}

function goToDot(showIdx, dot, total) {
  const target = (dot - 1) * visible.value
  offsets.value[showIdx] = Math.min(target, total - visible.value)
}

// Lightbox
const lightboxImage = ref(null)
const lightboxShowIdx = ref(0)
const lightboxIdx = ref(0)

function openLightbox(showIdx, idx) {
  const img = shows[showIdx].images[idx]
  if (!img.src) return
  lightboxShowIdx.value = showIdx
  lightboxIdx.value = idx
  lightboxImage.value = img
}

function lightboxPrev() {
  if (lightboxIdx.value > 0) {
    lightboxIdx.value--
    lightboxImage.value = shows[lightboxShowIdx.value].images[lightboxIdx.value]
  }
}

function lightboxNext() {
  const total = shows[lightboxShowIdx.value].images.length
  if (lightboxIdx.value < total - 1) {
    lightboxIdx.value++
    lightboxImage.value = shows[lightboxShowIdx.value].images[lightboxIdx.value]
  }
}

function closeLightbox() {
  lightboxImage.value = null
}

function onKeydown(e) {
  if (!lightboxImage.value) return
  if (e.key === 'ArrowLeft') lightboxPrev()
  else if (e.key === 'ArrowRight') lightboxNext()
  else if (e.key === 'Escape') closeLightbox()
}

// Auto-scroll
const autoIntervals = []

function startAutoScroll() {
  shows.forEach((show, showIdx) => {
    const interval = setInterval(() => {
      if (lightboxImage.value) return
      if (offsets.value[showIdx] >= show.images.length - visible.value) {
        offsets.value[showIdx] = 0
      } else {
        offsets.value[showIdx]++
      }
    }, 3000)
    autoIntervals.push(interval)
  })
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  startAutoScroll()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  autoIntervals.forEach(clearInterval)
})

let touchStartX = 0
let lightboxTouchStartX = 0

function onLightboxTouchStart(e) {
  lightboxTouchStartX = e.touches[0].clientX
}

function onLightboxTouchEnd(e) {
  const diff = lightboxTouchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) < 40) return
  if (diff > 0) lightboxNext()
  else lightboxPrev()
}

function onTouchStart(e, showIdx) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e, showIdx, total) {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) < 40) return
  if (diff > 0) next(showIdx, total)
  else prev(showIdx)
}

function onImgError(event) {
  event.target.style.display = 'none'
  event.target.parentElement.classList.add('placeholder')
}

const shows = [
  {
    title: 'The Mask Show',
    images: [
      { src: '/images/gallery/mask-show/IMG_1658-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_0426xcfgb-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_2086-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_1565-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_1009-001-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_2578-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_2183-1-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_1109-ok-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_1920-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_0618-ok-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_2928-768x512.jpg', alt: 'The Mask Show' },
      { src: '/images/gallery/mask-show/IMG_2109-768x512.jpg', alt: 'The Mask Show' },
    ],
  },
  {
    title: 'Showcolate',
    images: [
      { src: '/images/gallery/showcolate/IMG_1462-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/IMG_0207-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/IMG_0524-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/Immagine-WhatsApp-2025-10-26-ore-18.12.57_b75df303-768x513.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/Immagine-WhatsApp-2025-10-26-ore-18.12.59_ff008b1d-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/Immagine-WhatsApp-2025-10-26-ore-18.13.00_a673dfa8-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/Immagine-WhatsApp-2025-10-26-ore-18.12.59_1c2b7538-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/Immagine-WhatsApp-2025-10-26-ore-18.13.00_e313d2ac-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/Immagine-WhatsApp-2025-10-26-ore-18.12.56_448bcce9-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/Immagine-WhatsApp-2025-10-26-ore-18.13.00_9157132d-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/Immagine-WhatsApp-2025-10-26-ore-18.13.01_15741dd5-768x512.jpg', alt: 'Showcolate' },
      { src: '/images/gallery/showcolate/group_background.jpg', alt: 'Showcolate' },
    ],
  },
]
</script>

<style scoped>
.slide-item {
  transition: transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease;
  transform: scale(0.94);
  opacity: 0.72;
  position: relative;
  z-index: 1;
}

.slide-item.center {
  transform: scale(1.06);
  opacity: 1;
  z-index: 0;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.4);
}
</style>
