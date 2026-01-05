import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/welcome.module.css'
import Icon from '../components/Icon/Icon'
import { ELanguages, ELanguagesLong } from '../types'
import { Select, SelectOption } from '../components/Select/Select'
import { useLanguageContext } from '../contexts/LanguageContext'
import Newest from '../components/Newest/Newest'

export default function Home({
  type,
  options,
}: {
  type: string
  options: (enumObj: typeof ELanguagesLong) => SelectOption[]
}) {
  const { t, language, setLanguage } = useLanguageContext()

  const lightTheme = useTheme()

  return (
    <>
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>
          {t("Welcome")} {t("ToTheReactSiteOfJenniinaFi")} | Jenniina Laine
        </title>
        <meta
          name="description"
          content={`${t("Welcome")} | ${t("AboutThisSite")}`}
        />
        <link rel="canonical" href={`https://react.jenniina.fi/`} />
        <meta
          property="og:title"
          content={`${t("Welcome")} | Jenniina Laine`}
        />
        <meta
          property="og:description"
          content={`${t("Welcome")} | ${t("AboutThisSite")}`}
        />
        <meta property="og:url" content={`https://react.jenniina.fi/`} />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div className={`welcome ${type} ${lightTheme ? styles.light : ''}`}>
        <Select
          language={language}
          id="language-welcome"
          className={`${styles['language-welcome']} ${styles.language} language`}
          instructions={`${t('ChangeLanguage')}:`}
          options={options(ELanguagesLong)}
          value={
            language
              ? ({
                  value: language,
                  label: ELanguagesLong[language],
                } as SelectOption)
              : undefined
          }
          onChange={o => {
            setLanguage(o?.value as ELanguages)
          }}
        />
        <div className="inner-wrap">
          <section className={`card ${styles.welcome}`}>
            <div>
              <ul className={styles.list}>
                <li className={styles['li-about']}>
                  <Link to="/about">
                    <Icon lib="bs" name="BsPerson" /> <span>{t('About')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio">
                    <Icon lib="io" name="IoMdImages" />{' '}
                    <span>{t('Portfolio')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <Icon lib="bi" name="BiChat" /> <span>{t('Contact')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/store">
                    <Icon lib="fa" name="FaStoreAlt" />{' '}
                    <span>{t('Store')}</span>
                  </Link>
                </li>
              </ul>
              <Newest />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
