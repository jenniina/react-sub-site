import { useState } from 'react'
import FormLogin from '../components/Login/Login'
import { ELogin, ELogout, ELoggedInAs, ELanguages } from '../components/Jokes/interfaces'
import { IUser } from '../interfaces'
import styles from './css/login.module.css'
import { useTheme } from '../hooks/useTheme'
import Hero from '../components/Hero/Hero'

interface LoginProps {
  language: ELanguages
  setLanguage: (language: ELanguages) => void
  user: IUser
  heading: string
  text: string
  type: string
}
const LoginPage = ({ language, setLanguage, user, heading, text, type }: LoginProps) => {
  const titleLogin = ELogin[language]
  const titleLogout = ELogout[language]
  const titleLoggedInAs = ELoggedInAs[language]

  const lightTheme = useTheme()

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
              <FormLogin
                titleLogin={titleLogin}
                titleLogout={titleLogout}
                titleLoggedInAs={titleLoggedInAs}
                language={language}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default LoginPage
