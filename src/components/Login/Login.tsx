import { useEffect, useRef, useState, FormEvent } from 'react'
import { AxiosError } from 'axios'
import {
  ECategoryTitle,
  ECategory_cs,
  ECategory_de,
  ECategory_en,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
} from '../Jokes/interfaces'
import Accordion from '../Accordion/Accordion'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { initializeUser, login, logout, refreshUser } from '../../reducers/authReducer'
import PasswordReset from '../PasswordReset/PasswordReset'
import { useSelector } from 'react-redux'
import {
  ELoggedInAs,
  EClose,
  ELanguages,
  ELanguageTitle,
  ELanguagesLong,
  ReducerProps,
  ELogin,
  ELogout,
  EEmail,
  EPassword,
  EError,
  ELoggingIn,
} from '../../interfaces'
import UserEdit from '../UserEdit/NicknameEdit'
import { SelectOption } from '../Select/Select'
import Notification from '../Notification/Notification'

interface LoginProps {
  titleLogin: ELogin
  titleLogout: ELogout
  titleLoggedInAs: ELoggedInAs
  language: ELanguages
  setIsFormOpen?: (isFormOpen: boolean) => void
  text?: string
}

const FormLogin = ({
  titleLogin,
  titleLogout,
  titleLoggedInAs,
  language,
  setIsFormOpen,
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
          <a href='/edit'>Edit</a>
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
            className='login'
            text={titleLogin}
            ref={formLoginRef}
            close={EClose[(language as ELanguages) || 'en']}
            setIsFormOpen={setIsFormOpen}
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
              <button type='submit' id={`login-${text}`} className={`login ${text}`}>
                {titleLogin}
              </button>
            </form>
            <div className='flex'>
              <PasswordReset language={language} text='login' />
            </div>
          </Accordion>
          <Notification />
        </>
      )}
    </>
  )
}

export default FormLogin
