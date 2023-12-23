import { useState } from 'react'
import {
  ELanguages,
  EEdit,
  ECurrentPassword,
  IUser,
  EConfirmPassword,
  EPassword,
} from '../../interfaces'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { updatePassword } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import Notification from '../Notification/Notification'
import styles from './css/edit.module.css'

interface Props {
  language: ELanguages
  user: IUser
}
const PasswordEdit = ({ user, language }: Props) => {
  const dispatch = useAppDispatch()

  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')
  const [password, setPassword] = useState<IUser['password'] | ''>('')
  const [confirmPassword, setConfirmPassword] = useState<IUser['password'] | ''>('')

  const titlePassword = EPassword[language]
  const titleConfirmPassword = EConfirmPassword[language]
  const titleEdit = EEdit[language]
  const titleCurrentPassword = ECurrentPassword[language]

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        dispatch(notify(`Passwords don't match`, true, 5))
        return
      } else if (password.length < 10) {
        dispatch(notify(`Password must be at least 10 characters`, true, 5))
        return
      }
      const _id = user._id
      const editedUser = {
        _id,
        passwordOld,
        password,
        language,
      }

      if (user) {
        dispatch(updatePassword(editedUser))
          .then((res) => {
            if (res) {
              if (res.success === false) {
                dispatch(notify(`${res.message || 'Error updating!'}`, true, 5))
              } else {
                dispatch(notify(`${res.message || 'updated!'}`, false, 5))
                setPasswordOld('')
                setPassword('')
                setConfirmPassword('')
              }
            }
          })
          .catch((error: AxiosError<{ message?: string }>) => {
            console.log(error)
            if (error.code === 'ERR_BAD_REQUEST' && error.response?.data?.message) {
              dispatch(notify(`${error.response.data.message}`, true, 5))
            } else {
              setTimeout(() => {
                dispatch(notify(`User not updated`, true, 5))
              }, 2000)
            }
          })
      }

      //const language = e.currentTarget.language.value
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      {user ? (
        <>
          <h2>
            {titleEdit} {EPassword[language].toLowerCase()}
          </h2>

          <form onSubmit={handleUserSubmit} className={styles['edit-user']}>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='password'
                  name='old-password'
                  id='old-password'
                  value={passwordOld}
                  onChange={({ target }) => setPasswordOld(target.value)}
                />
                <span>{titleCurrentPassword}</span>
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
                <span>{titlePassword}</span>
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
                <span>{titleConfirmPassword}</span>
              </label>
            </div>
            <button type='submit'>{titleEdit}</button>
          </form>

          <Notification />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default PasswordEdit
