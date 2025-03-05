import { lazy, Suspense, useContext } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/welcome.module.css'
import { BiChat } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { IoMdImages } from 'react-icons/io'
import { FaStoreAlt } from 'react-icons/fa'
import { ELanguages, ELanguagesLong } from '../types'
import { Select, SelectOption } from '../components/Select/Select'
import { LanguageContext } from '../contexts/LanguageContext'

const Newest = lazy(() => import('../components/Newest/Newest'))

export default function Home({
  heading,
  text,
  type,
  language,
  setLanguage,
  options,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
  setLanguage: (language: ELanguages) => void
  options: (enumObj: typeof ELanguagesLong) => SelectOption[]
}) {
  const { t } = useContext(LanguageContext)!

  const lightTheme = useTheme()

  return (
    <div className={`welcome ${type} ${lightTheme ? styles.light : ''}`}>
      <Select
        language={language}
        id='language-welcome'
        className={`${styles['language-welcome']} ${styles.language} language`}
        instructions={`${t('EChangeLanguage')}:`}
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
      <div className='inner-wrap'>
        <section className={`card ${styles.welcome}`}>
          <div>
            <ul className={styles.list}>
              <li className={styles['li-about']}>
                <Link to='/about'>
                  <BsPerson /> <span>{t('EAbout')}</span>
                </Link>
              </li>
              <li>
                <Link to='/portfolio'>
                  <IoMdImages /> <span>{t('EPortfolio')}</span>
                </Link>
              </li>
              <li>
                <Link to='/contact'>
                  <BiChat /> <span>{t('EContact')}</span>
                </Link>
              </li>
              <li>
                <Link to='/store'>
                  <FaStoreAlt /> <span>{t('EStore')}</span>
                </Link>
              </li>
            </ul>
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {t('ELoading')}...
                </div>
              }
            >
              <Newest language={language} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}
