import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { getQuestions, newAnswer } from './reducers/questionsReducer'
import { ReducerProps } from '../../interfaces'
import Progress from './components/Progress'
import Timer from './components/Timer'
import Loader from './components/Loader'
import Next from './components/Next'
import Notification from '../Notification/Notification'
import Message from './components/Message'
import styles from '../../components/Quiz/css/quiz.module.css'

const QuizQuestion = () => {
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
        <Notification />
        <div className={`${styles.quiz} `}>
          {status === 'loading' && <Loader />}
          {status === 'error' && (
            <Message type='error' message='Error fetching questions' />
          )}
          {status === 'ready' && (
            <>
              <h1 className={styles.h1}>
                <a href='#' onClick={goToMainPage}>
                  Quiz App
                </a>
              </h1>
              <h2>Quiz in progress</h2>
              <Progress />
              <div className={styles.wrap}>
                <div className={`${styles.diff}`}>Difficulty: {difficulty}</div>
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
