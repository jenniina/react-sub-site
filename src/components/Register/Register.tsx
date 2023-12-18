import { FormEvent, useEffect, useRef } from 'react'
import Accordion from '../Accordion/Accordion'
import { useSelector } from 'react-redux'
import { ReducerProps } from '../../interfaces'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { initializeUser } from '../../reducers/authReducer'

interface Props {
  handleRegister: (e: FormEvent<HTMLFormElement>) => void
  username: string
  setUsername: (username: string) => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  name: string
  setName: (name: string) => void
  setConfirmPassword: (confirmPassword: string) => void
}
const Register = ({
  handleRegister,
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
          <Accordion className='' text='register' ref={formRegisterRef}>
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
