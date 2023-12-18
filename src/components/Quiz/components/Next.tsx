import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { nextQuestion, gameFinished, finalSeconds } from '../reducers/questionsReducer'
import { ReducerProps } from '../../../interfaces'
import styles from '../css/quiz.module.css'

const Next = () => {
  const { index } = useSelector((state: ReducerProps) => state.questions)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleFinish = () => {
    dispatch(finalSeconds())
    dispatch(gameFinished())
    navigate('/portfolio/quiz/results')
  }

  if (index < 14)
    return (
      <button className={`${styles.next}`} onClick={() => dispatch(nextQuestion())}>
        Next
      </button>
    )

  return (
    <button className={`${styles.next}`} onClick={handleFinish}>
      Finish
    </button>
  )
}

export default Next
