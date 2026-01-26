import { useTheme } from '../hooks/useTheme'
import styles from './css/portfolio.module.css'
import PortfolioInfo from '../components/PortfolioInfo/PortfolioInfo'
import { useLanguageContext } from '../contexts/LanguageContext'
import SEO from '../components/SEO/SEO'

export default function Portfolio({ type }: { type: string }) {
  const { t } = useLanguageContext()
  const lightTheme = useTheme()

  return (
    <>
      <SEO
        title={`${t('Portfolio')} | react.jenniina.fi`}
        description={
          t('Portfolio') +
          ' | ' +
          t('WebpagesAndGraphicDesign') +
          ' | Jenniina Laine'
        }
        canonicalUrl={'https://react.jenniina.fi/portfolio'}
      />
      <div
        className={`portfolio ${styles.portfolio} ${type} ${
          lightTheme ? styles.light : ''
        }`}
      >
        <div className="inner-wrap">
          <PortfolioInfo />
        </div>
      </div>
    </>
  )
}
