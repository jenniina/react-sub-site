import { IUser, ELanguages, ELanguagesLong } from '../../types'
import React, { useContext, useState } from 'react'
import { Select, SelectOption } from '../Select/Select'
import { initializeUser, refreshUser } from '../../reducers/authReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { findUserById, updateUser } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import styles from './css/edit.module.css'
import { useLanguageContext } from '../../contexts/LanguageContext'

interface Props {
  language: ELanguages
  user: IUser
  setLanguage: (language: ELanguages) => void
  options: (enumObj: typeof ELanguagesLong) => SelectOption[]
}
const LanguageEdit = ({ user, language, setLanguage, options }: Props) => {
  const dispatch = useAppDispatch()

  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')

  const { t } = useLanguageContext()

  const [lang, setLang] = useState<ELanguages>(
    (user?.language as ELanguages) ?? language
  )

  const [sending, setSending] = useState(false)

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    try {
      const _id = user._id
      const editedUser = {
        _id,
        name: user.name,
        passwordOld,
        language: lang,
      }

      if (user) {
        dispatch(updateUser(editedUser))
          .then(res => {
            if (res) {
              if (res.success === false) {
                dispatch(notify(`${t('Error')}: ${res.message}`, true, 5))
              } else {
                dispatch(notify(`${res.message ?? t('UserUpdated')}`, false, 5))
                dispatch(refreshUser(res.user)).then(() => {
                  dispatch(findUserById(user?._id as string)).then(() =>
                    dispatch(initializeUser())
                  )
                  setLanguage(lang)
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
            else if (
              error.code === 'ERR_BAD_REQUEST' &&
              error.response?.data?.message
            ) {
              dispatch(
                notify(`${t('Error')}: ${error.response.data.message}`, true, 5)
              )
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
          <h2>{t('EditLanguagePreference')}</h2>

          <form onSubmit={handleUserSubmit} className={styles['edit-user']}>
            <Select
              language={language}
              id="language-register"
              className={`language ${styles.language}`}
              instructions="Language"
              hide
              options={options(ELanguagesLong)}
              value={
                lang
                  ? ({
                      value: lang,
                      label: ELanguagesLong[lang],
                    } as SelectOption)
                  : undefined
              }
              onChange={o => {
                setLang(o?.value as ELanguages)
              }}
            />
            <div className="input-wrap">
              <label>
                <input
                  required
                  type="password"
                  name="old-password"
                  id="old-password-user-language"
                  value={passwordOld}
                  onChange={({ target }) => setPasswordOld(target.value.trim())}
                />
                <span>{t('CurrentPassword')}</span>
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

export default LanguageEdit
