import { FormEvent, useEffect, useRef } from 'react'
import Accordion from '../Accordion/Accordion'
import { useSelector } from 'react-redux'
import {
  EConfirmPassword,
  EEmail,
  ELanguages,
  ENickname,
  EPassword,
  EPleaseUseGoodTasteWhenChoosingYourNickname,
  ERegister,
  ReducerProps,
  EDisclaimer,
} from '../../interfaces'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { initializeUser } from '../../reducers/authReducer'
import Notification from '../Notification/Notification'
import { Link } from 'react-router-dom'

interface Props {
  language: ELanguages
  handleRegister: (e: FormEvent<HTMLFormElement>) => void
  username: string
  setUsername: (username: string) => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  name: string
  setName: (name: string) => void
  setConfirmPassword: (confirmPassword: string) => void
  setIsFormOpen?: (isFormOpen: boolean) => void
  text?: string
  isOpen?: boolean
}
const Register = ({
  language,
  handleRegister,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  name,
  setName,
  setIsFormOpen,
  isOpen,
  text,
}: Props) => {
  const dispatch = useAppDispatch()

  const formRegisterRef = useRef<HTMLDivElement>(null)

  const user = useSelector((state: ReducerProps) => {
    return state.auth
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <div className='register-wrap'>
      {!user ? (
        <>
          <Accordion
            language={language}
            className={`accordion-register register`}
            text={ERegister[language]}
            ref={formRegisterRef}
            setIsFormOpen={setIsFormOpen}
            isOpen={isOpen}
            hideBrackets={true}
          >
            <h2>{ERegister[language]}</h2>
            <form onSubmit={handleRegister} className={`register ${text}`}>
              <p>{EPleaseUseGoodTasteWhenChoosingYourNickname[language]}</p>
              <div className='input-wrap'>
                <label>
                  <input
                    required
                    type='text'
                    name='name'
                    id={`name-${text}`}
                    value={name}
                    autoComplete='name'
                    onChange={({ target }) => setName(target.value)}
                  />
                  <span>{ENickname[language]}</span>
                </label>
              </div>
              <div className='input-wrap'>
                <label>
                  <input
                    required
                    type='text'
                    name='username'
                    id={`username-${text}`}
                    value={username}
                    autoComplete='email'
                    onChange={({ target }) => setUsername(target.value.trim())}
                  />
                  <span>{EEmail[language]}</span>
                </label>
              </div>
              <div className='input-wrap'>
                <label>
                  <input
                    required
                    type='password'
                    name='password'
                    id={`password-${text}`}
                    value={password}
                    autoComplete='on'
                    onChange={({ target }) => setPassword(target.value.trim())}
                  />
                  <span>{EPassword[language]}</span>
                </label>
              </div>
              <div className='input-wrap'>
                <label>
                  <input
                    required
                    type='password'
                    name='confirmPassword'
                    id={`confirmPassword-${text}`}
                    value={confirmPassword}
                    onChange={({ target }) => setConfirmPassword(target.value.trim())}
                  />
                  <span>{EConfirmPassword[language]}</span>
                </label>
              </div>
              <Link
                to='/disclaimer'
                style={{
                  display: 'flex',
                  flexFlow: 'row wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '1rem auto',
                }}
              >
                <small>{EDisclaimer[language]}</small>
              </Link>
              <button type='submit' className='restore'>
                {ERegister[language]}
              </button>
            </form>
          </Accordion>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Register
