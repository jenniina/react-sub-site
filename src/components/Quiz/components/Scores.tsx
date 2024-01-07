import { IHighscore } from '../interfaces'
import styles from '../css/quiz.module.css'
import { ELanguages } from '../../../interfaces'
import {
  EDifficulty,
  EEasy,
  EHard,
  EMedium,
  ENA,
  EScore,
  ESpeed,
  EYourHighscores,
} from '../../../interfaces/quiz'
import useWindowSize from '../../../hooks/useWindowSize'
import { breakpointSmall } from '../../../interfaces'
import { useEffect, useState } from 'react'

interface Props {
  easy: IHighscore['easy']
  medium: IHighscore['medium']
  hard: IHighscore['hard']
  language: ELanguages
}
const Scores = ({ easy, medium, hard, language }: Props) => {
  const { windowWidth } = useWindowSize()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (windowWidth < breakpointSmall) setShow(false)
    else setShow(true)
  }, [windowWidth])

  return (
    <table className={styles.highscores}>
      <caption>{EYourHighscores[language]}</caption>
      <thead>
        <tr className={styles.th}>
          <th>{EDifficulty[language]}</th>
          <th className={styles.score}>{EScore[language]}</th>
          {show && <th className={styles.percentage}>%</th>}
          <th>{ESpeed[language]}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{EEasy[language]}</th>
          <td>{easy ? easy.score : 0}/300</td>
          {show && <td>{+((easy.score * 100) / 300).toFixed(1)}%</td>}
          <td>
            {easy.score === 0 || easy.time === 0 ? (
              ENA[language]
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
          <th>{EMedium[language]}</th>
          <td>{medium ? medium.score : 0}/300</td>
          {show && <td>{+((medium.score * 100) / 300).toFixed(1)}%</td>}
          <td>
            {medium.score === 0 || medium.time === 0 ? (
              ENA[language]
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
          <th>{EHard[language]}</th>
          <td>{hard ? hard.score : 0}/300</td>
          {show && <td>{+((hard.score * 100) / 300).toFixed(1)}%</td>}
          <td>
            {hard.score === 0 || hard.time === 0 ? (
              ENA[language]
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
