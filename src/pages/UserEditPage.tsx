import { useNavigate } from 'react-router-dom'
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
  ELanguages,
  ESafemode,
} from '../components/Jokes/interfaces'
import { IUser } from '../interfaces'
import styles from './css/useredit.module.css'
import UserEdit from '../components/UserEdit/NicknameEdit'
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
}

const UserEditPage = ({ language, setLanguage, heading, text, type }: Props) => {
  const lightTheme = useTheme()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  function getKeyByValue(
    enumObj:
      | typeof ECategory_en
      | typeof ECategory_cs
      | typeof ECategory_de
      | typeof ECategory_es
      | typeof ECategory_fr
      | typeof ECategory_pt
      | typeof EJokeType
      | typeof ESafemode
      | typeof ELanguages,
    value: ECategory | EJokeType | ESafemode | ELanguages
  ) {
    for (const key in enumObj) {
      if (enumObj[key as keyof typeof enumObj] === value) {
        return key as SelectOption['label']
      }
    }
    // Handle the case where the value is not found in the enum
    return undefined
  }

  const categoryLanguagesConst = {
    en: ECategory_en,
    es: ECategory_es,
    fr: ECategory_fr,
    de: ECategory_de,
    pt: ECategory_pt,
    cs: ECategory_cs,
  }

  const categoryLanguages = categoryLanguagesConst[language] as
    | typeof ECategory_en
    | typeof ECategory_cs
    | typeof ECategory_de
    | typeof ECategory_es
    | typeof ECategory_fr
    | typeof ECategory_pt

  const options = (
    enumObj: typeof ECategory_en | typeof EJokeType | typeof ESafemode | typeof ELanguages
  ) => {
    return Object.keys(enumObj).map((key) => ({
      value: enumObj[key as keyof typeof enumObj],
      label: key,
    })) as SelectOption[]
  }

  return (
    <>
      <div
        className={`${heading
          ?.replace(/\s+/g, '-')
          .toLowerCase()
          .replace(/[^a-zA-Z]/g, '')} ${type} ${lightTheme ? styles.light : ''}`}
      >
        <Hero heading={heading} text={text} />
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
                  categoryLanguages={categoryLanguages}
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
