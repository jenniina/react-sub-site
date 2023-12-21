import { useEffect, useRef, useState, FormEvent } from 'react'
import { AxiosError } from 'axios'
import { IHighscore } from '../interfaces'
import { ReducerProps } from '../../../interfaces'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { getUserQuiz } from '../reducers/quizReducer'
import { initializeUser, login, logout } from '../../../reducers/authReducer'
import { useSelector } from 'react-redux'
import Scores from './Scores'
import styles from '../css/quiz.module.css'
import { EEdit, EError, ELanguages, ELoggedInAs, ELogout } from '../../Jokes/interfaces'

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
  }, [user?._id])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(notify(`Logging in...`, false, 8))

    await dispatch(login(username, password, 'en'))
      .then(() => {
        setUsername('')
        setPassword('')
      })
      .catch((e) => {
        if (e.code === 'ERR_BAD_REQUEST')
          dispatch(notify(`${EError['en']}: ${e.response.data.message}`, true, 8))
        else if (e.code === 'ERR_NETWORK') {
          dispatch(notify(`${EError['en']}: ${e.message}`, true, 8))
        }
      })
  }
  return (
    <div className='login-wrap'>
      {user ? (
        <>
          <p>
            <span>
              {ELoggedInAs[(user?.language as ELanguages) ?? 'en']}{' '}
              {user?.name ? user?.name : user.username}{' '}
            </span>
            <a href='/edit'>{`${EEdit[user?.language as ELanguages]}`}</a>
            <button onClick={handleLogout} id='logout' className='logout danger'>
              {ELogout[(user?.language as ELanguages) ?? 'en']} &times;
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
          <Accordion className='' text='Log in to save score' ref={formLoginRef}>
            <h2>Log in to save score</h2>

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
