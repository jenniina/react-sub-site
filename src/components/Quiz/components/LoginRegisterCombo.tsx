import { FC, useState, FormEvent } from 'react'
import FormLogin from './Login'
import Register from '../../Register/Register'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { IUser } from '../../../types'
import { createUser } from '../../../reducers/usersReducer'
import styles from '../css/quiz.module.css'
import { IHighscore } from '../types'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { getErrorMessage } from '../../../utils'

interface LoginRegisterComboProps {
  user: IUser
  highscoresLocal: IHighscore
  text: string
}

const LoginRegisterCombo: FC<LoginRegisterComboProps> = ({
  user,
  highscoresLocal,
  text,
}) => {
  const { t } = useLanguageContext()

  const dispatch = useAppDispatch()
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [sending, setSending] = useState(false)

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSending(true)
    if (password.trim() !== confirmPassword.trim()) {
      void dispatch(notify(t('PasswordsDoNotMatch'), true, 8))
      setSending(false)
      return
    }
    void dispatch(createUser({ name, username, password, language: 'en' }))
      .then(() => {
        void dispatch(notify(t('RegistrationSuccesful'), false, 8))
        setSending(false)
      })
      .catch((err: unknown) => {
        console.error(err)
        const message = getErrorMessage(err, t('Error'))
        void dispatch(notify(message, true, 8))
        setSending(false)
      })
  }

  return (
    <div
      className={`quiz-register-login-wrap register-login-wrap ${styles['register-login-wrap']}`}
    >
      <div className={`${loginOpen ? 'open' : ''} ${user ? 'logged' : ''}`}>
        <FormLogin
          setIsFormOpen={setLoginOpen}
          easy={highscoresLocal.easy}
          medium={highscoresLocal.medium}
          hard={highscoresLocal.hard}
        />
      </div>
      <div className={`${registerOpen ? 'open' : ''}`}>
        <Register
          sending={sending}
          setIsFormOpen={setRegisterOpen}
          handleRegister={handleRegister}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          name={name}
          setName={setName}
          text={text}
        />
      </div>
    </div>
  )
}

export default LoginRegisterCombo
