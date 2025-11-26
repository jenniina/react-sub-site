import { useSelector } from 'react-redux'
import { ReducerProps } from '../../../types'
import styles from '../css/quiz.module.css'

import { useLanguageContext } from '../../../contexts/LanguageContext'

const Progress = () => {
  const { t } = useLanguageContext()

  const { answer, index, points } = useSelector(
    (state: ReducerProps) => state.questions
  )

  return (
    <header className={`${styles.progress}`}>
      <progress max="15" value={index + Number(answer !== null)} />
      <p>
        {t('Question')}&nbsp;&nbsp;<b>{index + 1}</b> / 15
      </p>
      <p>
        <b>
          {t('Score')}: {points}
        </b>{' '}
        / 300
      </p>
    </header>
  )
}
export default Progress
