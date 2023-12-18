import { useSelector } from 'react-redux'
import { ReducerProps } from '../../../interfaces'
import styles from '../css/quiz.module.css'

const Progress = () => {
  const { answer, index, points } = useSelector((state: ReducerProps) => state.questions)

  return (
    <header className={`${styles.progress}`}>
      <progress max='15' value={index + Number(answer !== null)} />
      <p>
        Question&nbsp;&nbsp;<b>{index + 1}</b> / 15
      </p>
      <p>
        <b>Score: {points}</b> / 300
      </p>
    </header>
  )
}
export default Progress
