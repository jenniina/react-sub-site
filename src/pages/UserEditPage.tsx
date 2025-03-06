import { useEffect, lazy, Suspense, useState, useContext } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { ELanguages, ELanguagesLong } from '../types'
import styles from './css/useredit.module.css'
import { SelectOption } from '../components/Select/Select'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { ReducerProps } from '../types'
import { initializeUser, logout } from '../reducers/authReducer'
import { removeUser } from '../reducers/usersReducer'
import { notify } from '../reducers/notificationReducer'
import { LanguageContext } from '../contexts/LanguageContext'

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
  options: (enumObj: typeof ELanguagesLong) => SelectOption[]
}

const UserEditPage = ({ language, setLanguage, heading, text, type, options }: Props) => {
  const { t } = useContext(LanguageContext)!

  const lightTheme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)

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
    setSending(true)
    if (user) {
      if (window.confirm(`${t('AreYouSureYouWantToDelete')} ${user.username}?`)) {
        if (window.confirm(`${t('YouWillLoseAllTheDataAssociatedWithIt')}`)) {
          if (window.confirm(t('DoYouWishToRemoveAnyJokesYouveAuthored'))) {
            dispatch(removeUser(user._id, true)).then(() => {
              dispatch(logout())
              navigate('/')
              dispatch(notify(t('AccountDeleted'), false, 8))
            })
            setSending(false)
          } else {
            dispatch(removeUser(user._id, false)).then(() => {
              dispatch(logout())
              navigate('/')
              dispatch(notify(t('AccountDeleted'), false, 8))
              setSending(false)
            })
          }
        } else {
          setSending(false)
        }
      } else {
        setSending(false)
      }
    } else {
      setSending(false)
    }
  }

  return (
    <>
      <div className={`edit ${type} ${lightTheme ? styles.light : ''}`}>
        <div className='inner-wrap'>
          <section className={`card`}>
            <div>
              <div className={styles.editform}>
                <Suspense
                  fallback={
                    <div className='flex center margin0auto textcenter'>
                      {t('Loading')}...
                    </div>
                  }
                >
                  <NicknameEdit user={user} language={language} />
                </Suspense>
              </div>
              <div className={styles.editform}>
                <Suspense
                  fallback={
                    <div className='flex center margin0auto textcenter'>
                      {t('Loading')}...
                    </div>
                  }
                >
                  <UsernameEdit user={user} language={language} />
                </Suspense>
              </div>
              <div className={styles.editform}>
                <Suspense
                  fallback={
                    <div className='flex center margin0auto textcenter'>
                      {t('Loading')}...
                    </div>
                  }
                >
                  <LanguageEdit
                    user={user}
                    language={language}
                    setLanguage={setLanguage}
                    options={options}
                  />
                </Suspense>
              </div>
              <div className={styles.editform}>
                <Suspense
                  fallback={
                    <div className='flex center margin0auto textcenter'>
                      {t('Loading')}...
                    </div>
                  }
                >
                  <PasswordEdit user={user} language={language} />
                </Suspense>
              </div>
              {user ? (
                <form onSubmit={handleUserRemove} className='flex center'>
                  <button
                    type='submit'
                    disabled={sending}
                    className={`submit danger ${styles['delete-account']} ${styles.submit}`}
                  >
                    <TiDeleteOutline /> {t('DeleteAccount')}
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
