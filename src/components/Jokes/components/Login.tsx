import { useEffect, useRef, useState, FormEvent } from 'react'
import { AxiosError } from 'axios'
import { EError, ELoggingIn, ReducerProps } from '../interfaces'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { notify } from '../reducers/notificationReducer'
import { initializeUser, login, logout } from '../reducers/authReducer'
import PasswordReset from './PasswordReset'
import { useSelector } from 'react-redux'
import {
  ELogin,
  ELogout,
  ELoggedInAs,
  EClose,
  ELanguages,
  EEmail,
  EPassword,
} from '../interfaces'

interface LoginProps {
  titleLogin: ELogin
  titleLogout: ELogout
  titleLoggedInAs: ELoggedInAs
  language: ELanguages
}

const FormLogin = ({
  titleLogin,
  titleLogout,
  titleLoggedInAs,
  language,
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
        //scroll to anchor "userjokes"
        const anchor = document.querySelector('#userjokes')
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
      .catch((e) => {
        console.log(e)
        if (e.code === 'ERR_NETWORK') {
          dispatch(notify(`${EError[language]}: ${e.message}`, true, 8))
        } else if (e.code === 'ERR_BAD_REQUEST')
          dispatch(notify(`${EError[language]}: ${e.response.data.message}`, true, 8))
      })
  }

  return (
    <>
      {user ? (
        <div className='logout-wrap'>
          <span>
            {titleLoggedInAs} {user?.name ? user?.name : user.username}{' '}
          </span>
          <button onClick={handleLogout} id='logout' className='logout danger'>
            {titleLogout} &times;
          </button>
        </div>
      ) : (
        <>
          <Accordion
            className='login'
            text={`» ${titleLogin} «`}
            ref={formLoginRef}
            close={EClose[language as ELanguages]}
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
              <button type='submit' id='login' className='login'>
                {titleLogin}
              </button>
            </form>
            <div className='flex'>
              <PasswordReset language={language} />
            </div>
          </Accordion>
        </>
      )}
    </>
  )
}

export default FormLogin
