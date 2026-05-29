import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { getQuestions, newAnswer } from './reducers/questionsReducer'
import { ReducerProps } from '../../types'
import Progress from './components/Progress'
import Loader from './components/Loader'
import Next from './components/Next'
import Message from './components/Message'
import Timer from './components/Timer'
import styles from '../../components/Quiz/css/quiz.module.css'
import { useLanguageContext } from '../../contexts/LanguageContext'
import ButtonUnavailableAction from '../ButtonUnavailableAction/ButtonUnavailableAction'

const QuizQuestion = () => {
  const { t } = useLanguageContext()

  const { difficulty } = useParams()
  const { mode } = useSelector((state: ReducerProps) => state.difficulty)
  const { currentQuestion, answer, status } = useSelector(
    (state: ReducerProps) => state.questions ?? {}
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getQuestions(mode))
  }, [dispatch, mode])

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
        <div id="quiz" className={`${styles.quiz}`}>
          {status === 'loading' && (
            <>
              <button onClick={goToMainPage}>
                &laquo;&nbsp;{t('QuizApp')}
              </button>
              <Loader />
            </>
          )}
          {status === 'error' && (
            <>
              <button onClick={goToMainPage}>
                &laquo;&nbsp;{t('QuizApp')}
              </button>
              <Message type="error" message={t('ErrorFetchingQuestions')} />
            </>
          )}
          {status === 'ready' && (
            <>
              <h1 className={styles.h1}>
                <button onClick={goToMainPage}>
                  &laquo;&nbsp;{t('QuizApp')}
                </button>
              </h1>
              <h2>{t('QuizInProgress')}</h2>

              <Progress />

              <div className={styles.wrap}>
                <div className={`${styles.diff}`}>
                  {t('Difficulty')}: {difficulty}
                </div>
                <h2 className={`${styles.question}`}>{question}</h2>
                <div className={`${styles.options}`}>
                  {options?.map((option) => {
                    return (
                      <ButtonUnavailableAction
                        key={option}
                        className={`${answer === option ? styles.answer : ''} 
            ${
              answered && option === currentQuestion?.correctAnswer
                ? styles.correct
                : ''
            } 
            ${answered ? styles.disabled : ''}
            `}
                        unavailable={answered}
                        unavailableReason={
                          answered ? t('QuestionAlreadyAnswered') : ''
                        }
                        onClick={() => dispatch(newAnswer(option))}
                      >
                        {option}
                      </ButtonUnavailableAction>
                    )
                  })}
                </div>
              </div>
              <footer>
                <Timer />
                {answer && <Next />}
              </footer>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
export default QuizQuestion
