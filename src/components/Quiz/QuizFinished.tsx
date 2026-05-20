import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IQuizHighscore, EQuizType } from './types'
import { ReducerProps } from '../../types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addQuiz, getUserQuiz, deleteDuplicates } from './reducers/quizReducer'
import { initializeUser } from '../../reducers/authReducer'
import { notify } from '../../reducers/notificationReducer'
import styles from '../../components/Quiz/css/quiz.module.css'
import { useLanguageContext } from '../../contexts/LanguageContext'
import LoginRegisterCombo from './components/LoginRegisterCombo'
import { formatQuizScore, normalizeQuizHighscores } from './utils/scores'

const QuizFinished = () => {
  const { t } = useLanguageContext()

  const { points, highscores, finalSeconds } = useSelector(
    (state: ReducerProps) => state.questions ?? {}
  )
  const { mode } = useSelector((state: ReducerProps) => state.difficulty)

  const currentScore = points
  const percentage = currentScore
  const normalizedHighscores = normalizeQuizHighscores(highscores)
  const navigate = useNavigate()

  const sec = finalSeconds % 60
  const mins = Math.floor(finalSeconds / 60)

  const dispatch = useAppDispatch()

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    void dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    if (finalSeconds === 0) {
      navigate('/portfolio/quiz')
    }
  }, [navigate, finalSeconds])

  useEffect(() => {
    if (
      (!user && points !== 0 && finalSeconds !== 0) ||
      finalSeconds === undefined
    )
      localStorage.setItem(
        `quiz-highscores`,
        JSON.stringify(normalizedHighscores)
      )
    if (
      (user?._id && points !== 0 && finalSeconds !== 0) ||
      (user?._id && finalSeconds !== undefined)
    ) {
      void dispatch(getUserQuiz(user._id)).then((r: IQuizHighscore | null) => {
        const storedHighscores = r
          ? normalizeQuizHighscores(r.highscores)
          : normalizedHighscores

        if (r === null) {
          const quizScore: IQuizHighscore = {
            highscores: {
              ...storedHighscores,
              [mode]: { score: currentScore, time: finalSeconds },
            },
            user: user._id,
          }
          void dispatch(notify(t('NewHighscore'), false, 3))

          void dispatch(addQuiz(quizScore)).then(() => {
            //console.log('r1: ', r)
            void dispatch(deleteDuplicates(user._id)).then(() => {
              //console.log('r5: ', r)
            })
          })
        } else if (storedHighscores[mode].score <= currentScore) {
          const quizScore: IQuizHighscore = {
            highscores: {
              ...storedHighscores,
              [mode]: {
                score: currentScore,
                time: storedHighscores[mode].time,
              },
            },
            user: user._id,
          }

          if (storedHighscores[mode].score < currentScore) {
            void dispatch(notify(t('NewHighscore'), false, 3))
            quizScore.highscores[mode].time = finalSeconds // Update time if new score is higher
          } else if (
            storedHighscores[mode].score === currentScore &&
            storedHighscores[mode].time > finalSeconds
          ) {
            void dispatch(notify(t('FasterThanBefore'), false, 3))
            quizScore.highscores[mode].time = finalSeconds // Update time if score is equal and time is faster
          }

          void dispatch(addQuiz(quizScore)).then(() => {
            //console.log('r2: ', r)
          })
        }
      })
    }
  }, [
    currentScore,
    dispatch,
    user,
    points,
    finalSeconds,
    normalizedHighscores,
    mode,
    t,
  ])

  let congrats

  switch (true) {
    case percentage === 100:
      congrats = t('Perfect')
      break
    case percentage >= 80 && percentage < 100:
      congrats = t('Excellent')
      break
    case percentage >= 50 && percentage < 80:
      congrats = t('GoodJob')
      break
    case percentage >= 0 && percentage < 50:
      congrats = t('BadLuck')
      break
    default:
      congrats = ''
  }

  const goToMainPage = () => {
    navigate('/portfolio/quiz')
  }

  return (
    <>
      {finalSeconds !== 0 && (
        <>
          <section className={`card ${styles.top}`}>
            <div>
              <div className={`${styles.quiz}`}>
                <h1 className={styles.h1}>
                  <button onClick={goToMainPage}>
                    &laquo;&nbsp;{t('QuizApp')}
                  </button>
                </h1>
                <h2>{congrats}</h2>
                <p className="result">
                  {t('YouScored')}{' '}
                  <strong>{formatQuizScore(currentScore)}</strong>{' '}
                  {t('OutOf300Points')} ({percentage}%)
                </p>
                <p>
                  {t('Difficulty')}:{' '}
                  {(() => {
                    switch (mode) {
                      case EQuizType.easy:
                        return t('Easy')
                      case EQuizType.medium:
                        return t('Medium')
                      case EQuizType.hard:
                        return t('Hard')
                      default:
                        return mode
                    }
                  })()}
                </p>
                <p>
                  {finalSeconds === 0 ? (
                    <>
                      {t('Speed')}: {t('NA')}
                    </>
                  ) : (
                    <>
                      {t('Speed')}: {mins < 10 && '0'}
                      {mins}:{sec < 10 && '0'}
                      {sec}
                    </>
                  )}
                </p>
                <p className="highscore">
                  ({t('Highscore')}:{' '}
                  {formatQuizScore(normalizedHighscores[mode].score)}{' '}
                  {t('Points')})
                </p>
                <div className={`${styles.reset}`}>
                  <button
                    className="btn"
                    onClick={() => navigate(`/portfolio/quiz`)}
                  >
                    {t('BackToMenu')}
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      navigate(`/portfolio/quiz/difficulty/${mode}`)
                    }
                  >
                    {t('TryAgain')}
                  </button>
                </div>
              </div>
              <LoginRegisterCombo
                user={user}
                highscoresLocal={normalizedHighscores}
                text="quizfinish"
              />
            </div>
          </section>
        </>
      )}
    </>
  )
}
export default QuizFinished
