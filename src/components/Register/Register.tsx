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
} from '../../interfaces'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { initializeUser } from '../../reducers/authReducer'
import Notification from '../Notification/Notification'

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
            className='register'
            text={ERegister[language]}
            ref={formRegisterRef}
            setIsFormOpen={setIsFormOpen}
            isOpen={isOpen}
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
                    onChange={({ target }) => setUsername(target.value)}
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
                    onChange={({ target }) => setPassword(target.value)}
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
                    onChange={({ target }) => setConfirmPassword(target.value)}
                  />
                  <span>{EConfirmPassword[language]}</span>
                </label>
              </div>
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
