import en from '@/locales/en'
import ru from '@/locales/ru'
import tt from '@/locales/tt'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const LANG_STORAGE_KEY = 'dalilun-live-language'
const SUPPORTED_LANGS = ['ru', 'en', 'tt'] as const

function readNavigatorLanguage(): (typeof SUPPORTED_LANGS)[number] | null {
  if (typeof navigator === 'undefined') return null
  const candidates = [...navigator.languages, navigator.language].filter(Boolean)
  for (const tag of candidates) {
    const base = String(tag).split('-')[0]?.toLowerCase()
    if (base && (SUPPORTED_LANGS as readonly string[]).includes(base)) {
      return base as (typeof SUPPORTED_LANGS)[number]
    }
  }
  return null
}

function resolveInitialLanguage(): (typeof SUPPORTED_LANGS)[number] {
  try {
    const raw = localStorage.getItem(LANG_STORAGE_KEY)
    if (raw && (SUPPORTED_LANGS as readonly string[]).includes(raw)) {
      return raw as (typeof SUPPORTED_LANGS)[number]
    }
  } catch {
    /* private mode / disabled storage */
  }
  return readNavigatorLanguage() ?? 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
    tt: { translation: tt },
  },
  lng: resolveInitialLanguage(),
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  const base = lng.split('-')[0]
  if (!(SUPPORTED_LANGS as readonly string[]).includes(base)) return
  try {
    localStorage.setItem(LANG_STORAGE_KEY, base)
  } catch {
    /* ignore */
  }
})

export default i18n
