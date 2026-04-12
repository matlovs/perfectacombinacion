<template>
  <div id="app-root">
    <NavBar />
    <HeroSection />
    <AnnouncementSection />
    <CoursesSection />
    <CtaSection />
    <TeachersSection />
    <LocationsSection />
    <GallerySection />
    <ContactSection />
    <FooterSection />
    <CookieBanner />
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import { useCookieConsent } from './composables/useCookieConsent.js'

const AnnouncementSection = defineAsyncComponent(() => import('./components/AnnouncementSection.vue'))
const CoursesSection      = defineAsyncComponent(() => import('./components/CoursesSection.vue'))
const CtaSection          = defineAsyncComponent(() => import('./components/CtaSection.vue'))
const TeachersSection     = defineAsyncComponent(() => import('./components/TeachersSection.vue'))
const LocationsSection    = defineAsyncComponent(() => import('./components/LocationsSection.vue'))
const GallerySection      = defineAsyncComponent(() => import('./components/GallerySection.vue'))
const ContactSection      = defineAsyncComponent(() => import('./components/ContactSection.vue'))
const FooterSection       = defineAsyncComponent(() => import('./components/FooterSection.vue'))
const CookieBanner        = defineAsyncComponent(() => import('./components/CookieBanner.vue'))

const { loadSavedConsent } = useCookieConsent()

onMounted(() => {
  loadSavedConsent()
})
</script>
