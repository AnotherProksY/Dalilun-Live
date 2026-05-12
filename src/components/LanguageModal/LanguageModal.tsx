import { useEffect, useState } from 'react'
import { Icon } from '@/components/UI/Icon/Icon'
import styles from './LanguageModal.module.scss'

interface Language {
  code: string
  label: string
}

interface Props {
  languages: Language[]
  selected: string
  title: string
  confirmLabel: string
  onSelect: (code: string) => void
  onConfirm: () => void
  onClose: () => void
}

const MOBILE_MQ = '(max-width: 767px)'

export function LanguageModal({
  languages,
  selected,
  title,
  confirmLabel,
  onSelect,
  onConfirm,
  onClose,
}: Props) {
  const [isBottomSheet, setIsBottomSheet] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ)
    const sync = () => setIsBottomSheet(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={`${styles.overlay} ${isBottomSheet ? styles.overlayBottomSheet : ''}`}
      onClick={isBottomSheet ? undefined : onClose}
    >
      <div
        className={`${styles.modal} ${isBottomSheet ? styles.modalBottomSheet : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <button
            type='button'
            className={styles.closeBtn}
            onClick={onClose}
            aria-label='Close'
          >
            <Icon id='close' width={40} height={40} />
          </button>
        </div>

        <ul className={styles.list}>
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type='button'
                className={`${styles.item} ${lang.code === selected ? styles.itemActive : ''}`}
                onClick={() => onSelect(lang.code)}
              >
                <span>{lang.label}</span>
                <span
                  className={`${styles.dot} ${lang.code === selected ? styles.dotActive : ''}`}
                />
              </button>
            </li>
          ))}
        </ul>

        <button type='button' className={styles.confirmBtn} onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </div>
  )
}
