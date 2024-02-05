import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/welcome.module.css'
import Hero from '../components/Hero/Hero'
import { BiChat } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { IoMdImages } from 'react-icons/io'
import { GiAbstract019 } from 'react-icons/gi'
import { MdOutlineQuiz } from 'react-icons/md'
import { RiDragDropLine, RiDragMove2Fill } from 'react-icons/ri'
import {
  EAbout,
  EBlobs,
  EContact,
  ELanguageTitle,
  ELanguages,
  EPortfolio,
  EQuiz,
  EQuizAppIntro,
  ETestYourKnowledge,
} from '../interfaces'
import {
  ECategories,
  EJokeType,
  ESafemode,
  ETheComediansCompanion,
  TCategoryByLanguages,
} from '../components/Jokes/interfaces'
import {
  EAddedNewFeatures,
  EBugFixes,
  EDecember,
  EEdited,
  EFebruary,
  ENewest,
  EOctober,
  EOptimizing,
} from '../interfaces/welcome'
import { Select, SelectOption } from '../components/Select/Select'

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
  options: (
    enumObj: typeof ECategories | typeof EJokeType | typeof ESafemode | typeof ELanguages
  ) => SelectOption[]
}) {
  const lightTheme = useTheme()

  return (
    <div className={`welcome ${type} ${lightTheme ? styles.light : ''}`}>
      <Hero language={language} address='welcome' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className={`card`}>
          <div>
            <ul className={styles.list}>
              <li>
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
            </ul>
            <Select
              language={language}
              id='language-welcome'
              className={`language ${styles.language}`}
              instructions={ELanguageTitle[language]}
              hide
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
            <div className={`${styles.newest}`}>
              <h2 className={`${styles.subheading}`}>
                {ENewest[language]} / {EEdited[language]}
              </h2>
              <ul className={`${styles.extras}`}>
                <li>
                  <strong>2024</strong>
                  <ul>
                    <li>
                      {EFebruary[language]}
                      <Link to='/portfolio/blob'>
                        <RiDragMove2Fill />
                        {EBlobs[language]}:
                      </Link>{' '}
                      <i>
                        {EBugFixes[language]}. {EOptimizing[language]}
                      </i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>2023</strong>
                  <ul>
                    <li>
                      {EDecember[language]}
                      <Link to='/portfolio/jokes'>
                        <GiAbstract019 />
                        {ETheComediansCompanion[language]}:
                      </Link>{' '}
                      <i>
                        {EAddedNewFeatures[language]}. {EOptimizing[language]}
                      </i>
                    </li>
                    <li>
                      {EOctober[language]}
                      <Link to='/portfolio/quiz'>
                        <MdOutlineQuiz />
                        {EQuiz[language]}:
                      </Link>{' '}
                      <i>
                        {ETestYourKnowledge[language]}; {EQuizAppIntro[language]}
                      </i>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
