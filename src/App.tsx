import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LivePage } from '@/pages/LivePage'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = 'ltr'
  }, [i18n.language])

  return <LivePage />
}

export default App
