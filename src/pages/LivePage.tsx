import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LivePlayer } from '@/components/LivePlayer/LivePlayer'
import { LiveDuas } from '@/components/LiveDuas/LiveDuas'
import { Container } from '@/components/UI/Container/Container'
import { MainLayout } from '@/layouts/MainLayout/MainLayout'
import styles from './LivePage.module.scss'

/** false — скрыть блок субтитров на странице, true — показать */
const LIVE_PAGE_SHOW_DUAS = false

export function LivePage() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('livePageTitle')
  }, [t, i18n.language])

  return (
    <MainLayout>
      <div className={styles.page}>
        <Container
          className={
            LIVE_PAGE_SHOW_DUAS
              ? styles.main
              : `${styles.main} ${styles.mainSoloMobile}`
          }
        >
          <LivePlayer />
          {LIVE_PAGE_SHOW_DUAS && <LiveDuas />}
        </Container>
      </div>
    </MainLayout>
  )
}
