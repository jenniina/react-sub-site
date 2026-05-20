import { useSelector } from 'react-redux'
import { ReducerProps } from '../../../types'
import styles from '../css/quiz.module.css'
import {
  formatQuizScore,
  QUIZ_MAX_SCORE,
  QUIZ_QUESTION_COUNT,
} from '../utils/scores'

import { useLanguageContext } from '../../../contexts/LanguageContext'

const Progress = () => {
  const { t } = useLanguageContext()

  const { answer, index, points } = useSelector(
    (state: ReducerProps) => state.questions ?? {}
  )

  return (
    <header className={`${styles.progress}`}>
      <progress
        max={QUIZ_QUESTION_COUNT}
        value={index + Number(answer !== null)}
      />
      <p>
        {t('Question')}&nbsp;&nbsp;<b>{index + 1}</b> / {QUIZ_QUESTION_COUNT}
      </p>
      <p>
        <b>
          {t('Score')}: {formatQuizScore(points)}
        </b>{' '}
        / {QUIZ_MAX_SCORE}
      </p>
    </header>
  )
}
export default Progress
