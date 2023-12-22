import { useEffect, useRef, useState, FormEvent } from 'react'
import { AxiosError } from 'axios'
import { IUser, ReducerProps } from '../../interfaces'
import { EEmailSent, EError, ESendingEmail } from '../Jokes/interfaces'
import Accordion from '../Accordion/Accordion'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { initializeUser, login, logout } from '../../reducers/authReducer'
import { forgot } from '../../reducers/usersReducer'
import { useSelector } from 'react-redux'
import {
  EClose,
  ELanguages,
  EEmail,
  EPassword,
  EForgotPassword,
  ESendResetLink,
} from '../Jokes/interfaces'

interface Props {
  language: ELanguages
  text?: string
}

const PasswordReset = ({ language, text }: Props) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<string | undefined>('')

  const titleEmail = EEmail[language]
  const titleForgotPassword = EForgotPassword[language]
  const titleSendResetLink = ESendResetLink[language]

  const formForgotRef = useRef(null)

  const handleForgot = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(notify(`${ESendingEmail[language]}`, false, 2))

    if (username) {
      await dispatch(forgot(username, language))
        .then((r) => {
          dispatch(notify(r.message || EEmailSent[language], false, 3))
        })
        .catch((e) => {
          dispatch(notify(EEmailSent[language], false, 3))
          // console.log(e)
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
    }
  }

  return (
    <>
      <Accordion
        className='password-reset'
        text={`${titleForgotPassword}`}
        ref={formForgotRef}
        close={EClose[language as ELanguages]}
      >
        <h2>{titleForgotPassword}</h2>

        <form onSubmit={handleForgot} className='forgot'>
          <div className='input-wrap'>
            <label>
              <input
                name='username'
                type='text'
                value={username}
                required
                onChange={({ target }) => setUsername(target.value)}
              />
              <span>{titleEmail}: </span>
            </label>
          </div>
          <button type='submit' id={`forgot-${text}`} className='forgot-btn'>
            {titleSendResetLink}
          </button>
        </form>
      </Accordion>
    </>
  )
}

export default PasswordReset
