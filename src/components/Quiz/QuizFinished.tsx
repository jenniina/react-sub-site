import { useEffect, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IQuizHighscore, IHighscore } from './interfaces'
import { ReducerProps } from '../../interfaces'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addQuiz, getUserQuiz, deleteDuplicates } from './reducers/quizReducer'
import { initializeUser } from '../../reducers/authReducer'
import { createUser } from '../../reducers/usersReducer'
import { notify } from '../../reducers/notificationReducer'
import FormLogin from './components/Login'
import Register from '../Register/Register'
import Notification from '../Notification/Notification'
import styles from '../../components/Quiz/css/quiz.module.css'

const QuizFinished = () => {
  const { points, highscores, finalSeconds } = useSelector(
    (state: ReducerProps) => state.questions
  )
  const { mode } = useSelector((state: ReducerProps) => state.difficulty)

  const percentage = +((points * 100) / 300).toFixed(1)
  const navigate = useNavigate()

  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const sec = finalSeconds % 60
  const mins = Math.floor(finalSeconds / 60)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    if (finalSeconds === 0) {
      navigate('/portfolio/quiz')
    }
  }, [])

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    if ((!user && points !== 0 && finalSeconds !== 0) || finalSeconds === undefined)
      localStorage.setItem('quiz-highscores', JSON.stringify(highscores))
    if (
      (user?._id && points !== 0 && finalSeconds !== 0) ||
      (user?._id && finalSeconds !== undefined)
    ) {
      dispatch(getUserQuiz(user._id)).then((r) => {
        if (r === null) {
          const quizScore: IQuizHighscore = {
            highscores: {
              ...highscores,
              [mode]: { score: points, time: finalSeconds },
            },
            user: user._id,
          }
          dispatch(notify(`New highscore!`, false, 3))

          dispatch(addQuiz(quizScore)).then((r) => {
            //console.log('r1: ', r)
            dispatch(deleteDuplicates(user._id)).then((r) => {
              //console.log('r5: ', r)
            })
          })
        } else if (r !== null && r.highscores[mode].score <= points) {
          const quizScore: IQuizHighscore = {
            highscores: {
              ...r.highscores,
              [mode]: { score: points, time: r.highscores[mode].time },
            },
            user: user._id,
          }

          if (r.highscores[mode].score < points) {
            dispatch(notify(`New highscore!`, false, 3))
            quizScore.highscores[mode].time = finalSeconds // Update time if new score is higher
          } else if (
            r.highscores[mode].score === points &&
            r.highscores[mode].time > finalSeconds
          ) {
            dispatch(notify(`Faster than before!`, false, 3))
            quizScore.highscores[mode].time = finalSeconds // Update time if score is equal and time is faster
          }

          dispatch(addQuiz(quizScore)).then((r) => {
            //console.log('r2: ', r)
          })
        }
      })
    }
  }, [])

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (password !== confirmPassword) {
      dispatch(notify(`Passwords do not match!`, true, 8))
      return
    }
    dispatch(createUser({ name, username, password, language: 'en' }))
      .then(async () => {
        dispatch(notify(`Registration successful`, false, 8))
      })
      .catch((err) => {
        console.log(err)
        dispatch(notify(`Error: ${err.message}`, true, 8))
      })
  }

  let congrats

  switch (true) {
    case percentage === 100:
      congrats = 'Perfect!'
      break
    case percentage >= 80 && percentage < 100:
      congrats = 'Excellent!'
      break
    case percentage >= 50 && percentage < 80:
      congrats = 'Good job!'
      break
    case percentage >= 0 && percentage < 50:
      congrats = 'Bad luck!'
      break
    default:
      congrats = ''
  }

  useEffect(() => {
    const loginWrapOpen = document.querySelector('.login-wrap .open') as HTMLButtonElement
    const loginWrapClose = document.querySelector(
      '.login-wrap .close'
    ) as HTMLButtonElement
    const registerWrapOpen = document.querySelector(
      '.register-wrap .open'
    ) as HTMLButtonElement
    const registerWrapClose = document.querySelector(
      '.register-wrap .close'
    ) as HTMLButtonElement

    loginWrapOpen?.addEventListener('click', () => {
      setLoginOpen(true)
    })
    loginWrapClose?.addEventListener('click', () => {
      setLoginOpen(false)
    })
    registerWrapOpen?.addEventListener('click', () => {
      setRegisterOpen(true)
    })
    registerWrapClose?.addEventListener('click', () => {
      setRegisterOpen(false)
    })
  }, [])

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
                  <a href='#' onClick={goToMainPage}>
                    Quiz App
                  </a>
                </h1>
                <h2>{congrats}</h2>
                <p className='result'>
                  You scored <strong>{points}</strong> out of 300 ({percentage}%)
                </p>
                <p>Difficulty: {mode}</p>
                <p>
                  {finalSeconds === 0 ? (
                    <>Speed: N/A</>
                  ) : (
                    <>
                      Speed: {mins < 10 && '0'}
                      {mins}:{sec < 10 && '0'}
                      {sec}
                    </>
                  )}
                </p>
                <p className='highscore'>(Highscore: {highscores[mode].score} points)</p>
                <div className={`${styles.reset}`}>
                  <button className='btn' onClick={() => navigate(`/portfolio/quiz`)}>
                    Quiz Menu
                  </button>
                  <button
                    className='btn'
                    onClick={() => navigate(`/portfolio/quiz/${mode}`)}
                  >
                    Try again
                  </button>
                </div>
              </div>

              <div className={`register-login-wrap ${styles['register-login-wrap']}`}>
                <div className={`${loginOpen ? 'open' : ''} ${user ? 'logged' : ''}`}>
                  <FormLogin
                    easy={highscores.easy}
                    medium={highscores.medium}
                    hard={highscores.hard}
                  />
                </div>
                <div className={`${registerOpen ? 'open' : ''}`}>
                  <Register
                    handleRegister={handleRegister}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    name={name}
                    setName={setName}
                    text='quizfin'
                  />
                </div>
              </div>
            </div>
          </section>
          <Notification />
        </>
      )}
    </>
  )
}
export default QuizFinished
