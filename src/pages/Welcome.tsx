import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/welcome.module.css'
import Icon from '../components/Icon/Icon'
import { ELanguages, ELanguagesLong } from '../types'
import { Select, SelectOption } from '../components/Select/Select'
import { useLanguageContext } from '../contexts/LanguageContext'
import SEO from '../components/SEO/SEO'
// import Newest from '../components/Newest/Newest'
import About from './About'
import Featured from '../components/Featured/Featured'

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
      <SEO
        title={`${t('Welcome')} ${t('ToTheReactSiteOfJenniinaFi')} | Jenniina Laine`}
        description={`${t('Welcome')} | ${t('AboutThisSite')}`}
        canonicalUrl={'https://react.jenniina.fi/'}
      />
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
          onChange={(o) => {
            setLanguage(o?.value as ELanguages)
          }}
        />
        <div className={`${styles.welcome} mt2`}>
          <div>
            <ul className={styles.list}>
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
                  <Icon lib="fa" name="FaStoreAlt" /> <span>{t('Store')}</span>
                </Link>
              </li>
            </ul>
            {/* <Newest /> */}
          </div>
          <Featured />
          <About type="page" />
        </div>
      </div>
    </>
  )
}
