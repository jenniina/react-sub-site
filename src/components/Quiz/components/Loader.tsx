import { ELanguages } from '../../../interfaces'
import { ELoadingQuestions } from '../../../interfaces/quiz'
import styles from '../css/quiz.module.css'

const Loader = ({ language }: { language: ELanguages }) => {
  return (
    <div className={`${styles['loader-wrap']}`}>
      <div className={`${styles.loader}`}></div>
      <h3>{ELoadingQuestions[language]}</h3>
    </div>
  )
}

export default Loader
