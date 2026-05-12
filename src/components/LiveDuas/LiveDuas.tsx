import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/UI/Icon/Icon'
import { LanguageModal } from '@/components/LanguageModal/LanguageModal'
import { DUAS } from '@/data/duas'
import styles from './LiveDuas.module.scss'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'tt', label: 'Татарча' },
]

type Lang = 'ru' | 'en' | 'tt'

export function LiveDuas() {
  const { t, i18n } = useTranslation()

  const lang =
    (i18n.language as Lang) in { ru: 1, en: 1, tt: 1 }
      ? (i18n.language as Lang)
      : 'ru'

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingLang, setPendingLang] = useState(i18n.language)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

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

        <div className={styles.listShell}>
          <div className={styles.listScroll}>
            <ul className={styles.list}>
              {DUAS.map((dua) => (
                <li key={dua.id} className={styles.item}>
                  <p className={styles.arabic} dir='rtl'>
                    {dua.arabic}
                  </p>
                  <p className={styles.transliteration}>
                    {dua.transliteration}
                  </p>
                  <p className={styles.translation}>{dua[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
