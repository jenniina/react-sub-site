import {
  ECategory_cs,
  ECategory_de,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
  EJoke,
  EJokeType,
  ESelectAnOption,
  ESingle,
  ETwoPart,
  IJokeCategoryByLanguage,
  EClose,
  ELanguages,
  EJokeSetup,
  EJokeDelivery,
  ESubmitAJoke,
  ELanguageTitle,
  ECategoryTitle,
  ECategory_en,
  ELanguagesLong,
  ESubmit,
  ESend,
  EFlags,
  TFlagsLanguages,
  FlagsLanguage,
  IFlagsLanguages,
  EAddWarningTitle,
  ESafeTitle,
  ESafemode,
  ESafemodeTitle,
  EJokeTypeTitle,
  ESubmitAJokeTo,
  IJokeSubmissionSingleJSON,
  IJokeSubmissionTwoPartJSON,
  EConfirmPassword,
  EEmail,
  ENickname,
  EPassword,
  EEdit,
  ECurrentPassword,
  EError,
  ECurrentNickname,
} from '../Jokes/interfaces'
import { useState, useEffect } from 'react'
import { IUser } from '../../interfaces'
import { Select, SelectOption } from '../Select/Select'
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
  setLanguage: (language: ELanguages) => void
  categoryLanguages:
    | typeof ECategory_en
    | typeof ECategory_cs
    | typeof ECategory_de
    | typeof ECategory_es
    | typeof ECategory_fr
    | typeof ECategory_pt
  options: (enumObj: typeof ELanguages) => SelectOption[]
  getKeyByValue: (
    enumObj: typeof ELanguages,
    value: ELanguages
  ) => undefined | SelectOption['label']
}
const LanguageEdit = ({ user, language, setLanguage, options, getKeyByValue }: Props) => {
  const dispatch = useAppDispatch()

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
        name: user.name,
        passwordOld,
        language,
      }

      if (user) {
        dispatch(updateUser(editedUser))
          .then((res) => {
            if (res) {
              if (res.success === false) {
                dispatch(
                  notify(
                    `${EError[language]}: ${res.message ?? 'Error updating!'}`,
                    true,
                    5
                  )
                )
              } else {
                dispatch(notify(`${res.message ?? 'updated!'}`, false, 5))
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
            {titleEdit} {ELanguageTitle[language].toLowerCase()}
          </h2>

          <form onSubmit={handleUserSubmit} className={styles['edit-user']}>
            <Select
              id='language-register'
              className={`language ${styles.language}`}
              instructions='Language'
              hide
              options={options(ELanguages)}
              value={
                language
                  ? ({
                      value: language,
                      label: getKeyByValue(ELanguages, language),
                    } as SelectOption)
                  : undefined
              }
              onChange={(o) => {
                setLanguage(o?.value as ELanguages)
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

export default LanguageEdit
