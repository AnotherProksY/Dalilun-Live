import { useEffect } from 'react'
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

export function LanguageModal({ languages, selected, title, confirmLabel, onSelect, onConfirm, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <button type='button' className={styles.closeBtn} onClick={onClose} aria-label='Close'>
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path d='M15 5L5 15M5 5l10 10' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
            </svg>
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
                <span className={`${styles.dot} ${lang.code === selected ? styles.dotActive : ''}`} />
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
