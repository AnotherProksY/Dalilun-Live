import { useTranslation } from 'react-i18next'
import { DUAS } from '@/data/duas'
import styles from './LiveDuas.module.scss'

type Lang = 'ru' | 'en' | 'tt'

export function LiveDuas() {
  const { i18n } = useTranslation()
  const lang = (i18n.language as Lang) in { ru: 1, en: 1, tt: 1 } ? (i18n.language as Lang) : 'ru'

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {DUAS.map((dua, index) => (
          <li key={dua.id} className={styles.item}>
            <p className={styles.arabic} dir='rtl'>{dua.arabic}</p>
            <p className={styles.transliteration}>{dua.transliteration}</p>
            <p className={styles.translation}>{dua[lang]}</p>
            <p className={styles.source}>{dua.source}</p>
            {index < DUAS.length - 1 && <div className={styles.divider} />}
          </li>
        ))}
      </ul>
    </div>
  )
}
