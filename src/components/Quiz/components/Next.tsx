import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { nextQuestion, gameFinished, finalSeconds } from '../reducers/questionsReducer'
import { ELanguages, ReducerProps } from '../../../interfaces'
import styles from '../css/quiz.module.css'
import { ENext } from '../../../interfaces/form'
import { EFinish } from '../../../interfaces/quiz'

const Next = ({ language }: { language: ELanguages }) => {
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
        {ENext[language]}
      </button>
    )

  return (
    <button className={`${styles.next}`} onClick={handleFinish}>
      {EFinish[language]}
    </button>
  )
}

export default Next
