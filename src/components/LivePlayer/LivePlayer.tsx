import { useTranslation } from 'react-i18next'
import styles from './LivePlayer.module.scss'

/** Замените на реальные embed-URL по языкам. */
const STREAM_URLS = {
  ru: 'https://example.com/stream-placeholder-ru',
  en: 'https://example.com/stream-placeholder-en',
  tt: 'https://example.com/stream-placeholder-tt',
} as const

type StreamLang = keyof typeof STREAM_URLS

function streamUrlForLanguage(lng: string): string {
  const base = lng.split('-')[0]?.toLowerCase() as StreamLang
  if (base in STREAM_URLS) return STREAM_URLS[base]
  return STREAM_URLS.ru
}

function isRealStreamEmbed(url: string): boolean {
  if (!url.trim()) return false
  try {
    return new URL(url).hostname !== 'example.com'
  } catch {
    return false
  }
}

export function LivePlayer() {
  const { i18n } = useTranslation()
  const streamUrl = streamUrlForLanguage(i18n.language)
  const showIframe = isRealStreamEmbed(streamUrl)

  return (
    <div className={styles.root}>
      {showIframe ? (
        <iframe
          className={styles.iframe}
          src={streamUrl}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          title='Dalilun Live'
        />
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.placeholderInner}>
            <svg
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              className={styles.playIcon}
            >
              <circle cx='24' cy='24' r='23' stroke='#fff' strokeWidth='2' />
              <path d='M20 16l14 8-14 8V16z' fill='#fff' />
            </svg>
            <span className={styles.placeholderText}>Прямой эфир</span>
          </div>
        </div>
      )}
    </div>
  )
}
