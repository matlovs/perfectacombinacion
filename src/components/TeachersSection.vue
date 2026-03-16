<template>
  <section id="teachers">
    <div class="inner">
      <div class="section-header">
        <h2>I nostri insegnanti</h2>
        <p>Professionisti appassionati pronti a guidarti passo dopo passo.</p>
      </div>

      <div class="teachers-slider">
        <button class="slider-arrow left" @click="prev" :disabled="offset === 0">
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="slider-viewport">
          <div class="slider-track" :style="{ transform: `translateX(calc(-${offset} * (100% / ${visible})))` }">
            <div class="teacher-card" v-for="(teacher, idx) in teachers" :key="teacher.name" :class="{ center: idx === offset + Math.floor(visible / 2) }">
              <div class="teacher-photo" @click="teacher.photo && openLightbox(teacher)">
                <img v-if="teacher.photo" :src="teacher.photo" :alt="teacher.name" />
                <div v-else class="photo-placeholder">
                  <i class="fas fa-user"></i>
                </div>
                <div class="photo-overlay" v-if="teacher.photo">
                  <i class="fas fa-expand"></i>
                </div>
              </div>
              <div class="teacher-info">
                <h3>{{ teacher.name }}</h3>
                <div class="teacher-tags">
                  <span class="tag" v-for="area in teacher.areas" :key="area">{{ area }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="slider-arrow right" @click="next" :disabled="offset >= teachers.length - visible">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <div class="slider-dots">
        <span
          v-for="dot in dotCount"
          :key="dot"
          class="dot"
          :class="{ active: activeDot === dot }"
          @click="goToDot(dot)"
        ></span>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div v-if="lightbox" class="lightbox-overlay" @click.self="closeLightbox">
      <span class="lightbox-close" @click="closeLightbox">
        <i class="fas fa-times"></i>
      </span>
      <div class="lightbox-content">
        <img :src="lightbox.photo" :alt="lightbox.name" />
        <div class="lightbox-info">
          <h3>{{ lightbox.name }}</h3>
          <div class="teacher-tags">
            <span class="tag" v-for="area in lightbox.areas" :key="area">{{ area }}</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVisible } from '../composables/useVisible.js'
import teachers from '../data/teachers.json'

const visible = useVisible()
const offset = ref(0)

function prev() {
  if (offset.value > 0) offset.value--
}

function next() {
  if (offset.value < teachers.length - visible.value) offset.value++
}

const dotCount = computed(() => teachers.length)
const activeDot = computed(() => offset.value + Math.floor(visible.value / 2) + 1)

function goToDot(dot) {
  offset.value = Math.min(dot - 1, teachers.length - visible.value)
}

const lightbox = ref(null)

function openLightbox(teacher) {
  lightbox.value = teacher
}

function closeLightbox() {
  lightbox.value = null
}
</script>

<style scoped>
.teachers-slider {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slider-viewport {
  flex: 1;
  overflow: hidden;
}

.slider-track {
  display: flex;
  align-items: flex-start;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.teacher-card {
  flex: 0 0 calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.5rem 2rem;
}

@media (max-width: 900px) {
  .teacher-card { flex: 0 0 calc(100% / 2); }
}

@media (max-width: 640px) {
  .teachers-slider {
    position: relative;
  }
  .slider-arrow {
    position: absolute;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);
  }
  .slider-arrow.left { left: 0.25rem; }
  .slider-arrow.right { right: 0.25rem; }
  .teacher-card {
    flex: 0 0 100%;
    padding: 1rem 4rem 2rem;
  }
}

.teacher-photo {
  position: relative;
  width: 220px;
  max-width: 100%;
  aspect-ratio: 1;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--color-primary);
  box-shadow: 0 0 0 6px rgba(244, 80, 165, 0.15);
  transition: border-width 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}

.teacher-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  cursor: pointer;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
  color: #fff;
  font-size: 1.4rem;
}

.teacher-photo:hover .photo-overlay {
  opacity: 1;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  color: rgba(255,255,255,0.2);
}

.teacher-info {
  text-align: center;
}

.teacher-info h3 {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
}

.teacher-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
}

.teacher-tags .tag {
  background: rgba(244, 80, 165, 0.15);
  color: #f450a5;
  border: 1px solid rgba(244, 80, 165, 0.3);
  border-radius: 999px;
  padding: 0.25rem 0.85rem;
  font-size: 0.78rem;
  font-weight: 600;
}

.slider-arrow {
  flex-shrink: 0;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  color: #fff;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.slider-arrow:hover:not(:disabled) {
  background: rgba(255,255,255,0.15);
}

.slider-arrow:disabled {
  opacity: 0.25;
  cursor: default;
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 2rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.dot.active {
  background: var(--color-primary);
  transform: scale(1.3);
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.lightbox-close:hover {
  opacity: 1;
}

.lightbox-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.lightbox-content img {
  max-height: 70vh;
  max-width: 90vw;
  border-radius: 50%;
  border: 5px solid var(--color-primary);
  box-shadow: 0 0 0 8px rgba(244, 80, 165, 0.2);
  object-fit: cover;
}

.lightbox-info {
  text-align: center;
}

.lightbox-info h3 {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}
</style>
