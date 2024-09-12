import { useEffect } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import { useTheme } from '../hooks/useTheme'
import Notification from '../components/Notification/Notification'
import { ELanguages } from '../interfaces'
import {
  EAreYouSureYouWantToDelete,
  EYouWillLoseAllTheDataAssociatedWithIt,
  EDeleteAccount,
  EDoYouWishToRemoveAnyJokesYouveAuthored,
  EAccountDeleted,
} from '../components/UserEdit/interfaces'
import styles from './css/useredit.module.css'
import { SelectOption } from '../components/Select/Select'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { ReducerProps } from '../interfaces'
import { initializeUser, logout } from '../reducers/authReducer'
import { removeUser } from '../reducers/usersReducer'
import PasswordEdit from '../components/UserEdit/PasswordEdit'
import UsernameEdit from '../components/UserEdit/UsernameEdit'
import LanguageEdit from '../components/UserEdit/LanguageEdit'
import NicknameEdit from '../components/UserEdit/NicknameEdit'
import { notify } from '../reducers/notificationReducer'

interface Props {
  language: ELanguages
  setLanguage: (language: ELanguages) => void
  heading: string
  text: string
  type: string
  options: (enumObj: typeof ELanguages) => SelectOption[]
  getKeyByValue: (
    enumObj: typeof ELanguages,
    value: ELanguages
  ) => undefined | SelectOption['label']
}

const UserEditPage = ({
  language,
  setLanguage,
  heading,
  text,
  type,
  options,
  getKeyByValue,
}: Props) => {
  const lightTheme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        navigate('/')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [user])

  const handleUserRemove = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      if (window.confirm(`${EAreYouSureYouWantToDelete[language]} ${user.username}?`))
        if (window.confirm(`${EYouWillLoseAllTheDataAssociatedWithIt[language]}`))
          if (window.confirm(EDoYouWishToRemoveAnyJokesYouveAuthored[language])) {
            dispatch(removeUser(user._id, true)).then(() => {
              dispatch(logout())
              navigate('/')
              dispatch(notify(EAccountDeleted[language], false, 8))
            })
          } else {
            dispatch(removeUser(user._id, false)).then(() => {
              dispatch(logout())
              navigate('/')
              dispatch(notify(EAccountDeleted[language], false, 8))
            })
          }
    }
  }

  return (
    <>
      <div className={`edit ${type} ${lightTheme ? styles.light : ''}`}>
        <Hero language={language} address='edit' heading={heading} text={text} />
        <div className='inner-wrap'>
          <section className={`card`}>
            <div>
              <div className={styles.editform}>
                <NicknameEdit user={user} language={language} />
              </div>
              <div className={styles.editform}>
                <UsernameEdit user={user} language={language} />
              </div>
              <div className={styles.editform}>
                <LanguageEdit
                  user={user}
                  language={language}
                  setLanguage={setLanguage}
                  options={options}
                  getKeyByValue={getKeyByValue}
                />
              </div>
              <div className={styles.editform}>
                <PasswordEdit user={user} language={language} />
              </div>
              {user ? (
                <form onSubmit={handleUserRemove} className='flex center'>
                  <button
                    type='submit'
                    className={`submit danger ${styles['delete-account']} ${styles.submit}`}
                  >
                    <TiDeleteOutline /> {EDeleteAccount[language]}
                  </button>
                </form>
              ) : (
                ''
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default UserEditPage
