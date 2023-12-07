import './css/quiz.module.css'
import { useNavigate } from 'react-router-dom'
import { selectMode } from './reducers/difficultyReducer'
import { useSelector } from 'react-redux'
import Hero from '../Hero/Hero'
import styles from '../../components/Quiz/css/quiz.module.css'
import { useEffect, useState } from 'react'
import { useAppDispatch } from './hooks/useAppDispatch'
import { IHighscore, ReducerProps } from './interfaces'
import { initializeUser } from './reducers/authReducer'
import { notify } from './reducers/notificationReducer'
import { createUser, findUserbyUsername } from './reducers/usersReducer'
import FormLogin from './components/Login'
import Register from './components/Register'
import Notification from './components/Notification'
import { FaStar } from 'react-icons/fa'
import { getUserQuiz } from './reducers/quizReducer'

const QuizStart = ({
  heading,
  text,
  type,
}: {
  heading: string
  text: string
  type: string
}) => {
  const navigate = useNavigate()
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [language, setLanguage] = useState<string>('en')
  const [highscoresLocal, setHighscores] = useState<IHighscore>({
    easy: { score: 0, time: 0 },
    medium: { score: 0, time: 0 },
    hard: { score: 0, time: 0 },
  })

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
        if (r !== null) {
          setHighscores(r.highscores)
        }
      })
    }
  }, [user])

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (password !== confirmPassword) {
      dispatch(notify(`Passwords do not match!`, true, 8))
      return
    }
    dispatch(createUser({ name, username, password, language, verified: true }))
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(selectMode((e.target as HTMLButtonElement).value))
    navigate(`/portfolio/quiz/${(e.target as HTMLButtonElement).value}`)
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
      <Hero
        heading={heading}
        text={text}
        reset='Reset'
        instructions='Try tapping the shapes'
      />
      <section className={`card`}>
        <div>
          <div className={`start-screen ${styles.quiz}`}>
            <h2>Test your general knowledge with these 15 questions</h2>
            <p>Choose difficulty:</p>
            <div className={`${styles.difficulty}`}>
              <button
                className={`${styles.mode} ${styles.easy}`}
                value='easy'
                onClick={(e) => handleClick(e)}
              >
                Easy <FaStar />
              </button>
              <button
                className={`${styles.mode} ${styles.medium}`}
                value='medium'
                onClick={(e) => handleClick(e)}
              >
                Medium <FaStar />
                <FaStar />
              </button>
              <button
                className={`${styles.mode} ${styles.hard}`}
                value='hard'
                onClick={(e) => handleClick(e)}
              >
                Hard <FaStar />
                <FaStar />
                <FaStar />
              </button>
            </div>
          </div>
          <div className={`register-login-wrap ${styles['register-login-wrap']}`}>
            <div className={`${loginOpen ? 'open' : ''} ${user ? 'logged' : ''}`}>
              <FormLogin
                easy={highscoresLocal.easy}
                medium={highscoresLocal.medium}
                hard={highscoresLocal.hard}
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
        </div>
      </section>
      <Notification />
    </>
  )
}

export default QuizStart
