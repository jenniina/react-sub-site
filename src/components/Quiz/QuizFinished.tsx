import { useEffect, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IQuizHighscore, IHighscore, ReducerProps } from './interfaces'
import { useAppDispatch } from './hooks/useAppDispatch'
import { addQuiz, getUserQuiz } from './reducers/quizReducer'
import { initializeUser } from './reducers/authReducer'
import { createUser, findUserbyUsername } from './reducers/usersReducer'
import { notify } from './reducers/notificationReducer'
import FormLogin from './components/Login'
import Register from './components/Register'
import Notification from './components/Notification'
import styles from '../../components/Quiz/css/quiz.module.css'

const QuizFinished = () => {
  const { points, highscores } = useSelector((state: ReducerProps) => state.questions)
  const { mode } = useSelector((state: ReducerProps) => state.difficulty)

  const percentage = Math.ceil((points * 100) / 300)
  const navigate = useNavigate()

  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserQuiz(user._id)).then((r) => {
        if (r === null) {
          const quizScore: IQuizHighscore = {
            highscores: {
              ...highscores,
              [mode]: points,
            },
            user: user._id,
          }
          dispatch(notify(`New highscore!`, false, 3))

          dispatch(addQuiz(quizScore)).then((r) => {})
        } else if (r !== null && r.highscores[mode] < points) {
          const quizScore: IQuizHighscore = {
            highscores: {
              ...r.highscores,
              [mode]: points,
            },
            user: user._id,
          }
          dispatch(notify(`New highscore!`, false, 3))

          dispatch(addQuiz(quizScore)).then((r) => {
            //console.log('r3: ', r)
          })
        }
      })
    }
  }, [points, highscores])

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (password !== confirmPassword) {
      dispatch(notify(`Passwords do not match!`, true, 8))
      return
    }
    dispatch(createUser({ name, username, password, language: 'en' }))
      .then(async () => {
        dispatch(notify(`Registration successful`, false, 8))
        const searchForUser = await dispatch(findUserbyUsername(username))
        if (!searchForUser) {
          console.log('User not found')
          return
        }
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

  return (
    <>
      <section className={`card ${styles.top}`}>
        <div>
          <div className={`${styles.quiz}`}>
            <h1 className='scr'>Quiz Finished</h1>
            <h2>{congrats}</h2>
            <p className='result'>
              You scored <strong>{points}</strong> out of 300 ({percentage}%)
            </p>
            <p>Difficulty: {mode}</p>
            <p className='highscore'>(Highscore: {highscores[mode]} points)</p>
            <div className={`${styles.reset}`}>
              <button className='btn' onClick={() => navigate(`/portfolio/quiz`)}>
                Quiz Menu
              </button>
              <button className='btn' onClick={() => navigate(`/portfolio/quiz/${mode}`)}>
                Reset
              </button>
            </div>
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
            />
          </div>
        </div>
      </section>
      <Notification />
    </>
  )
}
export default QuizFinished
