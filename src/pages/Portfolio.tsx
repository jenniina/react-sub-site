import { lazy, Suspense, useContext } from 'react'
import { useTheme } from '../hooks/useTheme'
import { ELanguages } from '../types'
import styles from './css/portfolio.module.css'
import { LanguageContext } from '../contexts/LanguageContext'

const PortfolioInfo = lazy(() => import('../components/PortfolioInfo/PortfolioInfo'))

export default function Portfolio({
  heading,
  text,
  type,
  language,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
}) {
  const { t } = useContext(LanguageContext)!

  const lightTheme = useTheme()

  return (
    <div
      className={`portfolio ${styles.portfolio} ${type} ${
        lightTheme ? styles.light : ''
      }`}
    >
      <div className='inner-wrap'>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>{t('Loading')}...</div>
          }
        >
          <PortfolioInfo language={language} />
        </Suspense>
      </div>
    </div>
  )
}
