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
  EUsername,
  EUsernameIsTheSame,
} from '../Jokes/interfaces'
import { useState } from 'react'
import { IUser } from '../../interfaces'
import { initializeUser } from '../../reducers/authReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { updateUsername } from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import Notification from '../Notification/Notification'
import styles from './css/edit.module.css'

interface Props {
  language: ELanguages
  user: IUser
}
const UsernameEdit = ({ user, language }: Props) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<IUser['username']>(user?.username ?? '')
  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')

  const titleEmail = EEmail[language]
  const titleEdit = EEdit[language]
  const titleCurrentPassword = ECurrentPassword[language]

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const _id = user._id
      const editedUser = {
        _id,
        username,
        passwordOld,
        language,
      }

      if (user) {
        if (username === user.username) {
          dispatch(notify(`${EUsernameIsTheSame[language]}`, true, 5))
          return
        }
        dispatch(updateUsername(editedUser))
          .then((res) => {
            if (res) {
              if (res.success === false) {
                dispatch(notify(`${res.message ?? 'Error updating!'}`, true, 5))
              } else {
                dispatch(notify(`${res.message ?? 'updated!'}`, false, 5))
                setPasswordOld('')
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
            {titleEdit} {titleEmail.toLowerCase()}
          </h2>
          <p className={styles.p}>
            <strong>{user?.username}</strong>
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
                  onChange={({ target }) => setUsername(target.value)}
                />
                <span>{titleEmail}</span>
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

export default UsernameEdit
