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
  EBlobAppSlogan,
  EBlobs,
  EContact,
  EDragAndDrop,
  EDragAndDropAppIntro,
  EJokes,
  ELanguageTitle,
  ELanguages,
  EPortfolio,
  EQuiz,
  ETestYourKnowledge,
} from '../interfaces'
import {
  ECategories,
  ECategory_en,
  EJokeType,
  ESafemode,
  ETheComediansCompanion,
  TCategoryByLanguages,
} from '../components/Jokes/interfaces'
import { EEdited, ENewest } from '../interfaces/welcome'
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
              <ul className={`${styles.list} ${styles.extras}`}>
                <li>
                  <Link to='/portfolio/draganddrop'>
                    <RiDragDropLine />
                    <span>{EDragAndDrop[language]}</span>
                  </Link>
                  <p>{EDragAndDropAppIntro[language]}</p>
                </li>
                <li>
                  <Link to='/portfolio/quiz'>
                    <MdOutlineQuiz />
                    <span>{EQuiz[language]}</span>
                  </Link>
                  <p>{ETestYourKnowledge[language]}</p>
                </li>
                <li>
                  <Link to='/portfolio/jokes'>
                    <GiAbstract019 />
                    <span>{EJokes[language]}</span>
                  </Link>
                  <p>{ETheComediansCompanion[language]}</p>
                </li>
                <li>
                  <Link to='/portfolio/blob'>
                    <RiDragMove2Fill />
                    <span>{EBlobs[language]}</span>
                  </Link>
                  <p>{EBlobAppSlogan[language]}</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
