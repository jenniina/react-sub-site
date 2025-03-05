import { useTheme } from '../../hooks/useTheme'
import { firstToUpperCase } from '../../utils'
import { ELanguages } from '../../types'
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
import Accordion from '../Accordion/Accordion'
import MemorySVG from '../Memory/components/MemorySVG'
import { useContext } from 'react'
import { LanguageContext } from '../../contexts/LanguageContext'

export default function Portfolio({ language }: { language: ELanguages }) {
  const { t } = useContext(LanguageContext)!

  const lightTheme = useTheme()

  return (
    <section className={`card ${styles.card}`}>
      <div>
        <div className={styles.notes}>
          <p className={styles.introparagraph}>
            {t('EThisSiteFocusesOnReactApplications')} <br /> <br />
            <a href='https://jenniina.fi/#portfolio'>{t('EMainSite')}</a>
            <br />
            <br />
            {t('EPleaseReportAnyIssuesWithTheSiteToJenniina')}:{' '}
            <Link to='/portfolio/select?survey=true'>{t('ESurvey').toLowerCase()}</Link>{' '}
          </p>
          <h2>React Apps</h2>

          <p>{t('EReactSpecificAppsMadeWithViteAndTypescript')}</p>
          <Accordion
            language={language}
            text={t('EDependencies')}
            className='dependencies'
            wrapperClass='dependencies-wrap'
          >
            <>
              <p id='list-libraries-label'>{t('EDependencies')}:</p>
              <ul id='list-libraries' aria-labelledby='list-libraries-label'>
                <li>react-icons</li>
                <li>react-dom</li>
                <li>react-router-dom</li>
                <li>react-redux</li>
                <li>@reduxjs/toolkit</li>
                <li>axios</li>
                <li>uuid</li>
              </ul>
              <p id='list-libraries-label2'>{t('EDependencies')} (Node.js):</p>
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
                <li>sanitize-html</li>
              </ul>
            </>
          </Accordion>
        </div>
        <ul className={`${styles.list}`}>
          <li>
            <Link to='/portfolio/media'>
              <IoMdImages />
              <span>{t('EMedia')}</span>
            </Link>
            <p>{t('EMediaWithQuotesOrPoems')}</p>
          </li>
          <li>
            <Link to='/portfolio/colors'>
              <BiSolidColorFill />
              <span>{t('EColorAccessibility')}</span>
            </Link>
            <p>{t('ETestColorCombinations')}</p>
          </li>
          <li>
            <Link to='/portfolio/memory'>
              <MemorySVG size='50' />
              <span>{t('EMemoryGame')}</span>
            </Link>
            <p>{t('EMemoryGameIntro')}</p>
          </li>
          <li>
            <Link to='/portfolio/composer'>
              <BsMusicNoteBeamed />
              <span>
                {t('EComposerOlliSanta')} ({t('EWebsite')})
              </span>
            </Link>
            <p>
              {t('EComposerIntro1')} {t('EComposerIntro2')}
            </p>
          </li>
          <li>
            <Link to='/portfolio/blob'>
              <RiDragMove2Fill />
              <span>{t('EBlobArtApp')}</span>
            </Link>
            <p>
              {t('EBlobAppSlogan')}. {t('EBlobAppIntro')}
            </p>
          </li>
          <li>
            <Link to='/portfolio/jokes'>
              <GiAbstract019 />
              <span>{t('ETheComediansCompanion')}</span>
            </Link>
            <p>
              {t('EJokesAppIntro')} {firstToUpperCase(t('ESubmitAJoke').toLowerCase())}.{' '}
              {t('ESeeLocalJokes')}.
            </p>
          </li>
          <li>
            <Link to='/portfolio/quiz'>
              <MdOutlineQuiz />
              <span>{t('EQuizApp')}</span>
            </Link>
            <p>{t('EQuizAppIntro')}</p>
          </li>
          <li>
            <Link to='/portfolio/select'>
              <BiSelectMultiple />
              <span>{t('ECustomSelect')}</span>
            </Link>
            <p>{t('ECustomSelectIntro')}</p>
          </li>
          <li>
            <Link to='/portfolio/graphql'>
              <GrGraphQl />
              <span>GraphQL</span>
            </Link>
            <p>{t('EGraphQLSite')}</p>
          </li>
          <li>
            <Link to='/portfolio/salon'>
              <GiComb />
              <span>{t('EHairSalonWebsite')}</span>
            </Link>
            <p>{t('EWebsite')}: Parturi Kampaamo Hannastiina</p>
          </li>
          <li>
            <Link to='/portfolio/draganddrop'>
              <RiDragDropLine />
              <span>{t('EDragAndDrop')}</span>
            </Link>
            <p>{t('EDragAndDropAppIntro')}</p>
          </li>
          <li>
            <Link to='/portfolio/todo'>
              <RiTodoLine />
              <span>{t('ETodoApp')}</span>
            </Link>
            <p>{t('ETodoAppIntro')}</p>
          </li>
          <li className={styles.multistep}>
            <Link to='/portfolio/form'>
              <AiOutlineForm />
              <span>{t('EMultistepForm')}</span>
            </Link>
            <p>{t('EMultistepFormIntro')}</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
