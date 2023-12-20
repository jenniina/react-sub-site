import { useEffect, useState } from 'react'
import { ELoggedInAs, ELanguages } from '../components/Jokes/interfaces'
import { IUser } from '../interfaces'
import Register from '../components/Register/Register'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { createUser } from '../reducers/usersReducer'
import { notify } from '../reducers/notificationReducer'
import { useTheme } from '../hooks/useTheme'
import styles from './css/register.module.css'
import Hero from '../components/Hero/Hero'
import { useNavigate } from 'react-router-dom'
import Notification from '../components/Notification/Notification'

interface RegisterProps {
  language: ELanguages
  user: IUser
  heading: string
  text: string
  type: string
}
const RegisterPage = ({ language, user, heading, text, type }: RegisterProps) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (password !== confirmPassword) {
      dispatch(notify(`Passwords do not match!`, true, 8))
      return
    }
    dispatch(createUser({ name, username, password, language, verified: false }))
      .then(async () => {
        dispatch(
          notify(
            `Registration successful. Check your email for the verification link`,
            false,
            8
          )
        )
      })
      .catch((err) => {
        console.log(err)
        if (err.code === 'ERR_BAD_REQUEST') {
          dispatch(notify(`Error: ${err.response?.data?.message}`, true, 8))
          return
        }
        dispatch(notify(`Error: ${err.message}`, true, 8))
      })
  }

  const lightTheme = useTheme()

  return (
    <>
      <div
        className={`${heading
          ?.replace(/\s+/g, '-')
          .toLowerCase()
          .replace(/[^a-zA-Z]/g, '')} ${type} ${lightTheme ? styles.light : ''}`}
      >
        <Hero heading={heading} text={text} />
        <div className='inner-wrap'>
          <section className={`card`}>
            <div>
              <Register
                handleRegister={handleRegister}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                name={name}
                setName={setName}
              />
            </div>
          </section>
        </div>
      </div>
      <Notification />
    </>
  )
}

export default RegisterPage
