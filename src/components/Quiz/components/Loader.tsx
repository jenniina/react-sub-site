import { useContext } from 'react'
import { ELanguages } from '../../../types'
import styles from '../css/quiz.module.css'
import { LanguageContext } from '../../../contexts/LanguageContext'

const Loader = ({ language }: { language: ELanguages }) => {
  const { t } = useContext(LanguageContext)!

  return (
    <div className={`${styles['loader-wrap']}`}>
      <div className={`${styles.loader}`}></div>
      <h3>{t('ELoadingQuestions')}</h3>
    </div>
  )
}

export default Loader
