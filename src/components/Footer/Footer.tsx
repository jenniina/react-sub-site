import { useState, useEffect, FC, useContext } from 'react'
import { BiChevronsUp } from 'react-icons/bi'
import { ELanguages } from '../../types'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../contexts/LanguageContext'

const Footer: FC<{ styleMenu: boolean | undefined; language: ELanguages }> = ({
  styleMenu,
  language,
}) => {
  const { t } = useContext(LanguageContext)!

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
        <span>{t('ExitToMainSite')}</span>&nbsp;
        <span aria-hidden='true'>&times;</span>
      </a>

      <Link to='/disclaimer' className='footer1'>
        {t('Disclaimer')}
      </Link>

      {showTopBtn ? (
        <button className='footer2' style={{ display: 'inline-block' }} onClick={toTop}>
          {t('ScrollToTheTop')}
          <BiChevronsUp style={{ display: 'inline-block', marginBottom: '-0.15em' }} />
        </button>
      ) : (
        ''
      )}
    </footer>
  )
}
export default Footer
