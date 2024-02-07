import { useEffect, useRef, useState, FormEvent } from 'react'
import { IHighscore } from '../interfaces'
import {
  ELoggingIn,
  ELogin,
  EPassword,
  EUsername,
  ReducerProps,
} from '../../../interfaces'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { getUserQuiz } from '../reducers/quizReducer'
import { initializeUser, login, logout } from '../../../reducers/authReducer'
import { useSelector } from 'react-redux'
import Scores from './Scores'
import styles from '../css/quiz.module.css'
import { ELogout, EError, EEdit, ELanguages, ELoggedInAs } from '../../../interfaces'
import { ELogInToSaveScore } from '../../../interfaces/quiz'

interface Props {
  easy: IHighscore['easy']
  medium: IHighscore['medium']
  hard: IHighscore['hard']
  language: ELanguages
  setIsFormOpen?: (isFormOpen: boolean) => void
}
const FormLogin = ({ easy, medium, hard, language, setIsFormOpen }: Props) => {
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
    dispatch(notify(ELoggingIn[language], false, 8))

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
            text={ELogInToSaveScore[language]}
            ref={formLoginRef}
            setIsFormOpen={setIsFormOpen}
            hideBrackets={true}
          >
            <h2>{ELogInToSaveScore[language]}</h2>

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
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  <span>{EUsername[language]}: </span>
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
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  <span>{EPassword[language]}: </span>
                </label>
              </div>
              <button type='submit' id='login' className='login'>
                {ELogin[language]}
              </button>
            </form>
          </Accordion>
        </>
      )}
    </div>
  )
}

export default FormLogin
