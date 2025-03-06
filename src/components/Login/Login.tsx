import { useEffect, useRef, useState, FormEvent, useContext } from 'react'
import Accordion from '../Accordion/Accordion'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { initializeUser, login, logout } from '../../reducers/authReducer'
import { useSelector } from 'react-redux'
import { ELanguages, ReducerProps } from '../../types'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../contexts/LanguageContext'

interface LoginProps {
  language: ELanguages
  setIsFormOpen?: (isFormOpen: boolean) => void
  isOpen?: boolean
  text?: string
}

const FormLogin = ({ language, setIsFormOpen, isOpen, text }: LoginProps) => {
  const { t } = useContext(LanguageContext)!

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
      .then(() => {
        dispatch(notify(`${t('LoggedOut')}`, false, 4))
      })
      .catch((e) => {
        console.error(e)
        dispatch(notify(`${t('Error')}: ${e.message}`, true, 8))
      })
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(notify(`${t('LoggingIn')}`, false, 3))
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
        console.error(e)
        if (e.response?.data?.message) dispatch(notify(e.response.data.message, true, 8))
        else if (e.code === 'ERR_BAD_REQUEST')
          dispatch(notify(`${t('Error')}: ${e.response.data.message}`, true, 8))
        else if (e.code === 'ERR_NETWORK') {
          dispatch(notify(`${t('Error')}: ${e.message}`, true, 8))
        }
      })
  }

  return (
    <>
      {user ? (
        <div className='logout-wrap'>
          <span>
            {t('LoggedInAs')} {user?.name ? user?.name : user.username}{' '}
          </span>
          <Link to='/edit'>{t('Edit')}</Link>
          <button
            onClick={handleLogout}
            id={`logout-${text}`}
            className={`logout danger ${text}`}
          >
            {t('Logout')} &times;
          </button>
        </div>
      ) : (
        <>
          <Accordion
            language={language}
            className='login'
            wrapperClass='login-wrap'
            text={t('Login')}
            ref={formLoginRef}
            setIsFormOpen={setIsFormOpen}
            isOpen={isOpen}
            hideBrackets={true}
          >
            <>
              <h2>{t('Login')}</h2>

              <form onSubmit={handleLogin} className='login'>
                <div className='input-wrap'>
                  <label>
                    <input
                      name='username'
                      type='text'
                      value={username}
                      required
                      autoComplete='email'
                      onChange={({ target }) => setUsername(target.value.trim())}
                    />
                    <span>{t('Email')}: </span>
                  </label>
                </div>
                <div className='input-wrap'>
                  <label>
                    <input
                      name='password'
                      type='password'
                      required
                      value={password}
                      autoComplete='on'
                      onChange={({ target }) => setPassword(target.value.trim())}
                    />
                    <span>{t('Password')}: </span>
                  </label>
                </div>
                <button
                  type='submit'
                  disabled={loggingIn}
                  id={`login-${text}`}
                  className={`login ${text} restore`}
                >
                  {loggingIn ? t('LoggingIn') : t('Login')}
                </button>
              </form>
            </>
          </Accordion>
        </>
      )}
    </>
  )
}

export default FormLogin
