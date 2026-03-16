<template>
  <section id="schedule">
    <div class="inner">
      <div class="section-header">
        <h2>Trova il tuo corso</h2>
        <p>Scegli il corso che ti interessa e scopri dove e quando puoi praticarlo.</p>
      </div>

      <!-- Filtro categorie -->
      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat"
          class="cat-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Selettore corso -->
      <div class="course-selector">
        <button
          v-for="item in filteredCourses"
          :key="item.corso"
          class="course-btn"
          :class="{ active: selectedCorso === item.corso }"
          @click="selectedCorso = item.corso"
        >
          {{ item.corso }}
        </button>
      </div>

      <!-- Risultati -->
      <transition name="fade" mode="out-in">
        <div v-if="selectedSchedule" :key="selectedCorso" class="schedule-results">
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
                <div class="slot-location">
                  <span class="citta"><i class="fas fa-map-marker-alt"></i> {{ slot.città }}</span>
                  <span class="sede">{{ slot.sede }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="schedule-hint">Seleziona un corso per vedere giorni, sedi e orari.</p>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import schedule from '../data/schedule.json'

const categories = [...new Set(schedule.map(s => s.categoria))]
const selectedCategory = ref(categories[0])
const selectedCorso = ref(null)

const DAY_ORDER = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica']

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

function selectCategory(cat) {
  selectedCategory.value = cat
  selectedCorso.value = null
}
</script>

<style scoped>
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.cat-btn {
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.25);
  background: transparent;
  color: rgba(255,255,255,0.55);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.cat-btn:hover {
  border-color: rgba(255,255,255,0.5);
  color: #fff;
}

.cat-btn.active {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.5);
  color: #fff;
}

.course-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  min-height: 2.5rem;
}

.course-btn {
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  border: 2px solid rgba(255,255,255,0.15);
  background: transparent;
  color: rgba(255,255,255,0.65);
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.course-btn:hover {
  border-color: rgba(255,255,255,0.4);
  color: #fff;
}

.course-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.schedule-subtitle {
  text-align: center;
  color: rgba(255,255,255,0.5);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.schedule-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.schedule-card-top {
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.giorno {
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.schedule-slot {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.schedule-slot:last-child {
  border-bottom: none;
}

.orario {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.03em;
}

.slot-location {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.citta {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.35);
}

.citta i {
  margin-right: 0.3rem;
}

.sede {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.75);
  font-weight: 500;
}

.schedule-hint {
  text-align: center;
  color: rgba(255,255,255,0.35);
  font-size: 0.95rem;
  padding: 2rem 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
