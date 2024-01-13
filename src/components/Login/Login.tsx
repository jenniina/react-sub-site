import { useEffect, useRef, useState, FormEvent } from 'react'
import Accordion from '../Accordion/Accordion'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { initializeUser, login, logout } from '../../reducers/authReducer'
import PasswordReset from '../PasswordReset/PasswordReset'
import { useSelector } from 'react-redux'
import {
  ELoggedInAs,
  EClose,
  ELanguages,
  ReducerProps,
  ELogin,
  ELogout,
  EEmail,
  EPassword,
  EError,
  ELoggingIn,
  EEdit,
} from '../../interfaces'
import Notification from '../Notification/Notification'

interface LoginProps {
  language: ELanguages
  setIsFormOpen?: (isFormOpen: boolean) => void
  isOpen?: boolean
  text?: string
}

const FormLogin = ({ language, setIsFormOpen, isOpen, text }: LoginProps) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const formLoginRef = useRef(null)

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(notify(`${ELoggingIn[language]}`, false, 3))
    setLoggingIn(true)
    await dispatch(login(username, password, language))
      .then(() => {
        setLoggingIn(false)
        setUsername('')
        setPassword('')
        setIsFormOpen && setIsFormOpen(false)
      })
      .catch((e) => {
        setLoggingIn(false)
        console.log(e)
        if (e.code === 'ERR_BAD_REQUEST')
          dispatch(notify(`${EError[language]}: ${e.response.data.message}`, true, 8))
        else if (e.code === 'ERR_NETWORK') {
          dispatch(notify(`${EError[language]}: ${e.message}`, true, 8))
        }
      })
  }

  return (
    <>
      {user ? (
        <div className='logout-wrap'>
          <span>
            {ELoggedInAs[language]} {user?.name ? user?.name : user.username}{' '}
          </span>
          <a href='/edit'>{EEdit[language]}</a>
          <button
            onClick={handleLogout}
            id={`logout-${text}`}
            className={`logout danger ${text}`}
          >
            {ELogout[language]} &times;
          </button>
        </div>
      ) : (
        <>
          <Accordion
            language={language}
            className='login'
            text={ELogin[language]}
            ref={formLoginRef}
            setIsFormOpen={setIsFormOpen}
            isOpen={isOpen}
          >
            <h2>{ELogin[language]}</h2>

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
                  <span>{EEmail[language]}: </span>
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
                  <span>{EPassword[language]}: </span>
                </label>
              </div>
              <button
                type='submit'
                id={`login-${text}`}
                className={`login ${text} restore`}
              >
                {loggingIn ? ELoggingIn[language] : ELogin[language]}
              </button>
            </form>
          </Accordion>
        </>
      )}
    </>
  )
}

export default FormLogin
