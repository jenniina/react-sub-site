import { useTheme } from '../../hooks/useTheme'
import { firstToUpperCase } from '../../utils'
import {
  EBlobAppIntro,
  EBlobAppSlogan,
  ECustomSelect,
  ECustomSelectIntro,
  EDependencies,
  EDragAndDrop,
  EDragAndDropAppIntro,
  EGraphQLSite,
  EHairSalonWebsite,
  EJokesAppIntro,
  ELanguages,
  EMainSite,
  EMultistepForm,
  EMultistepFormIntro,
  EPleaseReportAnyIssuesWithTheSiteToJenniina,
  EQuizApp,
  EQuizAppIntro,
  EReactSpecificAppsMadeWithViteAndTypescript,
  ESurvey,
  EThisSiteFocusesOnReactApplications,
  ETodoAppIntro,
  EWebsite,
} from '../../interfaces'

import styles from '../../pages/css/portfolio.module.css'
import { Link } from 'react-router-dom'
import { AiOutlineForm } from 'react-icons/ai'
import { BiSelectMultiple, BiSolidColorFill } from 'react-icons/bi'
import { RiTodoLine, RiDragDropLine, RiDragMove2Fill } from 'react-icons/ri'
import { IoMdImages } from 'react-icons/io'
import { GiAbstract019, GiComb } from 'react-icons/gi'
import { MdOutlineQuiz } from 'react-icons/md'
import { GrGraphQl } from 'react-icons/gr'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import {
  EComposerOlliSanta,
  EComposerIntro1,
  EComposerIntro2,
} from '../../interfaces/composer'
import { ESeeLocalJokes, ESubmitAJoke, ETheComediansCompanion } from '../Jokes/interfaces'
import { ETodoApp } from '../Todo/interfaces'
import { EBlobArtApp } from '../../interfaces/about'
import Accordion from '../Accordion/Accordion'
import { EColorAccessibility, ETestColorCombinations } from '../../interfaces/colors'
import { EMemoryGame, EMemoryGameIntro } from '../../interfaces/memory'
import MemorySVG from '../Memory/components/MemorySVG'
import { EMedia, EMediaWithQuotesOrPoems } from '../../interfaces/images'

export default function Portfolio({ language }: { language: ELanguages }) {
  const lightTheme = useTheme()

  return (
    <section className={`card ${styles.card}`}>
      <div>
        <div className={styles.notes}>
          <p className={styles.introparagraph}>
            {EThisSiteFocusesOnReactApplications[language]} <br /> <br />
            <a href='https://jenniina.fi/#portfolio'>{EMainSite[language]}</a>
            <br />
            <br />
            {EPleaseReportAnyIssuesWithTheSiteToJenniina[language]}:{' '}
            <Link to='/portfolio/select?survey=true'>
              {ESurvey[language].toLowerCase()}
            </Link>{' '}
          </p>
          <h2>React Apps</h2>

          <p>{EReactSpecificAppsMadeWithViteAndTypescript[language]}</p>
          <Accordion
            language={language}
            text={EDependencies[language]}
            className='dependencies'
            wrapperClass='dependencies-wrap'
          >
            <>
              <p id='list-libraries-label'>{EDependencies[language]}:</p>
              <ul id='list-libraries' aria-labelledby='list-libraries-label'>
                <li>react-icons</li>
                <li>react-dom</li>
                <li>react-router-dom</li>
                <li>react-redux</li>
                <li>@reduxjs/toolkit</li>
                <li>axios</li>
                <li>uuid</li>
              </ul>
              <p id='list-libraries-label2'>{EDependencies[language]} (Node.js):</p>
              <ul id='list-libraries2' aria-labelledby='list-libraries-label2'>
                <li>bcryptjs</li>
                <li>cors</li>
                <li>dotenv</li>
                <li>express</li>
                <li>express-validator</li>
                <li>flatted</li>
                <li>jsonwebtoken</li>
                <li>mongoose</li>
                <li>nodemailer</li>
                <li>puppeteer</li>
                <li>sanitize-html</li>
              </ul>
            </>
          </Accordion>
        </div>
        <ul className={`${styles.list}`}>
          <li>
            <Link to='/portfolio/media'>
              <IoMdImages />
              <span>{EMedia[language]}</span>
            </Link>
            <p>{EMediaWithQuotesOrPoems[language]}</p>
          </li>
          <li>
            <Link to='/portfolio/colors'>
              <BiSolidColorFill />
              <span>{EColorAccessibility[language]}</span>
            </Link>
            <p>{ETestColorCombinations[language]}</p>
          </li>
          <li>
            <Link to='/portfolio/memory'>
              <MemorySVG size='50' />
              <span>{EMemoryGame[language]}</span>
            </Link>
            <p>{EMemoryGameIntro[language]}</p>
          </li>
          <li>
            <Link to='/portfolio/composer'>
              <BsMusicNoteBeamed />
              <span>
                {EComposerOlliSanta[language]} ({EWebsite[language]})
              </span>
            </Link>
            <p>
              {EComposerIntro1[language]} {EComposerIntro2[language]}
            </p>
          </li>
          <li>
            <Link to='/portfolio/blob'>
              <RiDragMove2Fill />
              <span>{EBlobArtApp[language]}</span>
            </Link>
            <p>
              {EBlobAppSlogan[language]}. {EBlobAppIntro[language]}
            </p>
          </li>
          <li>
            <Link to='/portfolio/jokes'>
              <GiAbstract019 />
              <span>{ETheComediansCompanion[language]}</span>
            </Link>
            <p>
              {EJokesAppIntro[language]}{' '}
              {firstToUpperCase(ESubmitAJoke[language].toLowerCase())}.{' '}
              {ESeeLocalJokes[language]}.
            </p>
          </li>
          <li>
            <Link to='/portfolio/quiz'>
              <MdOutlineQuiz />
              <span>{EQuizApp[language]}</span>
            </Link>
            <p>{EQuizAppIntro[language]}</p>
          </li>
          <li>
            <Link to='/portfolio/select'>
              <BiSelectMultiple />
              <span>{ECustomSelect[language]}</span>
            </Link>
            <p>{ECustomSelectIntro[language]}</p>
          </li>
          <li>
            <Link to='/portfolio/graphql'>
              <GrGraphQl />
              <span>GraphQL</span>
            </Link>
            <p>{EGraphQLSite[language]}</p>
          </li>
          <li>
            <Link to='/portfolio/salon'>
              <GiComb />
              <span>{EHairSalonWebsite[language]}</span>
            </Link>
            <p>{EWebsite[language]}: Parturi Kampaamo Hannastiina</p>
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
  )
}
