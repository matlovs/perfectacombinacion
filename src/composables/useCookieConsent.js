import { ref } from 'vue'

const STORAGE_KEY = 'pc_cookie_consent'
const CONSENT_VERSION = '1'

// Stato globale condiviso tra tutti i componenti
const showBanner = ref(false)
const showDetails = ref(false)
const consentGiven = ref(false)

function loadSavedConsent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      showBanner.value = true
      return
    }
    const parsed = JSON.parse(saved)
    if (parsed.version !== CONSENT_VERSION) {
      // Nuova versione dell'informativa: richiedere nuovamente il consenso
      showBanner.value = true
      return
    }
    consentGiven.value = true
    showBanner.value = false
  } catch {
    showBanner.value = true
  }
}

function saveConsent(accepted) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    version: CONSENT_VERSION,
    accepted,
    timestamp: new Date().toISOString(),
  }))
  consentGiven.value = true
  showBanner.value = false
  showDetails.value = false
}

function acceptAll() {
  saveConsent(true)
}

function rejectAll() {
  saveConsent(false)
}

function openSettings() {
  showBanner.value = true
  showDetails.value = true
}

export function useCookieConsent() {
  return {
    showBanner,
    showDetails,
    consentGiven,
    loadSavedConsent,
    acceptAll,
    rejectAll,
    openSettings,
  }
}
