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
  EEdit,
  EError,
  ELanguageTitle,
  ELanguagesLong,
  ELoggingIn,
  ReducerProps,
} from '../interfaces'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { initializeUser, login, logout } from '../../../reducers/authReducer'
import PasswordReset from '../../PasswordReset/PasswordReset'
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
import UserEdit from '../../UserEdit/NicknameEdit'
import { SelectOption } from '../../Select/Select'

interface LoginProps {
  titleLogin: ELogin
  titleLogout: ELogout
  titleLoggedInAs: ELoggedInAs
  language: ELanguages
  setLoggedIn: (loggedIn: boolean) => void
  setLanguage: (language: ELanguages) => void
  categoryLanguages:
    | typeof ECategory_en
    | typeof ECategory_cs
    | typeof ECategory_de
    | typeof ECategory_es
    | typeof ECategory_fr
    | typeof ECategory_pt
  options: (enumObj: typeof ELanguages) => SelectOption[]
  getKeyByValue: (
    enumObj: typeof ELanguages,
    value: ELanguages
  ) => undefined | SelectOption['label']
}

const FormLogin = ({
  titleLogin,
  titleLogout,
  titleLoggedInAs,
  language,
  setLoggedIn,
  setLanguage,
  categoryLanguages,
  getKeyByValue,
  options,
}: LoginProps) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const titleEmail = EEmail[language]
  const titlePassword = EPassword[language]

  const formRegisterRef = useRef<HTMLDivElement>(null)
  const titleEdit = EEdit[language]

  const formLoginRef = useRef(null)

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    setLoggedIn(false)
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    await dispatch(login(username, password, language))
      .then(() => {
        dispatch(notify(`${ELoggingIn[language]}`, false, 2))
        setUsername('')
        setPassword('')
        setLoggedIn(true)
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
          <a href='/edit'>{`${titleEdit}`}</a>
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
              <PasswordReset language={language} text='jokes' />
            </div>
          </Accordion>
        </>
      )}
    </>
  )
}

export default FormLogin
