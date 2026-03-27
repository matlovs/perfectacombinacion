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
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AnnouncementSection from './components/AnnouncementSection.vue'
import CoursesSection from './components/CoursesSection.vue'
import LocationsSection from './components/LocationsSection.vue'
import TeachersSection from './components/TeachersSection.vue'
import GallerySection from './components/GallerySection.vue'
import CtaSection from './components/CtaSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import CookieBanner from './components/CookieBanner.vue'
import { useCookieConsent } from './composables/useCookieConsent.js'

const { loadSavedConsent } = useCookieConsent()

onMounted(() => {
  loadSavedConsent()
})
</script>
