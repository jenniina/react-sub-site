import { useEffect, useRef, useState, FormEvent } from 'react'
import { AxiosError } from 'axios'
import { ReducerProps, IHighscore } from '../interfaces'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { notify } from '../reducers/notificationReducer'
import { getUserQuiz } from '../reducers/quizReducer'
import { initializeUser, login, logout } from '../reducers/authReducer'
import { useSelector } from 'react-redux'
import Scores from './Scores'
import styles from '../css/quiz.module.css'

const FormLogin = ({ easy, medium, hard }: IHighscore) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const formLoginRef = useRef(null)

  const [highscoresLocal, setHighscores] = useState<IHighscore>({
    easy: easy ?? { score: 0, time: 210 },
    medium: medium ?? { score: 0, time: 210 },
    hard: hard ?? { score: 0, time: 210 },
  })

  const [showHighscores, setShowHighscores] = useState<boolean>(false)

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
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(notify(`Logging in...`, false, 8))

    await dispatch(login(username, password))
      .then(() => {
        setUsername('')
        setPassword('')
      })
      .catch((e) =>
        dispatch(notify(`Error: ${(e as AxiosError<any>).response?.data.error}`, true, 8))
      )
  }

  return (
    <div className='login-wrap'>
      {user ? (
        <>
          <p>
            <span>Logged in as {user?.name ? user?.name : user.username} </span>
            <button onClick={handleLogout} id='logout' className='logout danger'>
              Log out &times;
            </button>
          </p>
          <button
            onClick={() => setShowHighscores(!showHighscores)}
            className={styles.showHighscores}
          >{`${showHighscores ? 'hide' : 'show'} highscores`}</button>
          {showHighscores && (
            <Scores
              easy={highscoresLocal.easy}
              medium={highscoresLocal.medium}
              hard={highscoresLocal.hard}
            />
          )}
        </>
      ) : (
        <>
          <Accordion className='' text='Log in' ref={formLoginRef}>
            <h2>Log in</h2>

            <form onSubmit={handleLogin} className='login'>
              <div className='input-wrap'>
                <label>
                  <input
                    name='username'
                    type='text'
                    value={username}
                    required
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  <span>username: </span>
                </label>
              </div>
              <div className='input-wrap'>
                <label>
                  <input
                    name='password'
                    type='password'
                    required
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  <span>password: </span>
                </label>
              </div>
              <button type='submit' id='login' className='login'>
                Log in
              </button>
            </form>
          </Accordion>
        </>
      )}
    </div>
  )
}

export default FormLogin
