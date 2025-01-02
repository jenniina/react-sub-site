import { useState, FormEvent } from 'react'
import { RiMailSendLine } from 'react-icons/ri'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { forgot } from '../../reducers/usersReducer'
import {
  ELanguages,
  EEmail,
  EForgotPassword,
  EPassword,
  ESendResetLink,
  EEmailSent,
  EError,
  ESendingEmail,
} from '../../types'

interface Props {
  language: ELanguages
  text?: string
}

const PasswordReset = ({ language, text }: Props) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<string | undefined>('')
  const [sending, setSending] = useState(false)

  const handleForgot = async (event: FormEvent) => {
    event.preventDefault()
    setSending(true)
    dispatch(notify(`${ESendingEmail[language]}`, false, 2))

    if (username) {
      await dispatch(forgot(username, language))
        .then((r) => {
          dispatch(notify(r.message || EEmailSent[language], false, 3))
          setSending(false)
        })
        .catch((e) => {
          dispatch(notify(EEmailSent[language], false, 3))
          setSending(false)
          // console.error(e)
          // if (e.code === 'ERR_NETWORK') {
          //   dispatch(notify(`${EError[language]}: ${e.message}`, true, 8))
          // } else if (e.code === 'ERR_BAD_REQUEST')
          //   dispatch(notify(`${EError[language]}: ${e.response.data.message}`, true, 8))
          // else {
          //   dispatch(notify(`${EError[language]}: ${e.message}`, true, 8))
          // }
        })
    } else {
      dispatch(
        notify(`${EError[language]}: ${EEmail[language]} ${EPassword[language]}`, true, 8)
      )
      setSending(false)
    }
  }

  return (
    <>
      <h2>{EForgotPassword[language]}</h2>

      <form onSubmit={handleForgot} className='forgot'>
        <div className='input-wrap'>
          <label>
            <input
              name='username'
              type='text'
              value={username}
              required
              autoComplete='email'
              onChange={({ target }) => setUsername(target.value.trim())}
            />
            <span>{EEmail[language]}: </span>
          </label>
        </div>
        <button
          type='submit'
          disabled={sending}
          id={`forgot-${text}`}
          className='forgot-btn restore'
        >
          <span>{ESendResetLink[language]}</span> <RiMailSendLine />
        </button>
      </form>
    </>
  )
}

export default PasswordReset
