import { useEffect, useRef, useState, FormEvent } from 'react'
import { AxiosError } from 'axios'
import { ReducerProps } from '../interfaces'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { notify } from '../reducers/notificationReducer'
import { initializeUser, login, logout } from '../reducers/authReducer'
import { useSelector } from 'react-redux'
import { ELogin, ELogout, ELoggedInAs } from '../interfaces'

interface LoginProps {
  titleLogin: ELogin
  titleLogout: ELogout
  titleLoggedInAs: ELoggedInAs
}

const FormLogin = ({ titleLogin, titleLogout, titleLoggedInAs }: LoginProps) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    dispatch(notify(`Logging in...`, false, 8))

    await dispatch(login(username, password))
      .then(() => {
        setUsername('')
        setPassword('')
      })
      .catch((e) =>
        dispatch(notify(`Error: ${(e as AxiosError<any>).response?.data.error}`, true, 8))
      )
  }

  return (
    <div className='login-wrap'>
      {user ? (
        <p>
          <span>
            {titleLoggedInAs} {user?.name ? user?.name : user.username}{' '}
          </span>
          <button onClick={handleLogout} id='logout' className='logout danger'>
            {titleLogout} &times;
          </button>
        </p>
      ) : (
        <>
          <Accordion className='' text={titleLogin} ref={formLoginRef}>
            <h2>Log in</h2>

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
                  <span>username: </span>
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
                  <span>password: </span>
                </label>
              </div>
              <button type='submit' id='login' className='login'>
                {titleLogin}
              </button>
            </form>
          </Accordion>
        </>
      )}
    </div>
  )
}

export default FormLogin
