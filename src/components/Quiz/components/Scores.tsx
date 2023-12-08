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
          <td>
            {easy.score === 0 || easy.time === 0 ? (
              'N/A'
            ) : (
              <>
                {Math.floor(easy.time / 60) < 10 && '0'}
                {Math.floor(easy.time / 60)}:{easy.time % 60 < 10 && '0'}
                {easy.time % 60}
              </>
            )}
          </td>
        </tr>
        <tr>
          <td>Medium</td>
          <td>{medium ? medium.score : 0}</td>
          <td>
            {medium.score === 0 || medium.time === 0 ? (
              'N/A'
            ) : (
              <>
                {Math.floor(medium.time / 60) < 10 && '0'}
                {Math.floor(medium.time / 60)}:{medium.time % 60 < 10 && '0'}
                {medium.time % 60}
              </>
            )}
          </td>
        </tr>
        <tr>
          <td>Hard</td>
          <td>{hard ? hard.score : 0}</td>
          <td>
            {hard.score === 0 || hard.time === 0 ? (
              'N/A'
            ) : (
              <>
                {Math.floor(hard.time / 60) < 10 && '0'}
                {Math.floor(hard.time / 60)}:{hard.time % 60 < 10 && '0'}
                {hard.time % 60}
              </>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
export default Scores
