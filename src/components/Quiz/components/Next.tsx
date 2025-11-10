import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {
  nextQuestion,
  gameFinished,
  finalSeconds,
} from '../reducers/questionsReducer'
import { ELanguages, ReducerProps } from '../../../types'
import styles from '../css/quiz.module.css'
import { useContext } from 'react'
import { useLanguageContext } from '../../../contexts/LanguageContext'

const Next = ({ language }: { language: ELanguages }) => {
  const { t } = useLanguageContext()

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
      <button
        className={`${styles.next}`}
        onClick={() => dispatch(nextQuestion())}
      >
        {t('Next')}
      </button>
    )

  return (
    <button className={`${styles.next}`} onClick={handleFinish}>
      {t('Finish')}
    </button>
  )
}

export default Next
