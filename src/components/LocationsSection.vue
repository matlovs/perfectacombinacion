<template>
  <section id="three">
    <div class="inner">
      <div class="section-header">
        <h2>Le nostre sedi</h2>
        <p>Trovi i nostri corsi in diverse location a Legnano e Busto Arsizio. Scegli quella più vicina a te!</p>
      </div>
      <div class="locations-grid">
        <a
          class="location-card"
          v-for="loc in locations"
          :key="loc.address"
          :href="loc.mapsUrl"
          target="_blank"
          rel="noopener"
        >
          <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
          <div class="info">
            <div class="city">{{ loc.city }}</div>
            <h3>{{ loc.address }}</h3>
            <p v-html="loc.name || '&nbsp;'"></p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const locations = [
  {
    city: 'Legnano',
    address: 'Via P. Picasso 25',
    name: '',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+P.+Picasso+25,+Legnano',
  },
  {
    city: 'Legnano',
    address: 'Via S. Quasimodo 18',
    name: 'Sporting Club',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+S.+Quasimodo+18,+Legnano',
  },
  {
    city: 'Legnano',
    address: 'Via S. Bernardino 25',
    name: 'Attitude Danza',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+S.+Bernardino+25,+Legnano',
  },
  {
    city: 'Busto Arsizio',
    address: 'Via Del Bosco 41',
    name: '',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Del+Bosco+41,+Busto+Arsizio',
  },
  {
    city: 'Busto Arsizio',
    address: 'Via Don Albertario 10',
    name: 'Oratorio San Filippo',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Don+Albertario+10,+Busto+Arsizio',
  },
]
</script>
