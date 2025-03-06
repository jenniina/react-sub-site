import { useEffect, useRef, useState, FormEvent, useContext } from 'react'
import { IHighscore } from '../types'
import { ELanguages, ReducerProps } from '../../../types'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { getUserQuiz } from '../reducers/quizReducer'
import { initializeUser, login, logout } from '../../../reducers/authReducer'
import { useSelector } from 'react-redux'
import Scores from './Scores'
import styles from '../css/quiz.module.css'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../../contexts/LanguageContext'

interface Props {
  easy: IHighscore['easy']
  medium: IHighscore['medium']
  hard: IHighscore['hard']
  language: ELanguages
  setIsFormOpen?: (isFormOpen: boolean) => void
}
const FormLogin = ({ easy, medium, hard, language, setIsFormOpen }: Props) => {
  const { t } = useContext(LanguageContext)!

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
    setSending(true)
    dispatch(notify(t('LoggingIn'), false, 8))

    await dispatch(login(username, password, 'en'))
      .then(() => {
        setUsername('')
        setPassword('')
        setSending(false)
      })
      .catch((e) => {
        if (e.response?.data?.message) dispatch(notify(e.response.data.message, true, 8))
        else if (e.code === 'ERR_BAD_REQUEST')
          dispatch(notify(`${t('Error')}: ${e.response.data.message}`, true, 8))
        else if (e.code === 'ERR_NETWORK') {
          dispatch(notify(`${t('Error')}: ${e.message}`, true, 8))
        }
        setSending(false)
      })
  }
  return (
    <div className='login-wrap'>
      {user ? (
        <>
          <p>
            <span>
              {t('LoggedInAs')} {user?.name ? user?.name : user.username}{' '}
            </span>
            <Link to='/edit'>{`${t('Edit')}`}</Link>
            <button onClick={handleLogout} id='logout' className='logout danger'>
              {t('Logout')} &times;
            </button>
          </p>
          <button
            onClick={() => setShowHighscores(!showHighscores)}
            className={styles.showHighscores}
          >{`${showHighscores ? 'hide' : 'show'} highscores`}</button>
          {showHighscores && (
            <Scores
              language={language}
              easy={highscoresLocal.easy}
              medium={highscoresLocal.medium}
              hard={highscoresLocal.hard}
            />
          )}
        </>
      ) : (
        <>
          <Accordion
            language={language}
            className={`accordion-login login-to-save`}
            wrapperClass='login-to-save-wrap'
            text={t('LogInToSaveScore')}
            ref={formLoginRef}
            setIsFormOpen={setIsFormOpen}
            hideBrackets={true}
          >
            <h2>{t('LogInToSaveScore')}</h2>

            <form onSubmit={handleLogin} className={`login ${styles.login}`}>
              <div className='input-wrap'>
                <label htmlFor='quiz-username'>
                  <input
                    id='quiz-username'
                    name='username'
                    type='text'
                    value={username}
                    required
                    autoComplete='email'
                    onChange={({ target }) => setUsername(target.value.trim())}
                  />
                  <span>{t('Username')}: </span>
                </label>
              </div>
              <div className='input-wrap'>
                <label>
                  <input
                    name='password'
                    type='password'
                    required
                    autoComplete='current-password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value.trim())}
                  />
                  <span>{t('Password')}: </span>
                </label>
              </div>
              <button type='submit' disabled={sending} id='login' className='login'>
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
