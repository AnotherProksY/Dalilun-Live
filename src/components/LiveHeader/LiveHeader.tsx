import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/UI/Icon/Icon'
import { CtaButton } from '@/components/UI/CtaButton/CtaButton'
import styles from './LiveHeader.module.scss'

export function LiveHeader() {
  const { t } = useTranslation()

  return (
    <header className={styles.root}>
      <div className={styles.bar}>
        <a href='/' className={styles.logoLink} aria-label='Dalilun'>
          <span className={styles.logoWrapper}>
            <Icon id='logo' width={159} height={36} viewBox='0 0 159 36' className={styles.logo} />
            <span className={styles.livePing} aria-hidden='true' />
          </span>
        </a>
        <CtaButton href='/' className={styles.ctaButton}>{t('live.aboutProject')}</CtaButton>
      </div>
    </header>
  )
}
