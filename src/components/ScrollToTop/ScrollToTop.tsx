import { useState, useEffect, FC, useContext } from 'react'
import styles from './scrolltotop.module.css'
import { ELanguages } from '../../types'
import { BiChevronsUp } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { LanguageContext } from '../../contexts/LanguageContext'

const ScrollToTop: FC<{
  styleMenu: boolean | undefined
  language: ELanguages
}> = ({ styleMenu, language }) => {
  const { t } = useContext(LanguageContext)!

  const location = useLocation()
  const [showTopBtn, setShowTopBtn] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', scrollY)
    return () => {
      window.removeEventListener('scroll', scrollY)
    }
  }, [])
  const scrollY = () => {
    if (window.scrollY > 500) {
      setShowTopBtn(true)
    } else {
      setShowTopBtn(false)
    }
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    // hide #to-top-btn when on the /portfolio/colors page:
    if (location.pathname === '/portfolio/colors') {
      setShowTopBtn(false)
    }
  }, [location.pathname])

  return (
    <button
      id='to-top-btn'
      className={`to-top-btn ${styles['to-top-btn']} ${showTopBtn ? styles.show : ''} ${
        styleMenu ? styles.alt : ''
      }`}
      onClick={goToTop}
    >
      <BiChevronsUp className={styles['icon']} />
      <span className='scr'>{t('EScrollToTheTop')}</span>
    </button>
  )
}

export default ScrollToTop
