import { IHighscore } from '../types'
import styles from '../css/quiz.module.css'
import { ELanguages } from '../../../types'
import useWindowSize from '../../../hooks/useWindowSize'
import { breakpointSmall } from '../../../types'
import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../../contexts/LanguageContext'

interface Props {
  easy: IHighscore['easy']
  medium: IHighscore['medium']
  hard: IHighscore['hard']
  language: ELanguages
}
const Scores = ({ easy, medium, hard, language }: Props) => {
  const { t } = useContext(LanguageContext)!

  const { windowWidth } = useWindowSize()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (windowWidth < breakpointSmall) setShow(false)
    else setShow(true)
  }, [windowWidth])

  return (
    <table className={styles.highscores}>
      <caption>{t('EYourHighscores')}</caption>
      <thead>
        <tr className={styles.th}>
          <th>{t('EDifficulty')}</th>
          <th className={styles.score}>{t('EScore')}</th>
          {show && <th className={styles.percentage}>%</th>}
          <th>{t('ESpeed')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{t('EEasy')}</th>
          <td>{easy ? easy.score : 0}/300</td>
          {show && <td>{+((easy.score * 100) / 300).toFixed(1)}%</td>}
          <td>
            {easy.score === 0 || easy.time === 0 ? (
              t('ENA')
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
          <th>{t('EMedium')}</th>
          <td>{medium ? medium.score : 0}/300</td>
          {show && <td>{+((medium.score * 100) / 300).toFixed(1)}%</td>}
          <td>
            {medium.score === 0 || medium.time === 0 ? (
              t('ENA')
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
          <th>{t('EHard')}</th>
          <td>{hard ? hard.score : 0}/300</td>
          {show && <td>{+((hard.score * 100) / 300).toFixed(1)}%</td>}
          <td>
            {hard.score === 0 || hard.time === 0 ? (
              t('ENA')
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
