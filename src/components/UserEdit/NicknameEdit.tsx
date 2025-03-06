import { useContext, useState } from 'react'
import { IUser, ELanguages } from '../../types'
import { initializeUser, refreshUser } from '../../reducers/authReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { findUserById, updateUser } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import styles from './css/edit.module.css'
import { LanguageContext } from '../../contexts/LanguageContext'

interface Props {
  language: ELanguages
  user: IUser
}
const NicknameEdit = ({ user, language }: Props) => {
  const { t } = useContext(LanguageContext)!

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
                dispatch(notify(`${t('Error')}: ${res.message}`, true, 5))
              } else {
                dispatch(notify(`${res.message ?? t('UserUpdated')}`, false, 5))
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
              dispatch(notify(`${t('Error')}: ${error.response.data.message}`, true, 5))
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
      setSending(false)
    }
  }

  return (
    <>
      {user ? (
        <>
          <h2>{t('EditPreferredNickname')}</h2>
          <p className={styles.p}>
            {t('CurrentNickname')}: <strong>{user?.name}</strong>
          </p>
          <p className={`${styles.p} ${styles[`p-last`]}`}>
            {t('PleaseUseGoodTasteWhenChoosingYourNickname')}
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
                <span>{t('Nickname')}</span>
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
                <span>{t('CurrentPassword')}</span>
              </label>
            </div>
            <button type='submit' disabled={sending}>
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

export default NicknameEdit
