import { useState } from 'react'
import {
  EError,
  IUser,
  ENickname,
  EEdit,
  ELanguages,
  ECurrentPassword,
  ECurrentNickname,
  EUserUpdated,
  EUserNotUpdated,
} from '../../interfaces'
import { initializeUser, refreshUser } from '../../reducers/authReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { updateUser } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import Notification from '../Notification/Notification'
import styles from './css/edit.module.css'

interface Props {
  language: ELanguages
  user: IUser
}
const NicknameEdit = ({ user, language }: Props) => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState<IUser['name'] | ''>(user?.name || '')
  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')

  const titleNickname = ENickname[language]
  const titleEdit = EEdit[language]
  const titleCurrentPassword = ECurrentPassword[language]

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const _id = user._id
      const editedUser = {
        _id,
        name,
        passwordOld,
        language,
      }

      if (user) {
        dispatch(updateUser(editedUser))
          .then((res) => {
            if (res) {
              if (res.success === false) {
                dispatch(notify(`${EError[language]}: ${res.message}`, true, 5))
              } else {
                dispatch(notify(`${res.message ?? EUserUpdated[language]}`, false, 5))
                dispatch(refreshUser(res.user)).then(() => {
                  dispatch(initializeUser())
                })
                setPasswordOld('')
              }
            }
          })
          .catch((error: AxiosError<{ message?: string }>) => {
            console.log(error)
            if (error.code === 'ERR_BAD_REQUEST' && error.response?.data?.message) {
              dispatch(
                notify(`${EError[language]}: ${error.response.data.message}`, true, 5)
              )
            } else {
              setTimeout(() => {
                dispatch(notify(EUserNotUpdated[language], true, 5))
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
            {titleEdit} {titleNickname.toLowerCase()}
          </h2>
          <p className={styles.p}>
            {ECurrentNickname[language]}: <strong>{user?.name}</strong>
          </p>

          <form onSubmit={handleUserSubmit} className={styles['edit-user']}>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
                <span>{titleNickname}</span>
              </label>
            </div>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='password'
                  name='old-password'
                  id='old-password-user'
                  value={passwordOld}
                  onChange={({ target }) => setPasswordOld(target.value)}
                />
                <span>{titleCurrentPassword}</span>
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

export default NicknameEdit
