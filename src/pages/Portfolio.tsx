import { useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import {
  EBlobAppIntro,
  ECustomSelect,
  ECustomSelectIntro,
  EDependencies,
  EDragAndDrop,
  EDragAndDropAppIntro,
  EDraggableBlobs,
  EJokesAppIntro,
  ELanguages,
  EMainSite,
  EMultistepForm,
  EMultistepFormIntro,
  EQuizApp,
  EQuizAppIntro,
  EReactSpecificAppsMadeWithViteAndTypescript,
  EThisSiteFocusesOnReactApplications,
  ETodoAppIntro,
  RefObject,
} from '../interfaces'
import styles from './css/portfolio.module.css'
import Hero from '../components/Hero/Hero'
import { Link } from 'react-router-dom'
import { AiOutlineForm } from 'react-icons/ai'
import { BiSelectMultiple } from 'react-icons/bi'
import { RiTodoLine, RiDragDropLine, RiDragMove2Fill } from 'react-icons/ri'
import { GiAbstract019 } from 'react-icons/gi'
import { MdOutlineQuiz } from 'react-icons/md'
import { ETheComediansCompanion } from '../components/Jokes/interfaces'
import { ETodoApp } from '../components/Todo/interfaces'

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
  const form = useRef() as RefObject<HTMLFormElement>

  const lightTheme = useTheme()

  return (
    <div className={`portfolio ${type} ${lightTheme ? styles.light : ''}`}>
      <Hero address='portfolio' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className={`card`}>
          <div>
            <div className={styles.notes}>
              <p className={styles.introparagraph}>
                {EThisSiteFocusesOnReactApplications[language]} <br /> <br />
                <a href='https://jenniina.fi/#portfolio'>{EMainSite[language]}</a>
              </p>
              <h2>React Apps</h2>

              <p>{EReactSpecificAppsMadeWithViteAndTypescript[language]}</p>
              <label htmlFor='list-libraries'>{EDependencies[language]}:</label>
              <ul id='list-libraries'>
                <li>react-icons</li>
                <li>react-dom</li>
                <li>react-router-dom</li>
                <li>react-redux</li>
                <li>@reduxjs/toolkit</li>
                <li>axios</li>
                <li>uuid</li>
                <li>lodash</li>
              </ul>
            </div>
            <ul className={`${styles.list}`}>
              <li>
                <Link to='/portfolio/quiz'>
                  <MdOutlineQuiz />
                  <span>{EQuizApp[language]}</span>
                </Link>
                <p>{EQuizAppIntro[language]}</p>
              </li>
              <li>
                <Link to='/portfolio/jokes'>
                  <GiAbstract019 />
                  <span>{ETheComediansCompanion[language]}</span>
                </Link>
                <p>{EJokesAppIntro[language]}</p>
              </li>
              <li>
                <Link to='/portfolio/blob'>
                  <RiDragMove2Fill />
                  <span>{EDraggableBlobs[language]}</span>
                </Link>
                <p>{EBlobAppIntro[language]}</p>
              </li>
              <li>
                <Link to='/portfolio/draganddrop'>
                  <RiDragDropLine />
                  <span>{EDragAndDrop[language]}</span>
                </Link>
                <p>{EDragAndDropAppIntro[language]}</p>
              </li>
              <li>
                <Link to='/portfolio/todo'>
                  <RiTodoLine />
                  <span>{ETodoApp[language]}</span>
                </Link>
                <p>{ETodoAppIntro[language]}</p>
              </li>
              <li>
                <Link to='/portfolio/select'>
                  <BiSelectMultiple />
                  <span>{ECustomSelect[language]}</span>
                </Link>
                <p>{ECustomSelectIntro[language]}</p>
              </li>
              <li className={styles.multistep}>
                <Link to='/portfolio/form'>
                  <AiOutlineForm />
                  <span>{EMultistepForm[language]}</span>
                </Link>
                <p>{EMultistepFormIntro[language]}</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
