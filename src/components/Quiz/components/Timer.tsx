import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useNavigate } from 'react-router-dom'
import {
  gameFinished,
  resetTimer,
  lessSeconds,
  finalSeconds,
} from '../reducers/questionsReducer'
import { ReducerProps } from '../../../types'
import styles from '../css/quiz.module.css'

const Timer = () => {
  const { secondsRemaining } = useSelector(
    (state: ReducerProps) => state.questions
  )
  const sec = secondsRemaining % 60
  const mins = Math.floor(secondsRemaining / 60)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (secondsRemaining === 0) {
      void dispatch(finalSeconds())
      void dispatch(gameFinished())
      void dispatch(resetTimer())
      navigate('/portfolio/quiz/results')
    }
  }, [secondsRemaining, dispatch, navigate])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const timer = setInterval(() => {
      void dispatch(lessSeconds())
    }, 1000)

    return () => clearInterval(timer)
  }, [dispatch])

  return (
    <div className={`${styles.timer}`}>
      {mins < 10 && '0'}
      {mins}:{sec < 10 && '0'}
      {sec}
    </div>
  )
}

export default Timer
