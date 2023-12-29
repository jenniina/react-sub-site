import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import { useTheme } from '../hooks/useTheme'
import Notification from '../components/Notification/Notification'
import {
  ECategory,
  ECategory_cs,
  ECategory_de,
  ECategory_en,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
  EJokeType,
  ESafemode,
} from '../components/Jokes/interfaces'
import {
  EAreYouSureYouWantToDelete,
  EDelete,
  EDeleteAccount,
  ELanguages,
  EYouWillLoseAllTheDataAssociatedWithIt,
} from '../interfaces'
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

interface Props {
  language: ELanguages
  setLanguage: (language: ELanguages) => void
  heading: string
  text: string
  type: string
  categoryByLanguages:
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

const UserEditPage = ({
  language,
  setLanguage,
  heading,
  text,
  type,
  categoryByLanguages,
  options,
  getKeyByValue,
}: Props) => {
  const lightTheme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

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
          dispatch(removeUser(user._id)).then(() => {
            dispatch(logout())
            navigate('/')
          })
    }
  }

  return (
    <>
      <div className={`edit ${type} ${lightTheme ? styles.light : ''}`}>
        <Hero address='edit' heading={heading} text={text} />
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
                  categoryByLanguages={categoryByLanguages}
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
                    {EDeleteAccount[language]}
                  </button>
                </form>
              ) : (
                ''
              )}
            </div>
          </section>
        </div>
      </div>
      <Notification language={language} />
    </>
  )
}

export default UserEditPage
