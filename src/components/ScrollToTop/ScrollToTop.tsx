import React, { useState, useEffect, FC } from 'react'
import { FaAngleUp } from 'react-icons/fa'
import styles from './scrolltotop.module.css'
import { ELanguages, EScrollToTheTop } from '../../interfaces'

export const ScrollToTop: FC<{
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
      className={`${styles['to-top-btn']} ${showTopBtn ? styles.show : ''} ${
        styleMenu ? styles.alt : ''
      }`}
      onClick={goToTop}
    >
      <FaAngleUp className={styles['icon']} />
      <span className='scr'>{EScrollToTheTop[language]}</span>
    </button>
  )
}
