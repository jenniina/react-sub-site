import { IHighscore } from '../types'
import styles from '../css/quiz.module.css'
import useWindowSize from '../../../hooks/useWindowSize'
import { breakpointSmall } from '../../../types'
import { useEffect, useState } from 'react'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { formatQuizScore, QUIZ_MAX_SCORE } from '../utils/scores'

interface Props {
  easy: IHighscore['easy']
  medium: IHighscore['medium']
  hard: IHighscore['hard']
}
const Scores = ({ easy, medium, hard }: Props) => {
  const { t } = useLanguageContext()

  const { windowWidth } = useWindowSize()
  const [show, setShow] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (windowWidth < breakpointSmall) setShow(false)
    else setShow(true)
  }, [windowWidth])

  return (
    <table className={styles.highscores}>
      <caption>{t('YourHighscores')}</caption>
      <thead>
        <tr className={styles.th}>
          <th>{t('Difficulty')}</th>
          <th className={styles.score}>{t('Score')}</th>
          {show && <th className={styles.percentage}>%</th>}
          <th>{t('Speed')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{t('Easy')}</th>
          <td>
            {formatQuizScore(easy ? easy.score : 0)}/{QUIZ_MAX_SCORE}
          </td>
          {show && <td>{formatQuizScore(easy ? easy.score : 0)}%</td>}
          <td>
            {easy.score === 0 || easy.time === 0 ? (
              t('NA')
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
          <th>{t('Medium')}</th>
          <td>
            {formatQuizScore(medium ? medium.score : 0)}/{QUIZ_MAX_SCORE}
          </td>
          {show && <td>{formatQuizScore(medium ? medium.score : 0)}%</td>}
          <td>
            {medium.score === 0 || medium.time === 0 ? (
              t('NA')
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
          <th>{t('Hard')}</th>
          <td>
            {formatQuizScore(hard ? hard.score : 0)}/{QUIZ_MAX_SCORE}
          </td>
          {show && <td>{formatQuizScore(hard ? hard.score : 0)}%</td>}
          <td>
            {hard.score === 0 || hard.time === 0 ? (
              t('NA')
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
