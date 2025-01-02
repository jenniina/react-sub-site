import { lazy, Suspense } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/welcome.module.css'
import Hero from '../components/Hero/Hero'
import { BiChat } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { IoMdImages } from 'react-icons/io'
import { FaStoreAlt } from 'react-icons/fa'
import {
  EAbout,
  EChangeLanguage,
  EContact,
  ELanguages,
  EPortfolio,
  EStore,
  ELoading,
} from '../types'
import {
  ECategories,
  EJokeType,
  ESafemode,
  TCategoryByLanguages,
} from '../components/Jokes/types'
import { Select, SelectOption } from '../components/Select/Select'

const Newest = lazy(() => import('../components/Newest/Newest'))

export default function Home({
  heading,
  text,
  type,
  language,
  setLanguage,
  getKeyByValue,
  options,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
  setLanguage: (language: ELanguages) => void
  getKeyByValue: (
    enumObj:
      | TCategoryByLanguages
      | typeof EJokeType
      | typeof ESafemode
      | typeof ELanguages,
    value: ECategories | EJokeType | ESafemode | ELanguages
  ) => string | undefined
  options: (enumObj: typeof ELanguages) => SelectOption[]
}) {
  const lightTheme = useTheme()

  return (
    <div className={`welcome ${type} ${lightTheme ? styles.light : ''}`}>
      <Select
        language={language}
        id='language-welcome'
        className={`${styles['language-welcome']} ${styles.language} language`}
        instructions={`${EChangeLanguage[language]}:`}
        options={options(ELanguages)}
        value={
          language
            ? ({
                value: language,
                label: getKeyByValue(ELanguages, language),
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
                  <BsPerson /> <span>{EAbout[language]}</span>
                </Link>
              </li>
              <li>
                <Link to='/portfolio'>
                  <IoMdImages /> <span>{EPortfolio[language]}</span>
                </Link>
              </li>
              <li>
                <Link to='/contact'>
                  <BiChat /> <span>{EContact[language]}</span>
                </Link>
              </li>
              <li>
                <Link to='/store'>
                  <FaStoreAlt /> <span>{EStore[language]}</span>
                </Link>
              </li>
            </ul>
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {ELoading[language]}...
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
