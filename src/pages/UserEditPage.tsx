import { useEffect, lazy, Suspense } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import { useTheme } from '../hooks/useTheme'
import { ELanguages, ELoading } from '../interfaces'
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
import { notify } from '../reducers/notificationReducer'

const PasswordEdit = lazy(() => import('../components/UserEdit/PasswordEdit'))
const UsernameEdit = lazy(() => import('../components/UserEdit/UsernameEdit'))
const LanguageEdit = lazy(() => import('../components/UserEdit/LanguageEdit'))
const NicknameEdit = lazy(() => import('../components/UserEdit/NicknameEdit'))

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
                <Suspense
                  fallback={
                    <div className='flex center margin0auto'>{ELoading[language]}...</div>
                  }
                >
                  <NicknameEdit user={user} language={language} />
                </Suspense>
              </div>
              <div className={styles.editform}>
                <Suspense
                  fallback={
                    <div className='flex center margin0auto'>{ELoading[language]}...</div>
                  }
                >
                  <UsernameEdit user={user} language={language} />
                </Suspense>
              </div>
              <div className={styles.editform}>
                <Suspense
                  fallback={
                    <div className='flex center margin0auto'>{ELoading[language]}...</div>
                  }
                >
                  <LanguageEdit
                    user={user}
                    language={language}
                    setLanguage={setLanguage}
                    options={options}
                    getKeyByValue={getKeyByValue}
                  />
                </Suspense>
              </div>
              <div className={styles.editform}>
                <Suspense
                  fallback={
                    <div className='flex center margin0auto'>{ELoading[language]}...</div>
                  }
                >
                  <PasswordEdit user={user} language={language} />
                </Suspense>
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
