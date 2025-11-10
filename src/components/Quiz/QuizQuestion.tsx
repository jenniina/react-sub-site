import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { getQuestions, newAnswer } from './reducers/questionsReducer'
import { ELanguages, ReducerProps } from '../../types'
import Progress from './components/Progress'
import Loader from './components/Loader'
import Next from './components/Next'
import Message from './components/Message'
import Timer from './components/Timer'
import styles from '../../components/Quiz/css/quiz.module.css'
import { useLanguageContext } from '../../contexts/LanguageContext'

const QuizQuestion = ({ language }: { language: ELanguages }) => {
  const { t } = useLanguageContext()

  const { difficulty } = useParams()
  const { mode } = useSelector((state: ReducerProps) => state.difficulty)
  const { currentQuestion, answer, index, status } = useSelector(
    (state: ReducerProps) => state.questions
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getQuestions(mode))
  }, [])

  const question = currentQuestion?.question
  const options = currentQuestion?.options
  const answered = answer !== null

  const navigate = useNavigate()

  const goToMainPage = () => {
    navigate('/portfolio/quiz')
  }

  return (
    <section className={`card ${styles.top}`}>
      <div>
        <div className={`${styles.quiz} `}>
          {status === 'loading' && (
            <>
              <a href="#" onClick={goToMainPage}>
                &laquo;&nbsp;{t('QuizApp')}
              </a>
              <Loader language={language} />
            </>
          )}
          {status === 'error' && (
            <>
              <a href="#" onClick={goToMainPage}>
                &laquo;&nbsp;{t('QuizApp')}
              </a>
              <Message type="error" message={t('ErrorFetchingQuestions')} />
            </>
          )}
          {status === 'ready' && (
            <>
              <h1 className={styles.h1}>
                <a href="#" onClick={goToMainPage}>
                  &laquo;&nbsp;{t('QuizApp')}
                </a>
              </h1>
              <h2>{t('QuizInProgress')}</h2>

              <Progress language={language} />

              <div className={styles.wrap}>
                <div className={`${styles.diff}`}>
                  {t('Difficulty')}: {difficulty}
                </div>
                <h2 className={`${styles.question}`}>{question}</h2>
                <div className={`${styles.options}`}>
                  {options?.map(option => {
                    return (
                      <button
                        key={option}
                        className={`${answer === option ? styles.answer : ''} 
            ${
              answered
                ? currentQuestion.correctAnswer === option
                  ? styles.correct
                  : ''
                : ''
            } 
            ${answered ? styles.disabled : ''}
            `}
                        disabled={answered}
                        onClick={() => dispatch(newAnswer(option))}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
              <footer>
                <Timer />
                {answer && <Next language={language} />}
              </footer>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
export default QuizQuestion
