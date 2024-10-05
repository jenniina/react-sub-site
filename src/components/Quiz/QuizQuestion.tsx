import { useEffect, lazy, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { getQuestions, newAnswer } from './reducers/questionsReducer'
import { ELanguages, ELoading, EQuizApp, ReducerProps } from '../../interfaces'
// import Progress from './components/Progress'
// import Timer from './components/Timer'
import Loader from './components/Loader'
import Next from './components/Next'
import Message from './components/Message'
import styles from '../../components/Quiz/css/quiz.module.css'
import {
  EDifficulty,
  EErrorFetchingQuestions,
  EQuizInProgress,
} from '../../interfaces/quiz'

const Progress = lazy(() => import('./components/Progress'))
const Timer = lazy(() => import('./components/Timer'))

const QuizQuestion = ({ language }: { language: ELanguages }) => {
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
          {status === 'loading' && <Loader language={language} />}
          {status === 'error' && (
            <Message type='error' message={EErrorFetchingQuestions[language]} />
          )}
          {status === 'ready' && (
            <>
              <h1 className={styles.h1}>
                <a href='#' onClick={goToMainPage}>
                  &laquo;&nbsp;{EQuizApp[language]}
                </a>
              </h1>
              <h2>{EQuizInProgress[language]}</h2>
              <Suspense
                fallback={
                  <div className='flex center margin0auto'>{ELoading[language]}...</div>
                }
              >
                <Progress language={language} />
              </Suspense>
              <div className={styles.wrap}>
                <div className={`${styles.diff}`}>
                  {EDifficulty[language]}: {difficulty}
                </div>
                <h2 className={`${styles.question}`}>{question}</h2>
                <div className={`${styles.options}`}>
                  {options?.map((option) => {
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
                <Suspense
                  fallback={
                    <div className='flex center margin0auto'>{ELoading[language]}...</div>
                  }
                >
                  <Timer />
                </Suspense>
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
