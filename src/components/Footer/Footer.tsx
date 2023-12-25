import { useState, useEffect, FC } from 'react'
import { BiChevronsUp } from 'react-icons/bi'
import { EExitToMainSite, ELanguages, EScrollToTheTop } from '../../interfaces'

export const Footer: FC<{ styleMenu: boolean | undefined; language: ELanguages }> = ({
  styleMenu,
  language,
}) => {
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
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

  return (
    <footer id='main-footer' className={`main-footer ${styleMenu ? 'alt' : ''}`}>
      <a className='footer1' href='https://jenniina.fi/'>
        <span>{EExitToMainSite[language]}</span>&nbsp;
        <span aria-hidden='true'>&times;</span>
      </a>

      {showTopBtn ? (
        <button className='footer2' style={{ display: 'inline-block' }} onClick={toTop}>
          {EScrollToTheTop[language]}
          <BiChevronsUp style={{ display: 'inline-block', marginBottom: '-0.15em' }} />
        </button>
      ) : (
        ''
      )}
    </footer>
  )
}
