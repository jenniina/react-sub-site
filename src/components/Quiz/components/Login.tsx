import { useEffect, useRef, useState, FormEvent } from 'react'
import { IHighscore, IQuizHighscore } from '../types'
import { ReducerProps } from '../../../types'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { getUserQuiz } from '../reducers/quizReducer'
import { initializeUser, login, logout } from '../../../reducers/authReducer'
import { useSelector } from 'react-redux'
import Scores from './Scores'
import styles from '../css/quiz.module.css'
import { Link } from 'react-router-dom'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { getErrorMessage } from '../../../utils'

interface Props {
  easy: IHighscore['easy']
  medium: IHighscore['medium']
  hard: IHighscore['hard']
  setIsFormOpen?: (isFormOpen: boolean) => void
}
const FormLogin = ({ easy, medium, hard, setIsFormOpen }: Props) => {
  const { t } = useLanguageContext()

  const dispatch = useAppDispatch()
  const [sending, setSending] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const formLoginRef = useRef(null)

  const [highscoresLocal, setHighscores] = useState<IHighscore>({
    easy: easy ?? { score: 0, time: 210 },
    medium: medium ?? { score: 0, time: 210 },
    hard: hard ?? { score: 0, time: 210 },
  })

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    if (user?._id) {
      void dispatch(getUserQuiz(user._id)).then((r: IQuizHighscore | null) => {
        if (r !== null) {
          setHighscores(r.highscores)
        }
      })
    }
  }, [user?._id, dispatch])

  useEffect(() => {
    void dispatch(initializeUser())
  }, [dispatch])

  const handleLogout = () => {
    void dispatch(logout())
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    setSending(true)
    void dispatch(notify(t('LoggingIn'), false, 8))

    await dispatch(login(username, password, 'en'))
      .then(() => {
        setUsername('')
        setPassword('')
        setSending(false)
      })
      .catch((err: unknown) => {
        const message = getErrorMessage(err, t('Error'))
        void dispatch(notify(message, true, 8))
        setSending(false)
      })
  }
  return (
    <div className="login-wrap">
      {user ? (
        <>
          <p>
            <span>
              {t('LoggedInAs')} {user?.name ?? user.username}{' '}
            </span>
            <Link to="/edit">{`${t('Edit')}`}</Link>
            <button
              onClick={handleLogout}
              id="logout"
              className="logout danger"
            >
              {t('Logout')} &times;
            </button>
          </p>

          <Scores
            easy={highscoresLocal.easy}
            medium={highscoresLocal.medium}
            hard={highscoresLocal.hard}
          />
        </>
      ) : (
        <>
          <Accordion
            className={`accordion-login login-to-save`}
            wrapperClass="login-to-save-wrap"
            text={t('LogInToSaveScore')}
            ref={formLoginRef}
            setIsFormOpen={setIsFormOpen}
            hideBrackets={true}
          >
            <h2>{t('LogInToSaveScore')}</h2>

            <form
              onSubmit={(e) => void handleLogin(e)}
              className={`login ${styles.login}`}
            >
              <div className="input-wrap">
                <label htmlFor="quiz-username">
                  <input
                    id="quiz-username"
                    name="username"
                    type="text"
                    value={username}
                    required
                    autoComplete="email"
                    onChange={({ target }) => setUsername(target.value.trim())}
                  />
                  <span>{t('Username')}: </span>
                </label>
              </div>
              <div className="input-wrap">
                <label>
                  <input
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value.trim())}
                  />
                  <span>{t('Password')}: </span>
                </label>
              </div>
              <button
                type="submit"
                disabled={sending}
                id="login"
                className="login"
              >
                {t('Login')}
              </button>
            </form>
          </Accordion>
        </>
      )}
    </div>
  )
}

export default FormLogin
