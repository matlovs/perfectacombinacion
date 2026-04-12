<template>
  <footer id="footer" @mousemove="onMouseMove">
    <canvas ref="canvas" class="stars-canvas"></canvas>



    <div class="footer-body">
      <div class="footer-grid">

        <!-- Brand -->
        <div class="footer-col brand-col">
          <img src="/images/logo_dark-300x105.png" alt="Perfecta Combinacion" class="footer-logo" />
          <p>Corsi di ballo latinoamericano e fitness a Legnano e Busto Arsizio.</p>
          <div class="footer-social">
            <a v-for="social in socials" :key="social.label"
               :href="social.href" target="_blank" rel="noopener" :aria-label="social.label">
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Contatti -->
        <div class="footer-col">
          <h4>Contatti</h4>
          <ul class="contact-list">
            <li><i class="fas fa-phone"></i><span><a href="tel:+393347448085">+39 334 744 8085</a> (Mimmo)</span></li>
            <li><i class="fas fa-phone"></i><span><a href="tel:+393807597037">+39 380 759 7037</a> (Diego)</span></li>
            <li><i class="fas fa-envelope"></i><span><a href="mailto:info@perfectacombinacion.it">info@perfectacombinacion.it</a></span></li>
            <li><i class="fas fa-map-marker-alt"></i><span>Legnano &amp; Busto Arsizio (VA)</span></li>
          </ul>
        </div>

      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ year }} Perfecta Combinacion &mdash; Tutti i diritti riservati.</p>
      <p class="footer-privacy-links">
        <button class="footer-cookie-btn" @click="openSettings">Gestisci cookie</button>
      </p>
    </div>

  </footer>
</template>

<script setup>
import { useCookieConsent } from '../composables/useCookieConsent.js'
import { useStarParticles } from '../composables/useStarParticles.js'

const { openSettings } = useCookieConsent()
const { canvas, onMouseMove } = useStarParticles()

const year = new Date().getFullYear()

const socials = [
  { label: 'Facebook',  href: 'https://www.facebook.com/perfectacombinacion',  icon: 'fab fa-facebook-f' },
  { label: 'Instagram', href: 'https://www.instagram.com/perfectacombinacion', icon: 'fab fa-instagram' },
  { label: 'Email',     href: 'mailto:info@perfectacombinacion.it',             icon: 'fas fa-envelope' },
]
</script>

<style scoped>
#footer {
  position: relative;
  background: #111111;
  overflow: hidden;
}

.stars-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

/* ---- Forme decorative ---- */
.footer-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.06;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary);
  top: -120px;
  left: -120px;
}

.shape-2 {
  width: 280px;
  height: 280px;
  background: #832ba9;
  bottom: 0;
  right: -80px;
}

.shape-3 {
  width: 160px;
  height: 160px;
  background: var(--color-primary);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* ---- Corpo ---- */
.footer-body {
  position: relative;
  z-index: 1;
  padding: 2rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1.5fr;
  gap: 2.5rem;
}

/* ---- Brand ---- */
.footer-logo {
  max-width: 150px;
  margin-bottom: 0.75rem;
  display: block;
}

.brand-col p {
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.footer-social {
  display: flex;
  gap: 0.6rem;
}

.footer-social a {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  text-decoration: none;
}

.footer-social a:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

/* ---- Colonne ---- */
.footer-col h4 {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.9rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.footer-col ul li a {
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-col ul li a:hover { color: var(--color-primary); }

/* ---- Contatti ---- */
.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem;
}

.contact-list li i {
  color: var(--color-primary);
  margin-top: 0.18rem;
  flex-shrink: 0;
  font-size: 0.8rem;
}

.contact-list li a {
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.2s;
}

.contact-list li a:hover { color: var(--color-primary); }

/* ---- Bottom ---- */
.footer-bottom {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0.4rem 2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.footer-bottom p {
  color: rgba(255,255,255,0.25);
  font-size: 0.8rem;
  margin: 0;
}

.footer-privacy-links {
  margin-top: 0.3rem;
}

.footer-cookie-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.2);
  font-family: inherit;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.18s;
}

.footer-cookie-btn:hover {
  color: #f450a5;
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .brand-col { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .footer-grid { grid-template-columns: 1fr; gap: 1.5rem; }
}
</style>
