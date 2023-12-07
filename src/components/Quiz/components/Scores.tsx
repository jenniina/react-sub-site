import { IHighscore } from '../interfaces'
import styles from '../css/quiz.module.css'

const Scores = ({ easy, medium, hard }: IHighscore) => {
  return (
    <table className={styles.highscores}>
      <caption>Your&nbsp;highscores</caption>
      <thead>
        <tr>
          <th>Difficulty</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Easy</td>
          <td>{easy ? easy.score : 0}</td>
          <td>{easy ? easy.time : 0}</td>
        </tr>
        <tr>
          <td>Medium</td>
          <td>{medium ? medium.score : 0}</td>
          <td>{medium ? medium.time : 0}</td>
        </tr>
        <tr>
          <td>Hard</td>
          <td>{hard ? hard.score : 0}</td>
          <td>{hard ? hard.time : 0}</td>
        </tr>
      </tbody>
    </table>
  )
}
export default Scores
