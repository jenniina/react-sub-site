import { firstToUpperCase } from '../../utils'
import styles from '../../pages/css/portfolio.module.css'
import { Link } from 'react-router-dom'
import Icon from '../Icon/Icon'
import Accordion from '../Accordion/Accordion'
import MemorySVG from '../Memory/components/MemorySVG'

import { useLanguageContext } from '../../contexts/LanguageContext'

export default function Portfolio() {
  const { t } = useLanguageContext()

  return (
    <section className={`card ${styles.card}`}>
      <div>
        <div className={styles.notes}>
          <p className={styles.introparagraph}>
            {t('ThisSiteFocusesOnReactApplications')} <br /> <br />
            <a href="https://jenniina.fi/#portfolio">{t('MainSite')}</a>
            <br />
            <br />
            {t('PleaseReportAnyIssuesWithTheSiteToJenniina')}:{' '}
            <Link to="/portfolio/select?survey=true">
              {t('Survey').toLowerCase()}
            </Link>{' '}
          </p>
          <h2>React Apps</h2>

          <p>{t('ReactSpecificAppsMadeWithViteAndTypescript')}</p>
          <Accordion
            text={t('Dependencies')}
            className="dependencies"
            wrapperClass="dependencies-wrap"
          >
            <>
              <p id="list-libraries-label">{t('Dependencies')}:</p>
              <ul id="list-libraries" aria-labelledby="list-libraries-label">
                <li>react-icons</li>
                <li>react-dom</li>
                <li>react-router-dom</li>
                <li>react-redux</li>
                <li>@reduxjs/toolkit</li>
                <li>axios</li>
                <li>uuid</li>
              </ul>
              <p id="list-libraries-label2">{t('Dependencies')} (Node.js):</p>
              <ul id="list-libraries2" aria-labelledby="list-libraries-label2">
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
            <Link to="/portfolio/media">
              <Icon lib="io" name="IoMdImages" />
              <span>{t('Media')}</span>
            </Link>
            <p>{t('MediaWithQuotesOrPoems')}</p>
          </li>
          <li>
            <Link to="/portfolio/colors">
              <Icon lib="bi" name="BiSolidColorFill" />
              <span>{t('ColorAccessibility')}</span>
            </Link>
            <p>{t('WCAGTool')}</p>
          </li>
          <li>
            <Link to="/portfolio/memory">
              <MemorySVG size="50" />
              <span>{t('MemoryGame')}</span>
            </Link>
            <p>{t('MemoryGameIntro')}</p>
          </li>
          <li>
            <Link to="/portfolio/composer">
              <Icon lib="bs" name="BsMusicNoteBeamed" />
              <span>
                {t('ComposerOlliSanta')} ({t('Website')})
              </span>
            </Link>
            <p>
              {t('ComposerIntro1')} {t('ComposerIntro2')}
            </p>
          </li>
          <li>
            <Link to="/portfolio/blob">
              <Icon lib="ri" name="RiDragMove2Fill" />
              <span>{t('BlobArtApp')}</span>
            </Link>
            <p>
              {t('BlobAppSlogan')}. {t('BlobAppIntro')}
            </p>
          </li>
          <li>
            <Link to="/portfolio/jokes">
              <Icon lib="gi" name="GiAbstract019" />
              <span>{t('TheComediansCompanion')}</span>
            </Link>
            <p>
              {t('JokesAppIntro')}{' '}
              {firstToUpperCase(t('SubmitAJoke').toLowerCase())}.{' '}
              {t('SeeLocalJokes')}.
            </p>
          </li>
          <li>
            <Link to="/portfolio/quiz">
              <Icon lib="md" name="MdOutlineQuiz" />
              <span>{t('QuizApp')}</span>
            </Link>
            <p>{t('QuizAppIntro')}</p>
          </li>
          <li>
            <Link to="/portfolio/select">
              <Icon lib="bi" name="BiSelectMultiple" />
              <span>{t('CustomSelect')}</span>
            </Link>
            <p>{t('CustomSelectIntro')}</p>
          </li>
          <li>
            <Link to="/portfolio/graphql">
              <Icon lib="gr" name="GrGraphQl" />
              <span>GraphQL</span>
            </Link>
            <p>{t('GraphQLSite')}</p>
          </li>
          <li>
            <Link to="/portfolio/salon">
              <Icon lib="gi" name="GiComb" />
              <span>{t('HairSalonWebsite')}</span>
            </Link>
            <p>{t('Website')}: Parturi Kampaamo Hannastiina</p>
          </li>
          <li>
            <Link to="/portfolio/draganddrop">
              <Icon lib="ri" name="RiDragDropLine" />
              <span>{t('DragAndDrop')}</span>
            </Link>
            <p>{t('DragAndDropAppIntro')}</p>
          </li>
          <li>
            <Link to="/portfolio/todo">
              <Icon lib="ri" name="RiTodoLine" />
              <span>{t('TodoApp')}</span>
            </Link>
            <p>{t('TodoAppIntro')}</p>
          </li>
          <li className={styles.multistep}>
            <Link to="/portfolio/form">
              <Icon lib="ai" name="AiOutlineForm" />
              <span>{t('MultistepForm')}</span>
            </Link>
            <p>{t('MultistepFormIntro')}</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
