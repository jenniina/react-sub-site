import { useEffect, useRef, useState, FormEvent } from 'react'
import { AxiosError } from 'axios'
import { IQuizHighscore, EQuizType, ReducerProps, IHighscore } from '../interfaces'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { notify } from '../reducers/notificationReducer'
import { getUserQuiz } from '../reducers/quizReducer'
import { initializeUser, login, logout } from '../reducers/authReducer'
import { useSelector } from 'react-redux'
import styles from '../css/quiz.module.css'

const FormLogin = ({ easy, medium, hard }: IHighscore) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const formLoginRef = useRef(null)

  const [highscoresLocal, setHighscores] = useState<IHighscore>({
    easy: 0,
    medium: 0,
    hard: 0,
  })

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
  }, [user, easy, medium, hard])

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
                <td>{highscoresLocal ? highscoresLocal.easy : 0}</td>
                <td></td>
              </tr>
              <tr>
                <td>Medium</td>
                <td>{highscoresLocal ? highscoresLocal.medium : 0}</td>
                <td></td>
              </tr>
              <tr>
                <td>Hard</td>
                <td>{highscoresLocal ? highscoresLocal.hard : 0}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
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
