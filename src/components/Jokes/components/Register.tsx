import { FormEvent, useEffect, useRef } from 'react'
import Accordion from '../../Accordion/Accordion'
import { useSelector } from 'react-redux'
import {
  EConfirmPassword,
  EEmail,
  ELanguages,
  ENickname,
  EPassword,
  ERegister,
} from '../../../interfaces'
import { ReducerProps } from '../../../interfaces'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { initializeUser } from '../../../reducers/authReducer'
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
            className=''
            text='register'
            ref={formRegisterRef}
          >
            <h2>{ERegister[language]}</h2>
            <form onSubmit={handleRegister} className='register'>
              <div className='input-wrap'>
                <label htmlFor='register-username'>
                  <input
                    required
                    type='text'
                    name='username'
                    id='register-username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  <span>{EEmail[language]}</span>
                </label>
              </div>
              <div className='input-wrap'>
                <label htmlFor='register-name'>
                  <input
                    required
                    type='text'
                    name='name'
                    id='register-name'
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  />
                  <span>{ENickname[language]}</span>
                </label>
              </div>
              <div className='input-wrap'>
                <label htmlFor='register-password'>
                  <input
                    required
                    type='password'
                    name='password'
                    id='register-password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  <span>{EPassword[language]}</span>
                </label>
              </div>
              <div className='input-wrap'>
                <label htmlFor='register-confirmPassword'>
                  <input
                    required
                    type='password'
                    name='confirmPassword'
                    id='register-confirmPassword'
                    value={confirmPassword}
                    onChange={({ target }) => setConfirmPassword(target.value)}
                  />
                  <span>{EConfirmPassword[language]}</span>
                </label>
              </div>
              <Select
                language={language}
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
              <button type='submit'>{ERegister[language]}</button>
            </form>
          </Accordion>
        </>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Register
