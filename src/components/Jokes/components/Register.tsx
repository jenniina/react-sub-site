import { FormEvent, useEffect, useRef } from 'react'
import Accordion from '../../Accordion/Accordion'
import { useSelector } from 'react-redux'
import { ELanguages } from '../../../interfaces'
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
            <h2>Register</h2>
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
                  <span>Email</span>
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
                  <span>Nickname</span>
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
                  <span>Password</span>
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
                  <span>Confirm Password</span>
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
              <button type='submit'>Register</button>
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
