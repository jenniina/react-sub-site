import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectMode } from './reducers/difficultyReducer'
import { addQuiz } from './reducers/quizReducer'
import { useSelector } from 'react-redux'
import Hero from '../Hero/Hero'
import styles from './css/quiz.module.css'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { IHighscore } from './interfaces'
import {
  ELanguages,
  ELoading,
  ENote,
  ETryTappingTheShapes,
  ReducerProps,
} from '../../interfaces'
import { initializeUser } from '../../reducers/authReducer'
import { FaStar } from 'react-icons/fa'
import { getUserQuiz } from './reducers/quizReducer'
import {
  EChooseDifficulty,
  EEasy,
  EHard,
  EMedium,
  EQuestionsAreInEnglish,
  EQuizQuestions15AreFetchedFrom,
  ETestYourGeneralKnowledgeWithThese15Questions,
  EUserCanChooseTheDifficultyLevel,
  EUserCanRegisterAndLoginToSaveHighscores,
} from '../../interfaces/quiz'
// import LoginRegisterCombo from './components/LoginRegisterCombo'

const LoginRegisterCombo = lazy(() => import('./components/LoginRegisterCombo'))

const QuizStart = ({
  heading,
  text,
  type,
  language,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
}) => {
  const navigate = useNavigate()
  const { points, highscores, finalSeconds } = useSelector(
    (state: ReducerProps) => state.questions
  )
  const [highscoresLocal, setHighscores] = useState<IHighscore>(highscores)

  const dispatch = useAppDispatch()

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  useEffect(() => {
    if (user?._id && points !== 0 && finalSeconds !== 0) {
      dispatch(getUserQuiz(user._id)).then((r) => {
        if (r !== null) {
          setHighscores(r.highscores)
        } else if (
          r === null &&
          localStorage.getItem(`${isLocalhost ? 'local-' : ''}quiz-highscores`)
        ) {
          const highscoresLocal = JSON.parse(
            localStorage.getItem(
              `${isLocalhost ? 'local-' : ''}quiz-highscores`
            ) as string
          )
          dispatch(addQuiz({ highscores: highscoresLocal, user: user._id }))
        }
      })
    }
  }, [user])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(selectMode((e.target as HTMLButtonElement).value))
    navigate(`/portfolio/quiz/${(e.target as HTMLButtonElement).value}`)
  }

  return (
    <>
      <Hero
        language={language}
        address='portfolio'
        heading={heading}
        text={text}
        reset='Reset'
        instructions={ETryTappingTheShapes[language]}
      />
      <section className={`card`}>
        <div>
          <div className={`medium ${styles.features}`}>
            <h2>Features</h2>
            <ul className='ul'>
              <li>
                {EQuizQuestions15AreFetchedFrom[language]}{' '}
                <a href='https://the-trivia-api.com'>"the Trivia Api"</a>
              </li>
              <li>
                {ENote[language]} {EQuestionsAreInEnglish[language]}
              </li>
              <li>{EUserCanChooseTheDifficultyLevel[language]}</li>
              <li>{EUserCanRegisterAndLoginToSaveHighscores[language]}</li>
            </ul>
            <a href='https://github.com/jenniina/react-sub-site/tree/main/src/components/Quiz'>
              Github
            </a>
          </div>
          <div className={`start-screen ${styles.quiz}`}>
            <h2>{ETestYourGeneralKnowledgeWithThese15Questions[language]}</h2>
            <p>{EChooseDifficulty[language]}:</p>
            <div className={`${styles.difficulty}`}>
              <button
                className={`${styles.mode} ${styles.easy}`}
                value='easy'
                onClick={(e) => handleClick(e)}
              >
                {EEasy[language]} <FaStar />
              </button>
              <button
                className={`${styles.mode} ${styles.medium}`}
                value='medium'
                onClick={(e) => handleClick(e)}
              >
                {EMedium[language]} <FaStar />
                <FaStar />
              </button>
              <button
                className={`${styles.mode} ${styles.hard}`}
                value='hard'
                onClick={(e) => handleClick(e)}
              >
                {EHard[language]} <FaStar />
                <FaStar />
                <FaStar />
              </button>
            </div>
          </div>
          <Suspense
            fallback={
              <div className='flex center margin0auto textcenter'>
                {ELoading[language]}...
              </div>
            }
          >
            <LoginRegisterCombo
              language={language}
              user={user}
              highscoresLocal={highscoresLocal}
              text='quizstart'
            />
          </Suspense>{' '}
        </div>
      </section>
    </>
  )
}

export default QuizStart
