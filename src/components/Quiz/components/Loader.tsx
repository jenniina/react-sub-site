import styles from '../css/quiz.module.css'

const Loader = () => {
  return (
    <div className={`${styles['loader-wrap']}`}>
      <div className={`${styles.loader}`}></div>
      <h3>Loading questions...</h3>
    </div>
  )
}

export default Loader
