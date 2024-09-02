import { useState } from 'react'
import {
  ELanguages,
  EEdit,
  ECurrentPassword,
  IUser,
  EConfirmPassword,
  EPassword,
  EPasswordMustBeAtLeastTenCharacters,
  EPasswordsDoNotMatch,
  EError,
  EUserUpdated,
  EUserNotUpdated,
} from '../../interfaces'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { updatePassword } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import Notification from '../Notification/Notification'
import styles from './css/edit.module.css'
import { EEditPassword } from './interfaces'

interface Props {
  language: ELanguages
  user: IUser
}
const PasswordEdit = ({ user, language }: Props) => {
  const dispatch = useAppDispatch()

  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')
  const [password, setPassword] = useState<IUser['password'] | ''>('')
  const [confirmPassword, setConfirmPassword] = useState<IUser['password'] | ''>('')

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        dispatch(notify(EPasswordsDoNotMatch[language], true, 5))
        return
      } else if (password.length < 10) {
        dispatch(notify(EPasswordMustBeAtLeastTenCharacters[language], true, 5))
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
                dispatch(notify(`${res.message || EError[language]}`, true, 5))
              } else {
                dispatch(notify(`${res.message || EUserUpdated[language]}`, false, 5))
                setPasswordOld('')
                setPassword('')
                setConfirmPassword('')
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
          <h2>{EEditPassword[language]}</h2>

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
                <span>{ECurrentPassword[language]}</span>
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
                <span>{EPassword[language]}</span>
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
                <span>{EConfirmPassword[language]}</span>
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

export default PasswordEdit
