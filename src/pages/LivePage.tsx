import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LiveHeader } from '@/components/LiveHeader/LiveHeader'
import { LivePlayer } from '@/components/LivePlayer/LivePlayer'
import { LiveDuas } from '@/components/LiveDuas/LiveDuas'
import { LiveFooter } from '@/components/LiveFooter/LiveFooter'
import styles from './LivePage.module.scss'

export function LivePage() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('livePageTitle')
  }, [t, i18n.language])

  return (
    <div className={styles.page}>
      <LiveHeader />
      <main className={styles.main}>
        <LivePlayer />
        <LiveDuas />
      </main>
      <LiveFooter />
    </div>
  )
}
