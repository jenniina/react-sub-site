import React, {
  FC,
  useState,
  useEffect,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useContext,
} from 'react'
import { useIsClient, useWindow } from '../../hooks/useSSR'
import { BiChat } from 'react-icons/bi'
import { BsCart2, BsPerson } from 'react-icons/bs'
import { CgSearch } from 'react-icons/cg'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoMdImages } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'
import { RiHomeSmileLine } from 'react-icons/ri'
import { TbLayoutNavbar } from 'react-icons/tb'
import { TfiLineDashed } from 'react-icons/tfi'
import styles from './nav.module.css'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTheme, useThemeUpdate } from '../../hooks/useTheme'
import useScrollDirection from '../../hooks/useScrollDirection'
import useWindowSize from '../../hooks/useWindowSize'
import {
  ReducerProps,
  breakpoint,
  breakpointSmall,
  ELanguages,
  ELanguagesLong,
} from '../../types'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import logo from '../../assets/JLA_Jenniina-light-3-480x198.png'
import logoDark from '../../assets/JLA_Jenniina-3-480x198.png'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { logout } from '../../reducers/authReducer'
import FormLogin from '../Login/Login'
import Register from '../Register/Register'
import { notify } from '../../reducers/notificationReducer'
import { createUser } from '../../reducers/usersReducer'
import { Select, SelectOption } from '../Select/Select'
import PasswordReset from '../PasswordReset/PasswordReset'
import Accordion from '../Accordion/Accordion'
import { FaStoreAlt } from 'react-icons/fa'
import useCart from '../../hooks/useCart'
import { options } from '../../utils'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { isTouchDevice } from '../../hooks/useDraggable'
import useLocalStorage from '../../hooks/useStorage'

type Link = {
  label: string
  href: string
}

interface NavProps {
  setStyleMenu: (style: boolean) => void
  language: ELanguages
  setLanguage: (language: ELanguages) => void
}

const Nav = (
  { setStyleMenu, language, setLanguage }: NavProps,
  ref: Ref<{ getStyle: () => boolean }>
) => {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { cart } = useCart()

  const { t } = useLanguageContext()

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  const { windowHeight, windowWidth } = useWindowSize()

  const links = [
    {
      label: t('Welcome'),
      href: '/',
    },
    {
      label: t('About'),
      href: '/about',
    },
    {
      label: t('Portfolio'),
      href: '/portfolio',
    },
    {
      label: t('Contact'),
      href: '/contact',
    },
  ]

  const skipLinks = [
    {
      label: t('SkipToMainNavigation'),
      href: '#site-navigation',
    },
    {
      label: t('SkipToMainContent'),
      href: '#main-content',
    },
    {
      label: t('SkipToFooter'),
      href: '#main-footer',
    },
  ]

  const icons = (label: string) => {
    if (label === t('Welcome'))
      return (
        <RiHomeSmileLine
          className={windowWidth < breakpoint ? styles.smallnav : ''}
        />
      )
    else if (label === t('About'))
      return (
        <BsPerson className={windowWidth < breakpoint ? styles.smallnav : ''} />
      )
    //MdOutlinePerson
    else if (label === t('Portfolio'))
      return (
        <IoMdImages
          className={windowWidth < breakpoint ? styles.smallnav : ''}
        />
      )
    //BiImage IoImagesOutline BiImages FaRegImages  MdImportContacts
    else if (label === t('Contact'))
      return (
        <BiChat className={windowWidth < breakpoint ? styles.smallnav : ''} />
      )
  }

  const LinkComponent: FC<{ links: Link[] }> = ({ links }) => {
    return (
      <ul>
        {windowWidth < breakpointSmall && !menuStyleAlt ? (
          <li className={`tooltip-wrap ${styles.jenniina}`}>
            <a href="https://jenniina.fi">
              <img
                src={lightTheme ? logoDark : logo}
                width="96px"
                height="39.6px"
              />
              <span className="tooltip below right narrow">
                « {t('ExitToMainSite')}
              </span>
            </a>
          </li>
        ) : (
          ''
        )}

        {links.map((link: Link, index: number) => {
          return (
            <li
              key={`${link.label}${index}`}
              className={`${styles[link.label]}`}
            >
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? `active ${styles.active} ${styles.link} tooltip-wrap pointer`
                    : `${styles.link} tooltip-wrap`
                }
              >
                {icons(link.label)}
                <span>{link.label}</span>
                <b
                  className={`${
                    menuStyleAlt && windowWidth < breakpointSmall
                      ? `tooltip space narrow2 above ${
                          index < 2 ? 'right' : 'left'
                        }`
                      : 'scr'
                  }`}
                  aria-hidden={true}
                >
                  {link.label}
                </b>
              </NavLink>
            </li>
          )
        })}
      </ul>
    )
  }
  const SkipLink: FC<{ skipLinks: Link[] }> = ({ skipLinks }) => {
    return (
      <ul>
        {skipLinks.map((link: Link) => {
          return (
            <li key={link.href}>
              <NavLink to={link.href} className={`${styles['skip-link']}`}>
                {link.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    )
  }

  const touchDevice = isTouchDevice()
  const lightTheme = useTheme()
  const toggleTheme = useThemeUpdate()
  const navigate = useNavigate()

  useEffect(() => {
    if (isClient) {
      closingAllMenus()
    }
  }, [isClient && windowObj?.location.pathname])

  const clickOutsideRef = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: clickOutsideRef,
    onOutsideClick: closingAllMenus,
  })

  const scrollDirection = useScrollDirection()

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true)
  const [isMainMenuHidden, setIsMainMenuHidden] = useState(false)

  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [isToolbarHidden, setIsToolbarHidden] = useState(true)

  //set delay for visibility: hidden (.hidden class) in order to allow time for exit animation to play
  const mainMenuHideDelay = () => {
    setTimeout(() => {
      setIsMainMenuHidden(true)
    }, 300)
  }
  const toolbarHideDelay = () => {
    setTimeout(() => {
      setIsToolbarHidden(true)
    }, 300)
  }

  function toggleMainMenu() {
    if (!isMainMenuOpen) {
      setIsMainMenuOpen(true)
      setIsMainMenuHidden(false)
    } else {
      setIsMainMenuOpen(false)
      mainMenuHideDelay()
    }
    if (isToolbarOpen) {
      setIsToolbarOpen(false)
      toolbarHideDelay()
    }
  }
  function toggleToolbar() {
    if (isToolbarOpen) {
      setIsToolbarOpen(false)
      toolbarHideDelay()
    } else {
      setIsToolbarOpen(true)
      setIsToolbarHidden(false)
    }
    if (isMainMenuOpen && windowWidth < breakpoint) {
      setIsMainMenuOpen(false)
      mainMenuHideDelay()
    }
  }

  function closingAllMenus() {
    isMainMenuOpen ? setIsMainMenuHidden(false) : mainMenuHideDelay()
    if (isMainMenuOpen) {
      setIsMainMenuOpen(false)
      mainMenuHideDelay()
    }
    isToolbarOpen ? setIsToolbarHidden(false) : toolbarHideDelay()
    if (isToolbarOpen) {
      setIsToolbarOpen(false)
      toolbarHideDelay()
    }
  }

  const [menuStyleAlt, setMenuStyleAlt] = useLocalStorage('alt', false)
  const [menuStyleTransform, setMenuStyleTransform] = useState(true)

  function menuStyleAltToggle() {
    if (menuStyleAlt && isMainMenuOpen) {
      setIsMainMenuOpen(false)
      mainMenuHideDelay()
      setTimeout(() => {
        setMenuStyleAlt(false)
      }, 300)
    } else if (!isMainMenuOpen) {
      setIsMainMenuOpen(true)
      setIsMainMenuHidden(false)
      setMenuStyleAlt(true)
    } else {
      setMenuStyleAlt(prev => !prev)
      //to avoid ugly transformations between the two states, set delay before transforms are set:
      setMenuStyleTransform(false)
      setTimeout(() => {
        setMenuStyleTransform(true)
      }, 200)
    }
  }

  useEffect(() => {
    //to avoid ugly transformations between the two states, set delay before transforms are set:
    setMenuStyleTransform(false)
    setTimeout(() => {
      setMenuStyleTransform(true)
    }, 200)
  }, [lightTheme])

  //Main menu always visible at larger screensizes and when the altnav is seen:
  useEffect(() => {
    if (
      (menuStyleAlt && windowHeight > windowWidth) ||
      windowWidth > breakpoint
    )
      setIsMainMenuOpen(true)
  }, [menuStyleAlt, windowWidth, windowHeight])

  useImperativeHandle(
    ref,
    () => ({
      getStyle: () => {
        return menuStyleAlt
      },
    }),
    [menuStyleAlt]
  )

  //Send menuStyleAlt status to App.tsx
  useEffect(() => {
    setStyleMenu(menuStyleAlt)
  }, [menuStyleAlt])

  const [scrolled, setScrolled] = useState(false) //when false, keeps header visible

  useEffect(() => {
    if (!isClient || !windowObj) return
    windowObj.addEventListener('scroll', scrolling)
    return () => {
      windowObj.removeEventListener('scroll', scrolling)
    }
  }, [isClient, windowObj])

  const scrolling = () => {
    if (!windowObj) return
    windowObj.scrollY > 100 ? setScrolled(true) : setScrolled(false)
  }

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false)
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false)
  const [isResetFormOpen, setIsResetFormOpen] = useState(false)

  useEffect(() => {
    if (isResetFormOpen) {
      setIsLoginFormOpen(false)
      setIsRegisterFormOpen(false)
    }
  }, [isResetFormOpen])

  useEffect(() => {
    if (isLoginFormOpen) {
      setIsRegisterFormOpen(false)
      setIsResetFormOpen(false)
    }
  }, [isLoginFormOpen])

  useEffect(() => {
    if (isRegisterFormOpen) {
      setIsLoginFormOpen(false)
      setIsResetFormOpen(false)
    }
  }, [isRegisterFormOpen])

  const location = useLocation()

  useEffect(() => {
    if (!isClient || !windowObj) return
    const params = new URLSearchParams(windowObj.location.search)
    if (params.get('login')) {
      setIsToolbarOpen(true)
      setIsToolbarHidden(false)
      setIsLoginFormOpen(true)
      setIsRegisterFormOpen(false)
    }
    if (params.get('register')) {
      setIsToolbarOpen(true)
      setIsToolbarHidden(false)
      setIsRegisterFormOpen(true)
      setIsLoginFormOpen(false)
    }
  }, [location, isClient, windowObj])

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [sending, setSending] = useState(false)

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSending(true)
    if (password.trim() !== confirmPassword.trim()) {
      dispatch(notify(`${t('PasswordsDoNotMatch')}`, true, 8))
      setSending(false)
      return
    }
    dispatch(
      createUser({ name, username, password, language, verified: false })
    )
      .then(async () => {
        dispatch(
          notify(
            `${t('RegistrationSuccesful')} - ${t(
              'PleaseCheckYourEmailForYourVerificationLink'
            )} `,
            false,
            8
          )
        )
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setName('')
        setSending(false)
      })
      .catch(err => {
        console.error(err)
        if (err.response?.data?.message)
          dispatch(notify(err.response.data.message, true, 8))
        else if (err.code === 'ERR_BAD_REQUEST') {
          dispatch(notify(`Error: ${err.response?.data?.message}`, true, 8))
          return
        }
        dispatch(notify(`Error: ${err.message}`, true, 8))
        setSending(false)
      })
  }

  return (
    <>
      <header
        ref={clickOutsideRef}
        className={`
                ${`main-header ${styles['main-header']}`}
                ${
                  scrollDirection === 'down' && scrolled
                    ? styles.hide
                    : styles.show
                } 
                ${lightTheme ? styles.light : ''} 
                ${
                  menuStyleAlt
                    ? `${styles.menualt} menualt`
                    : `${styles.menumain} menumain`
                } 
                ${
                  windowHeight > windowWidth && touchDevice ? styles.mobile : ''
                } 
                ${menuStyleTransform ? `${styles.transformations}` : ''} 
                ${styles[`${language}`]}
                `}
      >
        <nav className={styles['skip-links']}>
          <SkipLink skipLinks={skipLinks} />
        </nav>
        <div className={styles['header-inner-wrap']}>
          <div
            className={`${
              lightTheme
                ? `${styles['logo-container']} ${styles.light}`
                : styles['logo-container']
            } 
                        ${windowWidth < breakpointSmall ? 'scr' : ''}`}
          >
            <a href="https://jenniina.fi/">
              <span>« {t('ExitToMainSite')}</span>
            </a>
          </div>
          <button
            aria-haspopup="true"
            aria-expanded={isMainMenuOpen}
            onClick={toggleMainMenu}
            className={`${
              windowHeight < windowWidth && windowWidth < breakpoint
                ? `${styles.togglemenuexception} ${styles.togglemenu}`
                : styles.togglemenu
            } ${windowWidth > breakpoint ? styles.hidden : ''}`}
          >
            <svg
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              viewBox="0 0 100 100"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              style={{ fontSize: '1em' }}
            >
              <g>
                <path
                  className={styles.menupath}
                  d="m 90 90 l -80 -80 l 60 0 a 1 1 0 1 1 0 40 l -40 0 a 1 1 0 0 0 0 40 l 60 0 l 0 -80 l -80 80"
                ></path>
              </g>
            </svg>
            <span
              className={windowWidth > breakpoint && !touchDevice ? '' : 'scr'}
            >
              {t('Menu')}
            </span>
          </button>
          <nav
            id={'site-navigation'}
            className={`site-navigation 
                        ${styles['menu-container']} 
                            ${
                              isMainMenuOpen
                                ? ` ${styles['show']}`
                                : `${
                                    isMainMenuHidden && windowWidth < breakpoint
                                      ? styles.hidden
                                      : ''
                                  }
                                    `
                            }
                                    ${
                                      windowHeight < windowWidth &&
                                      windowWidth < breakpoint
                                        ? styles.altnav
                                        : ''
                                    }
                                    ${
                                      menuStyleAlt &&
                                      windowHeight < windowWidth &&
                                      windowWidth > breakpointSmall
                                        ? styles.altexception
                                        : ''
                                    }
                                    `}
            aria-expanded={isMainMenuOpen}
          >
            <LinkComponent links={links} />
          </nav>
          <button className={styles.search} role="search" aria-label="search">
            <CgSearch
              style={
                windowWidth < breakpointSmall
                  ? { fontSize: '1em' }
                  : { fontSize: '1.4em' }
              }
              aria-hidden={true}
            />
            <span
              className={windowWidth > breakpoint && !touchDevice ? '' : 'scr'}
            >
              {t('Search')}
            </span>
          </button>
          {(isClient && windowObj?.location.pathname === '/store') ||
          (cart &&
            cart.length > 0 &&
            windowObj &&
            windowObj.location.pathname !== '/cart') ? (
            <button
              className={`${styles.settings} ${styles.cart}`}
              aria-label="cart"
              onClick={() => {
                navigate('/cart')
              }}
            >
              <BsCart2
                style={
                  windowWidth < breakpointSmall
                    ? { fontSize: '1.1em' }
                    : { fontSize: '1.4em' }
                }
                aria-hidden={true}
              />
              <span
                className={
                  windowWidth > breakpoint && !touchDevice ? '' : 'scr'
                }
              >
                {t('Cart')}
              </span>
            </button>
          ) : (
            <button
              className={`${styles.settings} ${styles.store}`}
              aria-label="store"
              onClick={() => {
                navigate('/store')
              }}
            >
              <FaStoreAlt
                style={
                  windowWidth < breakpointSmall
                    ? { fontSize: '1.1em' }
                    : { fontSize: '1.4em' }
                }
                aria-hidden={true}
              />
              <span
                className={
                  windowWidth > breakpoint && !touchDevice ? '' : 'scr'
                }
              >
                {t('Store')}
              </span>
            </button>
          )}
          <button className={styles.settings} onClick={toggleToolbar}>
            <IoSettingsSharp
              style={
                windowWidth < breakpointSmall
                  ? { fontSize: '0.9em' }
                  : { fontSize: '1.1em' }
              }
              aria-hidden={true}
            />
            <span
              id="settings"
              className={windowWidth > breakpoint && !touchDevice ? '' : 'scr'}
            >
              {t('Settings')}
            </span>
          </button>
          <nav
            id="settings-toolbar"
            className={`${styles.toolbar} 
                           ${
                             isToolbarOpen
                               ? `${styles['show']}`
                               : `${isToolbarHidden ? styles.hidden : ''}`
                           }
                            `}
            aria-labelledby="settings"
            aria-expanded={isToolbarOpen}
          >
            <Select
              language={language}
              id="language-navbar"
              className={`language ${styles.language}`}
              instructions={t('LanguageTitle')}
              hide
              options={options(ELanguagesLong)}
              value={
                language
                  ? ({
                      value: language,
                      label: ELanguagesLong[language],
                    } as SelectOption)
                  : undefined
              }
              onChange={o => {
                setLanguage(o?.value as ELanguages)
              }}
            />
            <div className={styles.toolwrap}>
              <label htmlFor="dlt-btn">
                {lightTheme ? t('DarkMode') : t('LightMode')}
              </label>
              <button
                id="dlt-btn"
                className={
                  lightTheme
                    ? `${styles['dlt-btn']}`
                    : `${styles['active']} ${styles['dlt-btn']} ${styles['toolbar-btn']}`
                }
                onClick={toggleTheme}
              >
                <div className={`${styles['dlt-inner-wrapper']}`}>
                  <div className={`${styles['dlt-btn-inner-left']}`}>
                    <div className={`${styles['dlt-innermost']}`}>
                      <span className="scr">
                        {lightTheme ? t('DarkMode') : t('LightMode')}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className={styles.toolwrap}>
              <label htmlFor="navbar-style">{t('NavStyle')}</label>
              <button
                id="navbar-style"
                onClick={menuStyleAltToggle}
                className={`${styles.navstyle} ${styles['toolbar-btn']}`}
              >
                {windowWidth < breakpoint ? (
                  <TbLayoutNavbar aria-hidden={true} fontSize="1.5em" />
                ) : (
                  <>
                    <HiOutlineDotsHorizontal
                      className={styles.dots}
                      aria-hidden={true}
                      fontSize="1.8em"
                    />
                    <TfiLineDashed
                      className={styles.dashes}
                      aria-hidden={true}
                      fontSize="1.8em"
                    />
                  </>
                )}
              </button>
            </div>

            <div className={styles.loginregister}>
              {!user ? (
                <>
                  <div
                    className={`${styles.loginregisterwrap} ${
                      !isRegisterFormOpen && !isLoginFormOpen
                        ? styles.closed
                        : ''
                    }`}
                  >
                    <FormLogin
                      setIsFormOpen={setIsLoginFormOpen}
                      isOpen={isLoginFormOpen}
                      language={language}
                      text="nav"
                    />
                    <Register
                      language={language}
                      setIsFormOpen={setIsRegisterFormOpen}
                      isOpen={isRegisterFormOpen}
                      handleRegister={handleRegister}
                      username={username}
                      setUsername={setUsername}
                      password={password}
                      setPassword={setPassword}
                      confirmPassword={confirmPassword}
                      setConfirmPassword={setConfirmPassword}
                      name={name}
                      setName={setName}
                      text="nav"
                      sending={sending}
                    />
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/edit"
                    className={({ isActive }) =>
                      isActive
                        ? `active ${styles.active} ${styles.link}`
                        : `${styles.link}`
                    }
                  >
                    <span>{t('Edit')}</span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    id="logoutnav"
                    className={`logout danger ${styles.logout}`}
                  >
                    {t('Logout')} &times;
                  </button>
                </>
              )}
            </div>
            {!user && (
              <div className="password-reset-wrap">
                <Accordion
                  language={language}
                  className="password-reset"
                  wrapperClass="password-reset-wrap"
                  text={`${t('ForgotPassword')}`}
                  isOpen={isResetFormOpen}
                  setIsFormOpen={setIsResetFormOpen}
                  hideBrackets={true}
                >
                  <PasswordReset language={language} text="login" />
                </Accordion>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

export default forwardRef(Nav)
