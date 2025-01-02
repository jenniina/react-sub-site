import { useSelector } from 'react-redux'
import { ELanguages, ReducerProps } from '../../../types'
import styles from '../css/quiz.module.css'
import { EQuestion, EScore } from '../../../types/quiz'

const Progress = ({ language }: { language: ELanguages }) => {
  const { answer, index, points } = useSelector((state: ReducerProps) => state.questions)

  return (
    <header className={`${styles.progress}`}>
      <progress max='15' value={index + Number(answer !== null)} />
      <p>
        {EQuestion[language]}&nbsp;&nbsp;<b>{index + 1}</b> / 15
      </p>
      <p>
        <b>
          {EScore[language]}: {points}
        </b>{' '}
        / 300
      </p>
    </header>
  )
}
export default Progress
