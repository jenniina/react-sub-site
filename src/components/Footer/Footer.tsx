import { useState, useEffect, FC, useCallback } from 'react'
import { BiChevronsUp } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { useIsClient, useWindow } from '../../hooks/useSSR'

const Footer: FC<{ styleMenu: boolean | undefined }> = ({ styleMenu }) => {
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

  const scrollY = useCallback(() => {
    if (!windowObj) return
    if (windowObj.scrollY > 500) {
      setShowTopBtn(true)
    } else {
      setShowTopBtn(false)
    }
  }, [windowObj])

  useEffect(() => {
    if (!isClient || !windowObj) return
    windowObj.addEventListener('scroll', scrollY)
    return () => {
      windowObj.removeEventListener('scroll', scrollY)
    }
  }, [isClient, windowObj, scrollY])

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
