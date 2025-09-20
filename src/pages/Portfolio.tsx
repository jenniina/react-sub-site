import { lazy, Suspense, useContext } from 'react'
import { useTheme } from '../hooks/useTheme'
import { ELanguages } from '../types'
import styles from './css/portfolio.module.css'
import { LanguageContext } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'

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
    <>
      <Helmet>
        <title>{t('Portfolio')} | react.jenniina.fi</title>
        <meta name='description' content={t('AboutThisSite')} />
        <link rel='canonical' href={`https://react.jenniina.fi/portfolio`} />
      </Helmet>
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
    </>
  )
}
