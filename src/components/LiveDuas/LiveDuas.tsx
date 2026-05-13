import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/UI/Icon/Icon'
import { LanguageModal } from '@/components/LanguageModal/LanguageModal'
import { useTranslationPoll } from '@/hooks/useTranslationPoll'
import styles from './LiveDuas.module.scss'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'tt', label: 'Татарча' },
]

export function LiveDuas() {
  const { t, i18n } = useTranslation()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingLang, setPendingLang] = useState(i18n.language)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  )
  const dropdownRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const agentId = LANGUAGES.find((l) => l.code === i18n.language)
    ? i18n.language
    : 'ru'

  const { text, history, active, audioUnlocked, unlockAudio } =
    useTranslationPoll(agentId)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!dropdownOpen) return
    const onOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [dropdownOpen])

  // Auto-scroll to bottom whenever history or current text changes
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history, text])

  const currentLang =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[1]

  const handleLangClick = () => {
    if (isMobile) {
      setPendingLang(i18n.language)
      setModalOpen(true)
    } else {
      setDropdownOpen((v) => !v)
    }
  }

  const handleDesktopSelect = (code: string) => {
    void i18n.changeLanguage(code)
    setDropdownOpen(false)
  }

  const handleModalConfirm = () => {
    void i18n.changeLanguage(pendingLang)
    setModalOpen(false)
  }

  const hasContent = history.length > 0 || active

  return (
    <>
      <div className={styles.root}>
        <div className={styles.langBar}>
          <div className={styles.langWrapper} ref={dropdownRef}>
            <button
              type='button'
              className={styles.langButton}
              onClick={handleLangClick}
            >
              {currentLang.label}
              <Icon
                id='chevron'
                width={16}
                height={16}
                className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
              />
            </button>

            {!isMobile && dropdownOpen && (
              <ul className={styles.dropdown}>
                {LANGUAGES.map((l) => (
                  <li key={l.code}>
                    <button
                      type='button'
                      className={`${styles.dropdownItem} ${l.code === i18n.language ? styles.dropdownItemActive : ''}`}
                      onClick={() => handleDesktopSelect(l.code)}
                    >
                      <span className={styles.dropdownItemLabel}>
                        {l.label}
                      </span>
                      {l.code === i18n.language ? (
                        <span className={styles.dropdownItemDot} aria-hidden />
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.listShell} ref={scrollRef}>
          {hasContent ? (
            <ul className={styles.list}>
              {history.map((item, i) => (
                <li key={i} className={styles.item}>
                  <p className={styles.itemText}>{item}</p>
                </li>
              ))}
              {active && (
                <li className={`${styles.item} ${styles.itemCurrent}`}>
                  <p className={styles.itemText}>{text}</p>
                </li>
              )}
            </ul>
          ) : (
            <p className={styles.placeholder}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </p>
          )}
        </div>

        {!audioUnlocked && (
          <div className={styles.audioBar}>
            <button
              type='button'
              className={styles.audioUnlockBtn}
              onClick={unlockAudio}
            >
              {t('live.audioUnlock')}
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <LanguageModal
          languages={LANGUAGES}
          selected={pendingLang}
          title={t('live.langModal.title')}
          confirmLabel={t('live.langModal.confirm')}
          onSelect={setPendingLang}
          onConfirm={handleModalConfirm}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
