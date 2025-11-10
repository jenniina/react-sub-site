import React, { useEffect, useState } from 'react'
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
import { useLanguageContext } from '../contexts/LanguageContext'
import { useConfirm } from '../contexts/ConfirmContext'
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
  options: (enumObj: typeof ELanguagesLong) => SelectOption[]
}

const UserEditPage = ({
  language,
  setLanguage,
  heading,
  text,
  type,
  options,
}: Props) => {
  const { t } = useLanguageContext()
  const confirm = useConfirm()

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

  const handleUserRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    if (user) {
      if (
        await confirm({
          message: `${t('AreYouSureYouWantToDelete')} ${user.username}?`,
        })
      ) {
        if (
          await confirm({
            message: `${t('YouWillLoseAllTheDataAssociatedWithIt')}`,
          })
        ) {
          if (
            await confirm({
              message: t('DoYouWishToRemoveAnyJokesYouveAuthored'),
            })
          ) {
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
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>{t("UserEdit")} | react.jenniina.fi</title>
        <meta
          name="description"
          content={`${t("UserEdit")} | react.jenniina.fi`}
        />
        <link rel="canonical" href={`https://react.jenniina.fi/user/edit`} />
        <meta
          property="og:title"
          content={`${t("UserEdit")} | react.jenniina.fi`}
        />
        <meta
          property="og:description"
          content={`${t("UserEdit")} | react.jenniina.fi`}
        />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/user/edit`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div className={`edit ${type} ${lightTheme ? styles.light : ''}`}>
        <div className="inner-wrap">
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
                />
              </div>
              <div className={styles.editform}>
                <PasswordEdit user={user} language={language} />
              </div>
              {user ? (
                <form onSubmit={handleUserRemove} className="flex center">
                  <button
                    type="submit"
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
