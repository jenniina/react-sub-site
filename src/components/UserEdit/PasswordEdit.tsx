import React, { useContext, useState } from 'react'
import { ELanguages, IUser } from '../../types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { updatePassword } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import styles from './css/edit.module.css'
import { useLanguageContext } from '../../contexts/LanguageContext'

interface Props {
  language: ELanguages
  user: IUser
}
const PasswordEdit = ({ user, language }: Props) => {
  const { t } = useLanguageContext()

  const dispatch = useAppDispatch()

  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')
  const [password, setPassword] = useState<IUser['password'] | ''>('')
  const [confirmPassword, setConfirmPassword] = useState<
    IUser['password'] | ''
  >('')
  const [sending, setSending] = useState(false)

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    try {
      if (password.trim() !== confirmPassword.trim()) {
        dispatch(notify(t('PasswordsDoNotMatch'), true, 5))
        setSending(false)
        return
      } else if (password.length < 10) {
        dispatch(notify(t('PasswordMustBeAtLeastTenCharacters'), true, 5))
        setSending(false)
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
          .then(res => {
            if (res) {
              if (res.success === false) {
                dispatch(notify(`${res.message || t('Error')}`, true, 5))
              } else {
                dispatch(notify(`${res.message || t('UserUpdated')}`, false, 5))
                setPasswordOld('')
                setPassword('')
                setConfirmPassword('')
              }
            }
            setSending(false)
          })
          .catch((error: AxiosError<{ message?: string }>) => {
            console.error(error)
            if (error.response?.data?.message)
              dispatch(notify(error.response.data.message, true, 8))
            else if (
              error.code === 'ERR_BAD_REQUEST' &&
              error.response?.data?.message
            ) {
              dispatch(notify(`${error.response.data.message}`, true, 5))
            } else {
              setTimeout(() => {
                dispatch(notify(t('UserNotUpdated'), true, 5))
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
    }
  }

  return (
    <>
      {user ? (
        <>
          <h2>{t('EditPassword')}</h2>

          <form onSubmit={handleUserSubmit} className={styles['edit-user']}>
            <div className="input-wrap">
              <label>
                <input
                  required
                  type="password"
                  name="old-password"
                  id="old-password"
                  value={passwordOld}
                  onChange={({ target }) => setPasswordOld(target.value.trim())}
                />
                <span>{t('CurrentPassword')}</span>
              </label>
            </div>
            <div className="input-wrap">
              <label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password-edit"
                  value={password}
                  onChange={({ target }) => setPassword(target.value.trim())}
                />
                <span>{t('Password')}</span>
              </label>
            </div>
            <div className="input-wrap">
              <label>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={({ target }) =>
                    setConfirmPassword(target.value.trim())
                  }
                />
                <span>{t('ConfirmPassword')}</span>
              </label>
            </div>
            <button type="submit" disabled={sending}>
              {t('Edit')}
            </button>
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default PasswordEdit
