<template>
  <section id="contact">
    <div class="inner">
      <div class="section-header">
        <h2>Contattaci</h2>
        <p>Siamo a tua disposizione per informazioni, preventivi e prenotazioni. Scrivici o chiamaci direttamente.</p>
      </div>
      <div class="contact-grid">
        <div class="contact-item" v-for="item in contacts" :key="item.label">
          <div class="icon"><i :class="item.icon"></i></div>
          <h3>{{ item.label }}</h3>
          <p v-if="!item.links">{{ item.value }}</p>
          <div v-else class="contact-links">
            <a
              v-for="link in item.links"
              :key="link.href"
              :href="link.href"
              class="contact-link"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener' : undefined"
            >
              <i v-if="link.icon" :class="link.icon"></i>
              {{ link.text }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const contacts = [
  {
    icon: 'fas fa-phone',
    label: 'Telefono',
    links: [
      { href: 'tel:+393347448085', text: 'Mimmo: +39 334 744 8085' },
      { href: 'tel:+393807597037', text: 'Diego: +39 380 759 7037' },
    ],
  },
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    links: [
      { href: 'mailto:info@perfectacombinacion.it', text: 'info@perfectacombinacion.it' },
    ],
  },
  {
    icon: 'fas fa-share-alt',
    label: 'Social',
    links: [
      { href: 'https://www.facebook.com/perfectacombinacion', text: 'Facebook', icon: 'fab fa-facebook-f', external: true },
      { href: 'https://www.instagram.com/perfectacombinacion', text: 'Instagram', icon: 'fab fa-instagram', external: true },
    ],
  },
]
</script>
