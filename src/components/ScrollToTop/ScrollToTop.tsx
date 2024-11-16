import { useState, useEffect, FC } from 'react'
import styles from './scrolltotop.module.css'
import { ELanguages, EScrollToTheTop } from '../../interfaces'
import { BiChevronsUp } from 'react-icons/bi'

const ScrollToTop: FC<{
  styleMenu: boolean | undefined
  language: ELanguages
}> = ({ styleMenu, language }) => {
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
  return (
    <button
      id='to-top-btn'
      className={`to-top-btn ${styles['to-top-btn']} ${showTopBtn ? styles.show : ''} ${
        styleMenu ? styles.alt : ''
      }`}
      onClick={goToTop}
    >
      <BiChevronsUp className={styles['icon']} />
      <span className='scr'>{EScrollToTheTop[language]}</span>
    </button>
  )
}

export default ScrollToTop
