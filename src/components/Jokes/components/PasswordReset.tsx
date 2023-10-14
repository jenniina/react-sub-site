import { useEffect, useRef, useState, FormEvent } from 'react'
import { AxiosError } from 'axios'
import { EEmailSent, EError, ESendingEmail, IUser, ReducerProps } from '../interfaces'
import Accordion from '../../Accordion/Accordion'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { notify } from '../reducers/notificationReducer'
import { initializeUser, login, logout } from '../reducers/authReducer'
import { forgot } from '../reducers/usersReducer'
import { useSelector } from 'react-redux'
import {
  EClose,
  ELanguages,
  EEmail,
  EPassword,
  EForgotPassword,
  ESendResetLink,
} from '../interfaces'

interface LoginProps {
  language: ELanguages
}

const PasswordReset = ({ language }: LoginProps) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<string | undefined>('')

  const titleEmail = EEmail[language]
  const titleForgotPassword = EForgotPassword[language]
  const titleSendResetLink = ESendResetLink[language]

  const formForgotRef = useRef(null)

  const handleForgot = async (event: FormEvent) => {
    event.preventDefault()

    if (username)
      await dispatch(forgot(username, language))
        .then((r) => {
          dispatch(notify(`${ESendingEmail[language]}`, false, 2))
          setTimeout(() => {
            dispatch(notify(r.message || EEmailSent[language], false, 3))
          }, 2200)
          setUsername('')
          //scroll to anchor "userjokes"
          const anchor = document.querySelector('#userjokes')
          if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        })
        .catch((e) => {
          console.log(e)
          if (e.code === 'ERR_NETWORK') {
            dispatch(notify(`${EError[language]}: ${e.message}`, true, 8))
          } else if (e.code === 'ERR_BAD_REQUEST')
            dispatch(notify(`${EError[language]}: ${e.response.data.message}`, true, 8))
          else {
            dispatch(notify(`${EError[language]}: ${e.message}`, true, 8))
          }
        })
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
          <button type='submit' id='forgot' className='forgot-btn'>
            {titleSendResetLink}
          </button>
        </form>
      </Accordion>
    </>
  )
}

export default PasswordReset
