import { useState, useEffect, FC, useContext } from 'react'
import { BiChevronsUp } from 'react-icons/bi'
import { ELanguages } from '../../types'
import { Link } from 'react-router-dom'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { useIsClient, useWindow } from '../../hooks/useSSR'

const Footer: FC<{ styleMenu: boolean | undefined; language: ELanguages }> = ({
  styleMenu,
  language,
}) => {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t } = useLanguageContext()

  const toTop = () => {
    if (!windowObj) return
    if (!windowObj) return
    windowObj.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const [showTopBtn, setShowTopBtn] = useState(false)
  useEffect(() => {
    if (!isClient || !windowObj) return
    windowObj.addEventListener('scroll', scrollY)
    return () => {
      windowObj.removeEventListener('scroll', scrollY)
    }
  }, [isClient])

  const scrollY = () => {
    if (!windowObj) return
    if (windowObj.scrollY > 500) {
      setShowTopBtn(true)
    } else {
      setShowTopBtn(false)
    }
  }

  return (
    <footer
      id="main-footer"
      className={`main-footer ${styleMenu ? 'alt' : ''}`}
    >
      <a className="footer1" href="https://jenniina.fi/">
        <span>{t('ExitToMainSite')}</span>&nbsp;
        <span aria-hidden="true">&times;</span>
      </a>

      <Link to="/disclaimer" className="footer1">
        {t('Disclaimer')}
      </Link>

      {showTopBtn ? (
        <button
          className="footer2"
          style={{ display: 'inline-block' }}
          onClick={toTop}
        >
          {t('ScrollToTheTop')}
          <BiChevronsUp
            style={{ display: 'inline-block', marginBottom: '-0.15em' }}
          />
        </button>
      ) : (
        ''
      )}
    </footer>
  )
}
export default Footer
