import { useContext, useState } from 'react'
import { IUser, ELanguages } from '../../types'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { updateUsername } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import styles from './css/edit.module.css'
import { LanguageContext } from '../../contexts/LanguageContext'

interface Props {
  language: ELanguages
  user: IUser
}
const UsernameEdit = ({ user, language }: Props) => {
  const { t } = useContext(LanguageContext)!

  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<IUser['username']>(user?.username ?? '')
  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')
  const [sending, setSending] = useState(false)

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
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
          dispatch(notify(`${t('EUsernameIsTheSame')}`, true, 5))
          setSending(false)
          return
        }
        dispatch(updateUsername(editedUser))
          .then((res) => {
            if (res) {
              if (res.success === false) {
                dispatch(notify(`${res.message ?? t('EError')}`, true, 5))
              } else {
                dispatch(notify(`${res.message ?? t('EUserUpdated')}`, false, 5))
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
              dispatch(notify(`${error.response.data.message}`, true, 5))
            } else {
              setTimeout(() => {
                dispatch(notify(t('EUserNotUpdated'), true, 5))
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
          <h2>{t('EEditEmail')}</h2>
          <p className={styles.p}>{t('ESendsAnEmailToTheNewAddressForVerification')}</p>
          <p className={`${styles.p} ${styles[`p-last`]}`}>
            {t('ECurrentEmail')}: <strong>{user?.username}</strong>
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
                <span>{t('EEmail')}</span>
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
                <span>{t('ECurrentPassword')}</span>
              </label>
            </div>

            <button type='submit' disabled={sending}>
              {t('EEdit')}
            </button>
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default UsernameEdit
