import { useState, FormEvent, useContext } from 'react'
import { RiMailSendLine } from 'react-icons/ri'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { forgot } from '../../reducers/usersReducer'
import { ELanguages } from '../../types'
import { useLanguageContext } from '../../contexts/LanguageContext'

interface Props {
  language: ELanguages
  text?: string
}

const PasswordReset = ({ language, text }: Props) => {
  const { t } = useLanguageContext()

  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<string | undefined>('')
  const [sending, setSending] = useState(false)

  const handleForgot = async (event: FormEvent) => {
    event.preventDefault()
    setSending(true)
    dispatch(notify(`${t('SendingEmail')}`, false, 2))

    if (username) {
      await dispatch(forgot(username, language))
        .then(r => {
          dispatch(notify(r.message || t('EmailSent'), false, 3))
          setSending(false)
        })
        .catch(e => {
          dispatch(notify(t('EmailSent'), false, 3))
          setSending(false)
          // console.error(e)
          // if (e.code === 'ERR_NETWORK') {
          //   dispatch(notify(`${t('Error')}: ${e.message}`, true, 8))
          // } else if (e.code === 'ERR_BAD_REQUEST')
          //   dispatch(notify(`${t('Error')}: ${e.response.data.message}`, true, 8))
          // else {
          //   dispatch(notify(`${t('Error')}: ${e.message}`, true, 8))
          // }
        })
    } else {
      dispatch(notify(`${t('Error')}: ${t('Email')} ${t('Password')}`, true, 8))
      setSending(false)
    }
  }

  return (
    <>
      <h2>{t('ForgotPassword')}</h2>

      <form onSubmit={handleForgot} className="forgot">
        <div className="input-wrap">
          <label>
            <input
              name="username"
              type="text"
              value={username}
              required
              autoComplete="email"
              onChange={({ target }) => setUsername(target.value.trim())}
            />
            <span>{t('Email')}: </span>
          </label>
        </div>
        <button
          type="submit"
          disabled={sending}
          id={`forgot-${text}`}
          className="forgot-btn restore"
        >
          <span>{t('SendResetLink')}</span> <RiMailSendLine />
        </button>
      </form>
    </>
  )
}

export default PasswordReset
