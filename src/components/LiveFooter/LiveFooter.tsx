import { useTranslation } from 'react-i18next'
import styles from './LiveFooter.module.scss'

export function LiveFooter() {
  const { t } = useTranslation()

  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <span className={styles.copy} dir='ltr'>© 2026 Dalilun</span>
        <div className={styles.links}>
          <a href='#' className={styles.link}>{t('footer.privacy')}</a>
          <a href='#' className={styles.link}>{t('footer.cookies')}</a>
        </div>
      </div>
    </footer>
  )
}
