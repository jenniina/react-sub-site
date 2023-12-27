import { useEffect } from 'react'
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
import { ELanguages } from '../interfaces'
import styles from './css/useredit.module.css'
import { SelectOption } from '../components/Select/Select'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { ReducerProps } from '../interfaces'
import { initializeUser } from '../reducers/authReducer'
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

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

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
            </div>
          </section>
        </div>
      </div>
      <Notification />
    </>
  )
}

export default UserEditPage
