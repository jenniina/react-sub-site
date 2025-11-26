import styles from '../css/quiz.module.css'
import { useLanguageContext } from '../../../contexts/LanguageContext'

const Loader = () => {
  const { t } = useLanguageContext()

  return (
    <div className={`${styles['loader-wrap']}`}>
      <div className={`${styles.loader}`}></div>
      <h3>{t('LoadingQuestions')}</h3>
    </div>
  )
}

export default Loader
