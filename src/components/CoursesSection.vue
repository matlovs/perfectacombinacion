<template>
  <section id="two">
    <div class="inner">
      <div class="section-header">
        <h2>I nostri corsi</h2>
        <p>Dalle danze caraibiche al fitness, c'è il corso giusto per te. Prima lezione gratuita!</p>
      </div>

      <transition-group
        tag="div"
        class="courses-grid"
        :class="{ 'is-expanded': isExpanded }"
        name="card"
      >
        <div
          v-for="cat in sortedCategories"
          :key="cat.name"
          class="card-wrap"
          :class="{
            'card-wrap--active': selectedCategory === cat.name,
            'card-wrap--fading': selectedCategory && selectedCategory !== cat.name
          }"
        >
          <div
            class="course-card"
            @click="!selectedCategory && selectCategory(cat.name)"
          >
            <button
              v-if="selectedCategory === cat.name"
              class="close-btn"
              @click.stop="closeExpanded"
              aria-label="Chiudi"
            >
              <i class="fas fa-times"></i>
            </button>

            <div class="card-body">
              <div class="icon"><i :class="cat.icon"></i></div>
              <h3>{{ cat.name }}</h3>
              <p>{{ cat.description }}</p>
            </div>

            <transition name="slide-down">
              <div v-if="isExpanded && selectedCategory === cat.name" class="card-expansion">
                <div class="course-selector">
                  <button
                    v-for="item in filteredCourses"
                    :key="item.corso"
                    class="course-btn"
                    :class="{ active: selectedCorso === item.corso }"
                    @click.stop="selectedCorso = item.corso"
                  >
                    {{ item.corso }}
                  </button>
                </div>

                <transition name="fade" mode="out-in">
                  <div v-if="selectedSchedule" :key="selectedCorso">
                    <p v-if="selectedSchedule.sottotitolo" class="schedule-subtitle">
                      {{ selectedSchedule.sottotitolo }}
                    </p>
                    <div class="schedule-grid">
                      <div class="schedule-card" v-for="(slots, giorno) in groupedByDay" :key="giorno">
                        <div class="schedule-card-top">
                          <span class="giorno">{{ giorno }}</span>
                        </div>
                        <div class="schedule-slot" v-for="(slot, i) in slots" :key="i">
                          <span class="orario">{{ slot.orario }}</span>
                          <a class="slot-location" :href="mapsUrl(slot)" target="_blank" rel="noopener">
                            <span class="citta"><i class="fas fa-map-marker-alt"></i> {{ slot.città }}</span>
                            <span class="sede">{{ slot.sede }}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p v-else class="schedule-hint">Seleziona un corso per vedere giorni, sedi e orari.</p>
                </transition>
              </div>
            </transition>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import schedule from '../data/schedule.json'

const DAY_ORDER = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica']

const categories = [
  { name: 'Area Latina',            icon: 'fas fa-fire',    description: 'Salsa, Bachata e ritmi caraibici dal livello base all\'avanzato.' },
  { name: 'Tango Argentino',        icon: 'fas fa-heart',   description: 'Eleganza e passione con il Maestro Alessandro Antonucci.' },
  { name: 'Liscio e Ballo da Sala', icon: 'fas fa-music',   description: 'Valzer, liscio e ballo da sala per tutti i livelli.' },
  { name: 'Balli di Gruppo',        icon: 'fas fa-users',   description: 'Country Line Dance, Boogie Woogie e balli di gruppo.' },
  { name: 'Fitness e Aeree',        icon: 'fas fa-dumbbell',description: 'Zumba, Pilates, Yoga, Pole Dance e discipline aeree.' },
  { name: 'Bambini e Ragazzi',      icon: 'fas fa-child',   description: 'Corsi dedicati ai più giovani, dai 3 ai 16 anni.' },
]

const selectedCategory = ref(null)
const selectedCorso    = ref(null)
const isExpanded       = ref(false)

const sortedCategories = computed(() => {
  if (!selectedCategory.value) return categories
  const active = categories.find(c => c.name === selectedCategory.value)
  const others = categories.filter(c => c.name !== selectedCategory.value)
  return [active, ...others]
})

const filteredCourses = computed(() =>
  schedule.filter(s => s.categoria === selectedCategory.value)
)
const selectedSchedule = computed(() =>
  schedule.find(s => s.corso === selectedCorso.value) ?? null
)
const groupedByDay = computed(() => {
  if (!selectedSchedule.value) return {}
  const groups = {}
  for (const l of selectedSchedule.value.lezioni) {
    if (!groups[l.giorno]) groups[l.giorno] = []
    groups[l.giorno].push({ orario: l.orario, città: l.città, sede: l.sede })
  }
  return Object.fromEntries(
    DAY_ORDER.filter(d => groups[d]).map(d => [d, groups[d]])
  )
})

function selectCategory(name) {
  selectedCategory.value = name
  selectedCorso.value = null
  isExpanded.value = true
  nextTick(() => {
    document.getElementById('two')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function closeExpanded() {
  isExpanded.value = false
  selectedCorso.value = null
  setTimeout(() => { selectedCategory.value = null }, 500)
}

function mapsUrl(slot) {
  const query = encodeURIComponent(`${slot.sede}, ${slot.città}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
</script>

<style scoped>
/* FLIP: transition-group move animation */
.card-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Wrapper: gestisce SOLO il layout (flex-basis + margin) */
.card-wrap {
  flex: 1 1 calc(33.333% - 1.5rem);
  min-width: 0;
  overflow: hidden;
  margin: 0.75rem;
  transition: flex-basis 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              flex-grow   0.5s cubic-bezier(0.4, 0, 0.2, 1),
              margin      0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: flex-basis, margin;
}

.card-wrap--fading {
  flex: 0 0 0% !important;
  flex-grow: 0 !important;
  margin: 0 !important;
  max-height: 0 !important;
}

.courses-grid.is-expanded .card-wrap--active {
  flex: 1 1 100% !important;
}

/* Card interna: gestisce SOLO il visuale (opacity, transform) */
.course-card {
  height: 100%;
  min-height: 170px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: opacity 0.35s ease,
              transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}

.card-wrap--fading .course-card {
  opacity: 0;
  transform: scale(0.88);
}

.card-wrap--active .course-card {
  cursor: default;
}

/* Pulsante chiudi */
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent;
  color: rgba(255,255,255,0.5);
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
  z-index: 1;
}
.close-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

/* Espansione interna */
.card-expansion {
  margin-top: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  width: 100%;
}

/* Transizione contenuto espanso */
.slide-down-enter-active {
  transition: opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s;
}
.slide-down-leave-active {
  transition: opacity 0.15s ease;
}
.slide-down-enter-from { opacity: 0; transform: translateY(-8px); }
.slide-down-leave-to   { opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.slot-location {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  transition: opacity 0.2s ease;
}

.slot-location:hover {
  opacity: 0.75;
}
</style>
