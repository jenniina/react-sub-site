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
  titleLogin: ELogin
  titleLogout: ELogout
  titleLoggedInAs: ELoggedInAs
  language: ELanguages
  setIsFormOpen?: (isFormOpen: boolean) => void
  isOpen?: boolean
  text?: string
}

const FormLogin = ({
  titleLogin,
  titleLogout,
  titleLoggedInAs,
  language,
  setIsFormOpen,
  isOpen,
  text,
}: LoginProps) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const titleEmail = EEmail[language]
  const titlePassword = EPassword[language]

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

    await dispatch(login(username, password, language))
      .then(() => {
        dispatch(notify(`${ELoggingIn[language]}`, false, 2))
        setUsername('')
        setPassword('')
        setIsFormOpen && setIsFormOpen(false)
      })
      .catch((e) => {
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
            {titleLoggedInAs} {user?.name ? user?.name : user.username}{' '}
          </span>
          <a href='/edit'>{EEdit[language]}</a>
          <button
            onClick={handleLogout}
            id={`logout-${text}`}
            className={`logout danger ${text}`}
          >
            {titleLogout} &times;
          </button>
        </div>
      ) : (
        <>
          <Accordion
            language={language}
            className='login'
            text={titleLogin}
            ref={formLoginRef}
            close={EClose[(language as ELanguages) || 'en']}
            setIsFormOpen={setIsFormOpen}
            isOpen={isOpen}
          >
            <h2>{titleLogin}</h2>

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
                  <span>{titleEmail}: </span>
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
                  <span>{titlePassword}: </span>
                </label>
              </div>
              <button
                type='submit'
                id={`login-${text}`}
                className={`login ${text} restore`}
              >
                {titleLogin}
              </button>
            </form>
            <div className='flex'>
              <PasswordReset language={language} text='login' />
            </div>
          </Accordion>
        </>
      )}
    </>
  )
}

export default FormLogin
