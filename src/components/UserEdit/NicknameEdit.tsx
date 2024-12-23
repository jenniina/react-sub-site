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
  EPleaseUseGoodTasteWhenChoosingYourNickname,
} from '../../interfaces'
import { initializeUser, refreshUser } from '../../reducers/authReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { findUserById, updateUser } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import styles from './css/edit.module.css'
import { EEditPreferredNickname } from './interfaces'

interface Props {
  language: ELanguages
  user: IUser
}
const NicknameEdit = ({ user, language }: Props) => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState<IUser['name'] | ''>(user?.name || '')
  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')
  const [sending, setSending] = useState(false)

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
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
                  dispatch(findUserById(user?._id as string)).then(() =>
                    dispatch(initializeUser())
                  )
                })
                setPasswordOld('')
              }
            }
            setSending(false)
          })
          .catch((error: AxiosError<{ message?: string }>) => {
            console.error(error)
            if (error.response?.data?.message)
              dispatch(notify(error.response.data.message, true, 8))
            else if (error.code === 'ERR_BAD_REQUEST' && error.response?.data?.message) {
              dispatch(
                notify(`${EError[language]}: ${error.response.data.message}`, true, 5)
              )
            } else {
              setTimeout(() => {
                dispatch(notify(EUserNotUpdated[language], true, 5))
              }, 2000)
            }
            setSending(false)
          })
      }

      //const language = e.currentTarget.language.value
    } catch (error: any) {
      if (error.response?.data?.message)
        dispatch(notify(error.response.data.message, true, 8))
      else console.error('error', error)
      setSending(false)
    }
  }

  return (
    <>
      {user ? (
        <>
          <h2>{EEditPreferredNickname[language]}</h2>
          <p className={styles.p}>
            {ECurrentNickname[language]}: <strong>{user?.name}</strong>
          </p>
          <p className={`${styles.p} ${styles[`p-last`]}`}>
            {EPleaseUseGoodTasteWhenChoosingYourNickname[language]}
          </p>

          <form onSubmit={handleUserSubmit} className={styles['edit-user']}>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='text'
                  name='name'
                  id='name-edit'
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
                <span>{ENickname[language]}</span>
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
                  onChange={({ target }) => setPasswordOld(target.value.trim())}
                />
                <span>{ECurrentPassword[language]}</span>
              </label>
            </div>
            <button type='submit' disabled={sending}>
              {EEdit[language]}
            </button>
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default NicknameEdit
