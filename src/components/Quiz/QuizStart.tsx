import { useNavigate } from 'react-router-dom'
import { selectMode } from './reducers/difficultyReducer'
import { addQuiz } from './reducers/quizReducer'
import { useSelector } from 'react-redux'
import styles from './css/quiz.module.css'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { IHighscore, IQuizHighscore } from './types'
import { ReducerProps } from '../../types'
import { initializeUser } from '../../reducers/authReducer'
import { FaStar } from 'react-icons/fa'
import { getUserQuiz } from './reducers/quizReducer'
import { useLanguageContext } from '../../contexts/LanguageContext'
import LoginRegisterCombo from './components/LoginRegisterCombo'

const QuizStart = () => {
  const { t } = useLanguageContext()

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
    void dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    if (user?._id && points !== 0 && finalSeconds !== 0) {
      void dispatch(getUserQuiz(user._id)).then((r: IQuizHighscore | null) => {
        if (r !== null) {
          setHighscores(r.highscores)
        } else if (r === null && localStorage.getItem(`quiz-highscores`)) {
          const highscoresLocal = JSON.parse(
            localStorage.getItem(`quiz-highscores`)!
          ) as IHighscore
          void dispatch(
            addQuiz({ highscores: highscoresLocal, user: user._id })
          )
        }
      })
    }
  }, [user, points, finalSeconds, dispatch])

  const handleClick = (value: string) => {
    void dispatch(selectMode(value))
    navigate(`/portfolio/quiz/difficulty/${value}`)
  }

  return (
    <>
      <section className={`card`}>
        <div>
          <div className={`medium ${styles.features}`}>
            <h2>Features</h2>
            <ul className="ul">
              <li>
                {t('QuizQuestions15AreFetchedFrom')}{' '}
                <a href="https://the-trivia-api.com">
                  &quot;the Trivia Api&quot;
                </a>
              </li>
              <li>
                {t('Note')} {t('QuestionsAreInEnglish')}
              </li>
              <li>{t('UserCanChooseTheDifficultyLevel')}</li>
              <li>{t('UserCanRegisterAndLoginToSaveHighscores')}</li>
            </ul>
            <a href="https://github.com/jenniina/react-sub-site/tree/main/src/components/Quiz">
              Github
            </a>
          </div>
          <div className={`start-screen ${styles.quiz}`}>
            <h2>{t('TestYourGeneralKnowledgeWithThese15Questions')}</h2>
            <p>{t('ChooseDifficulty')}:</p>
            <div className={`${styles.difficulty}`}>
              <button
                className={`${styles.mode} ${styles.easy}`}
                onClick={() => handleClick('easy')}
              >
                {t('Easy')} <FaStar />
              </button>
              <button
                className={`${styles.mode} ${styles.medium}`}
                onClick={() => handleClick('medium')}
              >
                {t('Medium')} <FaStar />
                <FaStar />
              </button>
              <button
                className={`${styles.mode} ${styles.hard}`}
                onClick={() => handleClick('hard')}
              >
                {t('Hard')} <FaStar />
                <FaStar />
                <FaStar />
              </button>
            </div>
          </div>
          <LoginRegisterCombo
            user={user}
            highscoresLocal={highscoresLocal}
            text="quizstart"
          />
        </div>
      </section>
    </>
  )
}

export default QuizStart
