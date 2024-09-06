import { useState } from 'react'
import {
  IUser,
  EEmail,
  ELanguages,
  EEdit,
  ECurrentPassword,
  EUsernameIsTheSame,
  EUserNotUpdated,
  EError,
  EUserUpdated,
} from '../../interfaces'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { updateUsername } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import Notification from '../Notification/Notification'
import styles from './css/edit.module.css'
import {
  ECurrentEmail,
  EEditEmail,
  ESendsAnEmailToTheNewAddressForVerification,
} from './interfaces'

interface Props {
  language: ELanguages
  user: IUser
}
const UsernameEdit = ({ user, language }: Props) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<IUser['username']>(user?.username ?? '')
  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const _id = user._id
      const editedUser = {
        _id,
        username,
        passwordOld,
        language,
      }

      if (user) {
        if (username.trim() === user.username.trim()) {
          dispatch(notify(`${EUsernameIsTheSame[language]}`, true, 5))
          return
        }
        dispatch(updateUsername(editedUser))
          .then((res) => {
            if (res) {
              if (res.success === false) {
                dispatch(notify(`${res.message ?? EError[language]}`, true, 5))
              } else {
                dispatch(notify(`${res.message ?? EUserUpdated[language]}`, false, 5))
                setPasswordOld('')
              }
            }
          })
          .catch((error: AxiosError<{ message?: string }>) => {
            console.error(error)
            if (error.code === 'ERR_BAD_REQUEST' && error.response?.data?.message) {
              dispatch(notify(`${error.response.data.message}`, true, 5))
            } else {
              setTimeout(() => {
                dispatch(notify(EUserNotUpdated[language], true, 5))
              }, 2000)
            }
          })
      }

      //const language = e.currentTarget.language.value
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <>
      {user ? (
        <>
          <h2>{EEditEmail[language]}</h2>
          <p className={styles.p}>
            {ESendsAnEmailToTheNewAddressForVerification[language]}
          </p>
          <p className={`${styles.p} ${styles[`p-last`]}`}>
            {ECurrentEmail[language]}: <strong>{user?.username}</strong>
          </p>

          <form onSubmit={handleUserSubmit} className={styles['edit-user']}>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='text'
                  name='username'
                  id='username'
                  value={username}
                  onChange={({ target }) => setUsername(target.value.trim())}
                />
                <span>{EEmail[language]}</span>
              </label>
            </div>

            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='password'
                  name='old-password'
                  id='old-password-username'
                  value={passwordOld}
                  onChange={({ target }) => setPasswordOld(target.value.trim())}
                />
                <span>{ECurrentPassword[language]}</span>
              </label>
            </div>

            <button type='submit'>{EEdit[language]}</button>
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default UsernameEdit
