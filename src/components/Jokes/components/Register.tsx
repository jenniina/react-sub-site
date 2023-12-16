import { FormEvent, useEffect, useRef } from 'react'
import Accordion from '../../Accordion/Accordion'
import { useSelector } from 'react-redux'
import {
  ELanguages,
  IUser,
  ReducerProps,
  ERegister,
  ERegistration,
  EEmail,
  EConfirmPassword,
  EPassword,
  ENickname,
  EClose,
} from '../interfaces'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { initializeUser } from '../reducers/authReducer'
import { Select, SelectOption } from '../../Select/Select'

interface Props {
  handleRegister: (e: FormEvent<HTMLFormElement>) => void
  options: (enumObj: typeof ELanguages) => SelectOption[]
  username: string
  setUsername: (username: string) => void
  language: ELanguages
  setLanguage: (language: ELanguages) => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  name: string
  setName: (name: string) => void
  setConfirmPassword: (confirmPassword: string) => void
  getKeyByValue: (
    enumObj: typeof ELanguages,
    value: ELanguages
  ) => undefined | SelectOption['label']
}
const Register = ({
  handleRegister,
  options,
  language,
  setLanguage,
  getKeyByValue,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  name,
  setName,
}: Props) => {
  const dispatch = useAppDispatch()

  const formRegisterRef = useRef<HTMLDivElement>(null)
  const titleRegister = ERegister[language]
  const titleRegistration = ERegistration[language]
  const titleEmail = EEmail[language]
  const titlePassword = EPassword[language]
  const titleConfirmPassword = EConfirmPassword[language]
  const titleNickname = ENickname[language]

  const user = useSelector((state: ReducerProps) => {
    return state.auth
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <>
      {!user ? (
        <Accordion
          className='register'
          text={`» ${titleRegister} «`}
          ref={formRegisterRef}
          close={EClose[language as ELanguages]}
        >
          <h2>{titleRegistration}</h2>
          <form onSubmit={handleRegister} className='register'>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='text'
                  name='username'
                  id='username'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
                <span>{titleEmail}</span>
              </label>
            </div>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
                <span>{titleNickname}</span>
              </label>
            </div>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
                <span>{titlePassword}</span>
              </label>
            </div>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='password'
                  name='confirmPassword'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={({ target }) => setConfirmPassword(target.value)}
                />
                <span>{titleConfirmPassword}</span>
              </label>
            </div>
            <Select
              id='language-register'
              className='language'
              instructions='Language'
              hide
              options={options(ELanguages)}
              value={
                language
                  ? ({
                      value: language,
                      label: getKeyByValue(ELanguages, language),
                    } as SelectOption)
                  : undefined
              }
              onChange={(o) => {
                setLanguage(o?.value as ELanguages)
              }}
            />
            <button type='submit'>{titleRegister}</button>
          </form>
        </Accordion>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default Register
