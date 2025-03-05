import { FC, useState, FormEvent, useContext } from 'react'
import FormLogin from './Login'
import Register from '../../Register/Register'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { ELanguages, IUser } from '../../../types'
import { createUser } from '../../../reducers/usersReducer'
import styles from '../css/quiz.module.css'
import { IHighscore } from '../types'
import { LanguageContext } from '../../../contexts/LanguageContext'

interface LoginRegisterComboProps {
  language: ELanguages
  user: IUser
  highscoresLocal: IHighscore
  text: string
}

const LoginRegisterCombo: FC<LoginRegisterComboProps> = ({
  language,
  user,
  highscoresLocal,
  text,
}) => {
  const { t } = useContext(LanguageContext)!

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
      dispatch(notify(t('EPasswordsDoNotMatch'), true, 8))
      setSending(false)
      return
    }
    dispatch(createUser({ name, username, password, language: 'en' }))
      .then(async () => {
        dispatch(notify(t('ERegistrationSuccesful'), false, 8))
        setSending(false)
      })
      .catch((err) => {
        console.error(err)
        if (err.response?.data?.message)
          dispatch(notify(err.response.data.message, true, 8))
        else dispatch(notify(`${t('EError')}: ${err.message}`, true, 8))
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
          language={language}
          easy={highscoresLocal.easy}
          medium={highscoresLocal.medium}
          hard={highscoresLocal.hard}
        />
      </div>
      <div className={`${registerOpen ? 'open' : ''}`}>
        <Register
          sending={sending}
          setIsFormOpen={setRegisterOpen}
          language={language}
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
