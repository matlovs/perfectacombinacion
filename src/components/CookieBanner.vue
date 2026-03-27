<template>
  <Transition name="cookie-slide">
    <div v-if="showBanner" class="cookie-overlay" role="dialog" aria-modal="true" aria-label="Preferenze cookie">
      <div class="cookie-banner">

        <div class="cookie-header">
          <span class="cookie-icon"><i class="fas fa-cookie-bite"></i></span>
          <h2 class="cookie-title">Informativa sui Cookie</h2>
        </div>

        <div class="cookie-body">
          <p class="cookie-text">
            Questo sito utilizza cookie tecnici per memorizzare le tue preferenze. Utilizziamo inoltre
            servizi CDN di terze parti (Google Fonts, Font Awesome) che potrebbero trasferire il tuo
            indirizzo IP a server negli USA.
            <button class="cookie-link-btn" @click="showDetails = !showDetails">
              {{ showDetails ? 'Nascondi dettagli' : 'Maggiori informazioni' }}
            </button>
          </p>

          <Transition name="cookie-expand">
            <div v-if="showDetails" class="cookie-details">

              <div class="cookie-category">
                <div class="cookie-category-header">
                  <div class="cookie-category-info">
                    <span class="cookie-category-name">
                      <i class="fas fa-shield-halved"></i>
                      Cookie tecnici necessari
                    </span>
                    <span class="cookie-category-desc">
                      Indispensabili per il funzionamento del sito. Memorizzano solo le tue scelte
                      sui cookie. Non raccolgono dati personali identificativi.
                    </span>
                  </div>
                  <span class="badge-always-on">Sempre attivi</span>
                </div>
                <div class="cookie-tags">
                  <span class="cookie-tag">pc_cookie_consent</span>
                </div>
              </div>

              <div class="cookie-category">
                <div class="cookie-category-header">
                  <div class="cookie-category-info">
                    <span class="cookie-category-name">
                      <i class="fas fa-globe"></i>
                      Servizi CDN di terze parti
                    </span>
                    <span class="cookie-category-desc">
                      Google Fonts e Font Awesome vengono caricati da server di terze parti.
                      Questi servizi ricevono il tuo indirizzo IP come parte normale della richiesta HTTP
                      e possono trasferire dati tecnici negli Stati Uniti, nel rispetto del GDPR (artt. 44-49).
                      Non vengono utilizzati per finalità di profilazione o tracciamento.
                    </span>
                  </div>
                </div>
                <div class="cookie-tags">
                  <span class="cookie-tag">Google Fonts</span>
                  <span class="cookie-tag">Font Awesome CDN</span>
                </div>
              </div>

              <p class="cookie-policy-note">
                Per maggiori dettagli consulta la nostra
                <button class="cookie-link-btn" @click="showPolicyModal = true">Privacy &amp; Cookie Policy</button>.
              </p>
            </div>
          </Transition>
        </div>

        <div class="cookie-actions">
          <button class="cookie-btn cookie-btn-outline" @click="rejectAll">
            Rifiuta non essenziali
          </button>
          <button class="cookie-btn cookie-btn-primary" @click="acceptAll">
            <i class="fas fa-check"></i>
            Accetta e continua
          </button>
        </div>

        <div class="cookie-footer-links">
          <button class="cookie-link-btn small" @click="showPolicyModal = true">
            Privacy Policy
          </button>
          <span class="cookie-sep">·</span>
          <button class="cookie-link-btn small" @click="showDetails = !showDetails">
            {{ showDetails ? 'Chiudi dettagli' : 'Personalizza' }}
          </button>
        </div>

      </div>
    </div>
  </Transition>

  <!-- Modal Privacy & Cookie Policy -->
  <Transition name="cookie-fade">
    <div v-if="showPolicyModal" class="privacy-overlay" @click.self="showPolicyModal = false">
      <div class="privacy-modal" role="dialog" aria-modal="true" aria-label="Privacy e Cookie Policy">

        <div class="privacy-modal-header">
          <h2>Privacy &amp; Cookie Policy</h2>
          <button class="privacy-close-btn" @click="showPolicyModal = false" aria-label="Chiudi">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="privacy-modal-body">
          <section>
            <h3>1. Titolare del trattamento</h3>
            <p>
              <strong>Perfecta Combinacion</strong> – Scuola di ballo<br />
              Sedi operative: Legnano (MI) e Busto Arsizio (VA), Italia<br />
              Contatto: <a href="mailto:info@perfectacombinacion.it">info@perfectacombinacion.it</a>
            </p>
          </section>

          <section>
            <h3>2. Dati raccolti e finalità</h3>
            <p>
              Il sito ha finalità esclusivamente informative. Non raccogliamo dati personali tramite
              moduli di registrazione o account. I soli dati tecnici trattati sono quelli generati
              automaticamente dai servizi elencati di seguito.
            </p>
          </section>

          <section>
            <h3>3. Cookie e tecnologie utilizzate</h3>

            <h4>Cookie tecnici (base giuridica: legittimo interesse – art. 6.1.f GDPR)</h4>
            <p>Non richiedono consenso ai sensi dell'art. 122 D.Lgs. 196/2003 (Codice Privacy).</p>
            <table class="policy-table">
              <thead>
                <tr><th>Nome</th><th>Scopo</th><th>Durata</th><th>Fornitore</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>pc_cookie_consent</code></td>
                  <td>Memorizza le scelte dell'utente sul banner cookie</td>
                  <td>12 mesi</td>
                  <td>Questo sito (first-party)</td>
                </tr>
              </tbody>
            </table>

            <h4>Servizi CDN di terze parti (base giuridica: legittimo interesse – art. 6.1.f GDPR)</h4>
            <p>
              I seguenti servizi sono necessari al corretto funzionamento visivo del sito e non
              vengono utilizzati per finalità di profilazione o tracciamento commerciale.
              Il trasferimento di dati negli USA avviene in conformità al Data Privacy Framework
              UE-USA (Decisione di esecuzione UE 2023/1795) e/o alle Clausole Contrattuali
              Standard (SCC) approvate dalla Commissione Europea.
            </p>
            <table class="policy-table">
              <thead>
                <tr><th>Servizio</th><th>Fornitore</th><th>Dati trasferiti</th><th>Privacy Policy</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Google Fonts</td>
                  <td>Google LLC (USA)</td>
                  <td>Indirizzo IP, User-Agent, referrer</td>
                  <td><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a></td>
                </tr>
                <tr>
                  <td>Font Awesome CDN</td>
                  <td>Fonticons, Inc. (USA)</td>
                  <td>Indirizzo IP, User-Agent</td>
                  <td><a href="https://fontawesome.com/privacy" target="_blank" rel="noopener">fontawesome.com/privacy</a></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3>4. Trasferimento dei dati extra-UE</h3>
            <p>
              I dati tecnici gestiti dai servizi CDN sopra indicati vengono trasferiti negli
              Stati Uniti. Tale trasferimento è coperto dal Data Privacy Framework UE-USA (in vigore
              dal 10 luglio 2023) e/o dalle Clausole Contrattuali Standard (SCC), in conformità
              agli artt. 44-49 del GDPR. Puoi opporti al trasferimento contattando il titolare.
            </p>
          </section>

          <section>
            <h3>5. Diritti dell'interessato</h3>
            <p>
              Ai sensi degli artt. 15-22 del GDPR (Reg. UE 2016/679) hai diritto di:
            </p>
            <ul>
              <li>Accedere ai tuoi dati personali (art. 15)</li>
              <li>Ottenere la rettifica di dati inesatti (art. 16)</li>
              <li>Ottenere la cancellazione dei dati (art. 17)</li>
              <li>Limitare il trattamento (art. 18)</li>
              <li>Opporti al trattamento (art. 21)</li>
              <li>Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca</li>
            </ul>
            <p>
              Per esercitare i tuoi diritti o per qualsiasi richiesta relativa alla privacy contatta:
              <a href="mailto:info@perfectacombinacion.it">info@perfectacombinacion.it</a>
            </p>
            <p>
              Hai altresì diritto di proporre reclamo all'autorità di controllo competente:
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">Garante per la protezione dei dati personali</a>
              (garanteprivacy.it).
            </p>
          </section>

          <section>
            <h3>6. Modifiche alla presente informativa</h3>
            <p>
              Ci riserviamo il diritto di aggiornare la presente informativa per adeguarla a
              modifiche normative o operative. In caso di modifiche sostanziali, il banner
              di informativa verrà mostrato nuovamente agli utenti.<br />
              <strong>Ultima revisione:</strong> Marzo 2026.
            </p>
          </section>
        </div>

        <div class="privacy-modal-footer">
          <button class="cookie-btn cookie-btn-primary" @click="showPolicyModal = false">Chiudi</button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useCookieConsent } from '../composables/useCookieConsent.js'

const { showBanner, showDetails, acceptAll, rejectAll } = useCookieConsent()
const showPolicyModal = ref(false)
</script>

<style scoped>
/* ===== OVERLAY ===== */
.cookie-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 0 1rem 1.25rem;
  pointer-events: none;
}

/* ===== BANNER ===== */
.cookie-banner {
  pointer-events: all;
  max-width: 820px;
  margin: 0 auto;
  background: #161616;
  border: 1px solid rgba(244, 80, 165, 0.2);
  border-radius: 10px;
  box-shadow:
    0 -2px 20px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(244, 80, 165, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  padding: 1.4rem 1.75rem 1.2rem;
  color: rgba(255, 255, 255, 0.72);
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.88rem;
}

/* ===== HEADER ===== */
.cookie-header {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.65rem;
}

.cookie-icon {
  color: #f450a5;
  font-size: 1.15rem;
  line-height: 1;
}

.cookie-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  letter-spacing: 0.01em;
}

/* ===== BODY ===== */
.cookie-body {
  margin-bottom: 1.1rem;
}

.cookie-text {
  margin: 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.86rem;
}

.cookie-link-btn {
  background: none;
  border: none;
  color: #f450a5;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.18s;
}

.cookie-link-btn:hover {
  color: #d63d8f;
}

/* ===== DETAILS ===== */
.cookie-details {
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.cookie-category {
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.065);
}

.cookie-category-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.cookie-category-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.cookie-category-name {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.84rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.cookie-category-name i {
  color: #f450a5;
  font-size: 0.8rem;
}

.cookie-category-desc {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.55;
}

.cookie-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.55rem;
}

.cookie-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
  background: rgba(244, 80, 165, 0.1);
  color: rgba(244, 80, 165, 0.85);
  border: 1px solid rgba(244, 80, 165, 0.18);
  font-weight: 600;
  font-family: monospace;
  letter-spacing: 0.02em;
}

.badge-always-on {
  font-size: 0.72rem;
  color: #5acc6e;
  font-weight: 700;
  white-space: nowrap;
  background: rgba(90, 204, 110, 0.1);
  border: 1px solid rgba(90, 204, 110, 0.2);
  border-radius: 20px;
  padding: 0.15rem 0.55rem;
  flex-shrink: 0;
}

.cookie-policy-note {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.38);
  margin: 0.2rem 0 0;
  line-height: 1.5;
}

.cookie-policy-note .cookie-link-btn {
  font-size: 0.76rem;
}

/* ===== ACTIONS ===== */
.cookie-actions {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
  align-items: center;
}

.cookie-btn {
  padding: 0.52rem 1.35rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.18s, color 0.18s, border-color 0.18s, transform 0.1s;
  border: 2px solid transparent;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.cookie-btn:active {
  transform: scale(0.96);
}

.cookie-btn-primary {
  background: #f450a5;
  color: #fff;
  border-color: #f450a5;
}

.cookie-btn-primary:hover {
  background: #d63d8f;
  border-color: #d63d8f;
}

.cookie-btn-outline {
  background: transparent;
  color: rgba(255, 255, 255, 0.58);
  border-color: rgba(255, 255, 255, 0.15);
}

.cookie-btn-outline:hover {
  border-color: rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.88);
}

/* ===== FOOTER LINKS ===== */
.cookie-footer-links {
  margin-top: 0.7rem;
  display: flex;
  gap: 0.45rem;
  align-items: center;
}

.cookie-link-btn.small {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.28);
}

.cookie-link-btn.small:hover {
  color: #f450a5;
}

.cookie-sep {
  color: rgba(255, 255, 255, 0.18);
  font-size: 0.72rem;
}

/* ===== PRIVACY MODAL ===== */
.privacy-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.privacy-modal {
  background: #161616;
  border: 1px solid rgba(244, 80, 165, 0.18);
  border-radius: 12px;
  width: 100%;
  max-width: 680px;
  max-height: 87vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
  color: rgba(255, 255, 255, 0.72);
  font-family: 'Source Sans 3', sans-serif;
}

.privacy-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  flex-shrink: 0;
}

.privacy-modal-header h2 {
  font-size: 1.05rem;
  color: #fff;
  margin: 0;
  font-weight: 700;
}

.privacy-close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.3rem 0.55rem;
  border-radius: 5px;
  transition: color 0.18s, background 0.18s;
  line-height: 1;
}

.privacy-close-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.07);
}

.privacy-modal-body {
  padding: 1.4rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  font-size: 0.86rem;
  line-height: 1.72;
}

.privacy-modal-body section {
  margin-bottom: 0.25rem;
}

.privacy-modal-body h3 {
  font-size: 0.9rem;
  color: #f450a5;
  font-weight: 700;
  margin: 1.4rem 0 0.45rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(244, 80, 165, 0.12);
}

.privacy-modal-body section:first-child h3 {
  margin-top: 0;
}

.privacy-modal-body h4 {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 700;
  margin: 1rem 0 0.35rem;
}

.privacy-modal-body p {
  margin: 0 0 0.65rem;
  color: rgba(255, 255, 255, 0.58);
}

.privacy-modal-body ul {
  color: rgba(255, 255, 255, 0.58);
  padding-left: 1.25rem;
  margin: 0 0 0.65rem;
}

.privacy-modal-body li {
  margin-bottom: 0.2rem;
}

.privacy-modal-body a {
  color: #f450a5;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.privacy-modal-body a:hover {
  color: #d63d8f;
}

.policy-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  margin: 0.5rem 0 1rem;
}

.policy-table th {
  text-align: left;
  padding: 0.45rem 0.75rem;
  background: rgba(244, 80, 165, 0.09);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 700;
  border-bottom: 1px solid rgba(244, 80, 165, 0.18);
  white-space: nowrap;
}

.policy-table td {
  padding: 0.45rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.55);
  vertical-align: top;
}

.policy-table tr:last-child td {
  border-bottom: none;
}

.policy-table code {
  font-family: monospace;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.07);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.75);
}

.privacy-modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

/* ===== TRANSITIONS ===== */
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.38s ease;
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(115%);
  opacity: 0;
}

.cookie-expand-enter-active,
.cookie-expand-leave-active {
  transition: opacity 0.22s ease, max-height 0.32s ease;
  max-height: 700px;
  overflow: hidden;
}

.cookie-expand-enter-from,
.cookie-expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.cookie-fade-enter-active,
.cookie-fade-leave-active {
  transition: opacity 0.22s ease;
}

.cookie-fade-enter-from,
.cookie-fade-leave-to {
  opacity: 0;
}

/* ===== MOBILE ===== */
@media (max-width: 640px) {
  .cookie-overlay {
    padding: 0 0 0;
  }

  .cookie-banner {
    border-radius: 10px 10px 0 0;
    padding: 1.2rem 1.1rem 1rem;
  }

  .cookie-actions {
    flex-direction: column-reverse;
  }

  .cookie-btn {
    width: 100%;
    justify-content: center;
  }

  .cookie-category-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .privacy-modal {
    max-height: 92vh;
    border-radius: 12px 12px 0 0;
    align-self: flex-end;
  }

  .privacy-modal-body {
    padding: 1rem 1.1rem;
  }

  .policy-table {
    font-size: 0.72rem;
  }

  .policy-table th,
  .policy-table td {
    padding: 0.35rem 0.5rem;
  }
}
</style>
