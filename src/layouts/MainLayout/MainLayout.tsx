import { type ReactNode } from 'react'
import { LiveHeader } from '@/components/LiveHeader/LiveHeader'
// import { LiveFooter } from '@/components/LiveFooter/LiveFooter'
import styles from '@/layouts/MainLayout/MainLayout.module.scss'

interface Props {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <LiveHeader />
      <main className={styles.main}>{children}</main>
      {/* <LiveFooter /> */}
    </div>
  )
}
