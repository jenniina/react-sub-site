import { ENickname, EError, EUserUpdated, EUserNotUpdated } from '../../interfaces'
import { EEditLanguagePreference } from './interfaces'
import { useState } from 'react'
import { IUser, EEdit, ELanguages, ECurrentPassword } from '../../interfaces'
import { Select, SelectOption } from '../Select/Select'
import { initializeUser, refreshUser } from '../../reducers/authReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { findUserById, updateUser } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import Notification from '../Notification/Notification'
import styles from './css/edit.module.css'

interface Props {
  language: ELanguages
  user: IUser
  setLanguage: (language: ELanguages) => void
  options: (enumObj: typeof ELanguages) => SelectOption[]
  getKeyByValue: (
    enumObj: typeof ELanguages,
    value: ELanguages
  ) => undefined | SelectOption['label']
}
const LanguageEdit = ({ user, language, setLanguage, options, getKeyByValue }: Props) => {
  const dispatch = useAppDispatch()

  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')

  const [lang, setLang] = useState<ELanguages>((user?.language as ELanguages) ?? language)

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
          .then((res) => {
            if (res) {
              if (res.success === false) {
                dispatch(notify(`${EError[language]}: ${res.message}`, true, 5))
              } else {
                dispatch(notify(`${res.message ?? EUserUpdated[lang]}`, false, 5))
                dispatch(refreshUser(res.user)).then(() => {
                  dispatch(findUserById(user?._id as string)).then(() =>
                    dispatch(initializeUser())
                  )
                  setLanguage(lang)
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
          <h2>{EEditLanguagePreference[language]}</h2>

          <form onSubmit={handleUserSubmit} className={styles['edit-user']}>
            <Select
              language={language}
              id='language-register'
              className={`language ${styles.language}`}
              instructions='Language'
              hide
              options={options(ELanguages)}
              value={
                lang
                  ? ({
                      value: lang,
                      label: getKeyByValue(ELanguages, lang),
                    } as SelectOption)
                  : undefined
              }
              onChange={(o) => {
                setLang(o?.value as ELanguages)
              }}
            />
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='password'
                  name='old-password'
                  id='old-password-user-language'
                  value={passwordOld}
                  onChange={({ target }) => setPasswordOld(target.value)}
                />
                <span>{ECurrentPassword[language]}</span>
              </label>
            </div>
            <button type='submit'>{EEdit[language]}</button>
          </form>

          <Notification language={language} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default LanguageEdit
