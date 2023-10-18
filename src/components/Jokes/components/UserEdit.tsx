import { useSelector } from 'react-redux'
import {
  IUser,
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
  ERegister,
  ERegistration,
  ReducerProps,
  EEdit,
  ECurrentPassword,
} from '../interfaces'
import { useEffect, useRef, useState } from 'react'

import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import Accordion from '../../Accordion/Accordion'
import { Select, SelectOption } from '../../Select/Select'
import { initializeUser } from '../reducers/authReducer'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { notify } from '../reducers/notificationReducer'
import { updateUser, findUserById } from '../reducers/usersReducer'
import { AxiosError } from 'axios'

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
const UserEdit = ({ user, language, setLanguage, options, getKeyByValue }: Props) => {
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<IUser['username']>(user?.username)
  const [name, setName] = useState<IUser['name'] | ''>(user?.name || '')
  const [passwordOld, setPasswordOld] = useState<IUser['password'] | ''>('')
  const [password, setPassword] = useState<IUser['password'] | ''>('')
  const [confirmPassword, setConfirmPassword] = useState<IUser['password'] | ''>('')

  const formRegisterRef = useRef<HTMLDivElement>(null)
  const titleRegister = ERegister[language]
  const titleRegistration = ERegistration[language]
  const titleEmail = EEmail[language]
  const titlePassword = EPassword[language]
  const titleConfirmPassword = EConfirmPassword[language]
  const titleNickname = ENickname[language]
  const titleEdit = EEdit[language]
  const titleCurrentPassword = ECurrentPassword[language]

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        dispatch(notify(`Passwords don't match`, true, 5))
      } else if (password.length < 10) {
        dispatch(notify(`Password must be at least 10 characters`, true, 5))
      }
      const _id = user._id
      const editedUser = {
        _id,
        name,
        passwordOld,
        password,
        language,
      }

      console.log('newUser', editedUser)

      if (user) {
        dispatch(updateUser(editedUser))
          .then((res) => {
            if (res) {
              console.log(res)
              dispatch(notify(`${res.message || 'updated!'}`, false, 5))
              dispatch(initializeUser())
              setUsername('')
              setName('')
              setPasswordOld('')
              setPassword('')
              setConfirmPassword('')
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

  useEffect(() => {}, [])

  return (
    <>
      {user ? (
        <Accordion
          className='edit-user'
          text={`» ${titleEdit} «`}
          ref={formRegisterRef}
          close={EClose[language as ELanguages]}
        >
          <h2>{titleEdit}</h2>

          <form onSubmit={handleUserSubmit} className='edit-user'>
            {/* <div className='input-wrap'>
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
            </div> */}
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
                  id='old-password'
                  value={passwordOld}
                  onChange={({ target }) => setPasswordOld(target.value)}
                />
                <span>{titleCurrentPassword}</span>
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
                <span>{titlePassword}</span>
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
                <span>{titleConfirmPassword}</span>
              </label>
            </div>
            <Select
              id='language-register'
              className='language'
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
            <button type='submit'>{titleEdit}</button>
          </form>
        </Accordion>
      ) : (
        <></>
      )}
    </>
  )
}

export default UserEdit
