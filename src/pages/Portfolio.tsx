import { useTheme } from '../hooks/useTheme'
import { ELanguages } from '../types'
import styles from './css/portfolio.module.css'
import { useLanguageContext } from '../contexts/LanguageContext'
import PortfolioInfo from '../components/PortfolioInfo/PortfolioInfo'

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
  const { t } = useLanguageContext()

  const lightTheme = useTheme()

  return (
    <>
      {/* <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>{t("Portfolio")} | react.jenniina.fi</title>
        <meta name="description" content={t("AboutThisSite")} />
        <link rel="canonical" href={`https://react.jenniina.fi/portfolio`} />
        <meta
          property="og:title"
          content={`${t("Portfolio")} | react.jenniina.fi`}
        />
        <meta property="og:description" content={t("AboutThisSite")} />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio`}
        />
        <meta property="og:type" content="website" />
      </Helmet> **/}
      <div
        className={`portfolio ${styles.portfolio} ${type} ${
          lightTheme ? styles.light : ''
        }`}
      >
        <div className="inner-wrap">
          <PortfolioInfo language={language} />
        </div>
      </div>
    </>
  )
}
