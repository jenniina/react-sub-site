import React, {
  FC,
  useState,
  useEffect,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import { useIsClient, useWindow } from '../../hooks/useSSR'
import Icon from '../Icon/Icon'
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
import { TranslationKey } from '../../i18n/translations'
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
import useCart from '../../hooks/useCart'
import { options } from '../../utils'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { getErrorMessage } from '../../utils'
import { isTouchDevice } from '../../hooks/useDraggable'
import useLocalStorage from '../../hooks/useStorage'
import useExitVisibility from '../../hooks/useExitVisibility'
import useNoTransition from '../../hooks/useNoTransition'

type Form = 'login' | 'register' | 'reset' | null

export interface Link {
  label: string
  href: string
  name: string
}

interface NavProps {
  setStyleMenu: (style: boolean) => void
}

interface LinkComponentProps {
  links: Link[]
  windowWidth: number
  breakpointSmall: number
  menuStyleAlt: boolean
  lightTheme: boolean
  logoDark: string
  logo: string
  t: (key: TranslationKey) => string
  icons: (label: string) => JSX.Element | undefined
  styles: CSSModuleClasses
}

interface SkipLinkProps {
  skipLinks: Link[]
  styles: CSSModuleClasses
}

const LinkComponent: FC<LinkComponentProps> = ({
  links,
  windowWidth,
  breakpointSmall,
  menuStyleAlt,
  lightTheme,
  logoDark,
  logo,
  t,
  icons,
  styles,
}) => {
  // small-screen logo dropdown state & outside click handling
  const [smallLogoOpen, setSmallLogoOpen] = useState<boolean>(false)
  const smallLogoRef = useRef<HTMLLIElement | null>(null)
  const closeLogoMenu = useCallback(() => {
    setSmallLogoOpen(false)
  }, [])

  useOutsideClick({
    ref: smallLogoRef,
    onOutsideClick: closeLogoMenu,
  })

  return (
    <ul>
      {windowWidth < breakpointSmall && !menuStyleAlt ? (
        <li
          ref={smallLogoRef}
          className={`${styles['right-edge']} ${
            lightTheme
              ? `${styles['logo-container']} ${styles.light}`
              : styles['logo-container']
          }`}
        >
          <button
            type="button"
            aria-haspopup={true}
            aria-expanded={smallLogoOpen ? 'true' : 'false'}
            aria-label={t('ExitToMainSite')}
            className={styles['logo-btn']}
            style={{ backgroundImage: `url(${lightTheme ? logoDark : logo})` }}
            onClick={() => setSmallLogoOpen((s) => !s)}
          >
            <span className="scr">{t('FrontPageOrExit')}</span>
          </button>

          <ul
            className={`${styles['logo-menu']} ${smallLogoOpen ? styles.show : ''}`}
            aria-hidden={!smallLogoOpen}
          >
            <li>
              <Link to="/" onClick={() => setSmallLogoOpen(false)}>
                {t('FrontPage')}
              </Link>
            </li>
            <li>
              <a
                href="https://jenniina.fi/"
                onClick={() => setSmallLogoOpen(false)}
              >
                &times; {t('Exit')}
              </a>
            </li>
          </ul>
        </li>
      ) : (
        ''
      )}

      {links.map((link: Link, index: number) => {
        return (
          <li key={`${link.label}${index}`} className={`${styles[link.name]}`}>
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

const SkipLink: FC<SkipLinkProps> = ({ skipLinks, styles }) => {
  return (
    <ul>
      {skipLinks.map((link: Link) => {
        return (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={`${styles['skip-link']} ${styles[link.name]}`}
            >
              {link.label}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}

const Nav = (
  { setStyleMenu }: NavProps,
  ref: Ref<{ getStyle: () => boolean }>
) => {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { cart } = useCart()

  const { t, language, setLanguage } = useLanguageContext()

  const clickOutsideRef = useRef<HTMLDivElement>(null)

  // Logo dropdown
  const logoRef = useRef<HTMLDivElement>(null)
  const [logoOpen, setLogoOpen] = useState<boolean>(false)

  const closeLogoMenu = useCallback(() => {
    setLogoOpen(false)
  }, [])

  const scrollDirection = useScrollDirection()

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  const { windowHeight, windowWidth } = useWindowSize()

  const mainMenu = useExitVisibility(false)
  const toolbar = useExitVisibility(false)

  const [openForm, setOpenForm] = useState<Form>(null)

  const isLoginFormOpen = openForm === 'login'
  const isRegisterFormOpen = openForm === 'register'
  const isResetFormOpen = openForm === 'reset'

  const bindForm = useCallback(
    (form: Exclude<Form, null>) => (next: boolean) => {
      setOpenForm(next ? form : null)
    },
    []
  )

  const [menuStyleAlt, setMenuStyleAlt] = useLocalStorage('alt', false)

  const { noTransition, arm } = useNoTransition()

  function menuStyleAltToggle(next?: boolean) {
    const target = next ?? !menuStyleAlt
    // keep menu open; flip style with transitions suppressed
    arm()
    setMenuStyleAlt(target)
  }

  const location = useLocation()

  const touchDevice = isTouchDevice()
  const lightTheme = useTheme()
  const toggleTheme = useThemeUpdate()
  const navigate = useNavigate()

  const toggleMainMenu = useCallback(
    (windowWidth: number) => {
      if (!mainMenu.open) {
        mainMenu.show()
        // if you want mutual exclusivity on small screens
        if (toolbar.open && windowWidth < breakpoint) toolbar.hide()
      } else {
        mainMenu.hide()
      }
    },
    [mainMenu, toolbar]
  )

  const toggleToolbar = useCallback(
    (windowWidth: number) => {
      if (!toolbar.open) {
        toolbar.show()
        if (mainMenu.open && windowWidth < breakpoint) mainMenu.hide()
      } else {
        toolbar.hide()
      }
    },
    [toolbar, mainMenu]
  )

  const clearAuthQueryParams = useCallback(() => {
    // If URL opens login/register form, allow outside click to close it permanently
    // by removing the query params (otherwise the effect below will reopen it).
    const params = new URLSearchParams(location.search)
    const hadAuthParams = params.has('login') || params.has('register')
    if (!hadAuthParams) return

    params.delete('login')
    params.delete('register')

    const nextSearch = params.toString()
    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : '',
      },
      { replace: true }
    )
  }, [location.pathname, location.search, navigate])

  // Close everything, respecting exit animations
  const closeAll = useCallback(() => {
    mainMenu.hide()
    toolbar.hide()
    setOpenForm(null)
    clearAuthQueryParams()
  }, [toolbar, mainMenu, clearAuthQueryParams])

  const dispatch = useAppDispatch()

  const handleLogout = useCallback(() => {
    void dispatch(logout())
  }, [dispatch])

  // From URL params
  useEffect(() => {
    if (!isClient || !windowObj) return
    const params = new URLSearchParams(windowObj.location.search)
    if (params.get('login')) {
      toolbar.show()
      bindForm('login')(true)
    } else if (params.get('register')) {
      toolbar.show()
      bindForm('register')(true)
    }
  }, [location, isClient, windowObj, bindForm, toolbar])

  useOutsideClick({
    ref: clickOutsideRef,
    onOutsideClick: closeAll,
  })

  useOutsideClick({ ref: logoRef, onOutsideClick: closeLogoMenu })

  useEffect(() => {
    //to avoid ugly transformations between the two states, set delay before transforms are se
    arm()
  }, [lightTheme, arm])

  //Main menu always visible at larger screensizes and when the altnav is seen:
  useEffect(() => {
    const shouldForceOpen =
      (menuStyleAlt && windowHeight > windowWidth) || windowWidth > breakpoint
    if (shouldForceOpen && !mainMenu.open) {
      mainMenu.show()
    }
  }, [menuStyleAlt, windowWidth, windowHeight, mainMenu])

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
  }, [menuStyleAlt, setStyleMenu])

  const [scrolled, setScrolled] = useState(false) //when false, keeps header visible

  const scrolling = useCallback(() => {
    if (!windowObj) return
    if (windowObj.scrollY > 100) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, [windowObj])

  useEffect(() => {
    if (!isClient || !windowObj) return
    windowObj.addEventListener('scroll', scrolling)
    return () => {
      windowObj.removeEventListener('scroll', scrolling)
    }
  }, [isClient, windowObj, scrolling])

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [sending, setSending] = useState(false)

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSending(true)
    if (password.trim() !== confirmPassword.trim()) {
      void dispatch(notify(`${t('PasswordsDoNotMatch')}`, true, 8))
      setSending(false)
      return
    }
    void dispatch(
      createUser({ name, username, password, language, verified: false })
    )
      .then(() => {
        void dispatch(
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
      .catch((err: unknown) => {
        console.error(err)
        const message = getErrorMessage(err, t('Error'))
        void dispatch(notify(message, true, 8))
        setSending(false)
      })
  }

  const links = useMemo(() => {
    return [
      {
        label: t('Welcome'),
        href: '/',
        name: 'home',
      },
      {
        label: t('Portfolio'),
        href: '/portfolio',
        name: 'portfolio',
      },
      {
        label: t('Contact'),
        href: '/contact',
        name: 'contact',
      },
    ]
  }, [t])

  const skipLinks = useMemo(() => {
    return [
      {
        label: t('SkipToMainNavigation'),
        href: '#site-navigation',
        name: 'navigation',
      },
      {
        label: t('SkipToMainContent'),
        href: '#main-content',
        name: 'content',
      },
      {
        label: t('SkipToFooter'),
        href: '#main-footer',
        name: 'footer',
      },
    ]
  }, [t])

  const [triggerAtBreakpoint, setTriggerAtBreakpoint] = useState<boolean>(false)

  useEffect(() => {
    // when crossing the breakpoint to either direction, set triggerAtBreakpoint to true
    if (!triggerAtBreakpoint && windowWidth >= breakpoint) {
      setTriggerAtBreakpoint(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // frame #3:
          setTriggerAtBreakpoint(false)
        })
      })
    } else if (!triggerAtBreakpoint && windowWidth < breakpoint) {
      setTriggerAtBreakpoint(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // frame #3:
          setTriggerAtBreakpoint(false)
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, breakpoint])

  const icons = useCallback(
    (label: string) => {
      if (label === t('Welcome'))
        return (
          <Icon
            lib="ri"
            name="RiHomeSmileLine"
            className={windowWidth < breakpoint ? styles.smallnav : ''}
          />
        )
      else if (label === t('About'))
        return (
          <Icon
            lib="bs"
            name="BsPerson"
            className={windowWidth < breakpoint ? styles.smallnav : ''}
          />
        )
      else if (label === t('Portfolio'))
        return (
          <Icon
            lib="io"
            name="IoMdImages"
            className={windowWidth < breakpoint ? styles.smallnav : ''}
          />
        )
      else if (label === t('Contact'))
        return (
          <Icon
            lib="bi"
            name="BiChat"
            className={windowWidth < breakpoint ? styles.smallnav : ''}
          />
        )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, triggerAtBreakpoint]
  )

  //get last part of pathname for header class
  const pageName =
    location.pathname
      .split('/')
      .filter((part) => part.length > 0)
      .pop() || 'home'

  const firstPartOfPageName = location.pathname.split('/')[1] || 'home'

  const isPortfolioMainPage =
    firstPartOfPageName === 'portfolio' && pageName === 'portfolio'

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
                ${isPortfolioMainPage ? styles['portfolio-main'] : ''}
                ${styles[pageName]}
                ${lightTheme ? styles.light : ''} 
                ${
                  menuStyleAlt
                    ? `${styles.menualt} menualt`
                    : `${styles.menumain} menumain`
                } 
                ${
                  windowHeight > windowWidth && touchDevice ? styles.mobile : ''
                } 
                ${!noTransition ? `${styles.transformations}` : ''} 
                ${styles[`${language}`]}
                `}
      >
        <nav className={styles['skip-links']}>
          <SkipLink skipLinks={skipLinks} styles={styles} />
        </nav>
        <div className={styles['header-inner-wrap']}>
          <div
            ref={logoRef}
            className={`${styles['left-edge']} ${
              lightTheme
                ? `${styles['logo-container']} ${styles.light}`
                : styles['logo-container']
            } ${windowWidth < breakpointSmall ? 'scr' : ''}`}
          >
            <button
              type="button"
              aria-haspopup={true}
              aria-expanded={logoOpen ? 'true' : 'false'}
              aria-label={t('FrontPageOrExit')}
              className={styles['logo-btn']}
              style={{
                backgroundImage: `url(${lightTheme ? logoDark : logo})`,
              }}
              onClick={() => setLogoOpen((s) => !s)}
            >
              <span className="scr">{t('FrontPageOrExit')}</span>
            </button>
            <ul
              className={`${styles['logo-menu']} ${logoOpen ? styles.show : ''}`}
              aria-hidden={!logoOpen}
            >
              <li>
                <Link to="/" onClick={() => setLogoOpen(false)}>
                  {t('FrontPage')}
                </Link>
              </li>
              <li>
                <a
                  href="https://jenniina.fi/"
                  onClick={() => setLogoOpen(false)}
                >
                  &times; {t('Exit')}
                </a>
              </li>
            </ul>
          </div>
          <button
            aria-haspopup="true"
            aria-expanded={mainMenu.open ? 'true' : 'false'}
            onClick={() => toggleMainMenu(windowWidth)}
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
            onTransitionEnd={mainMenu.onTransitionEnd}
            className={`site-navigation 
                        ${styles['menu-container']} 
                            ${
                              mainMenu.open
                                ? ` ${styles.show}`
                                : `${
                                    mainMenu.hidden && windowWidth < breakpoint
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
          >
            <LinkComponent
              links={links}
              windowWidth={windowWidth}
              breakpointSmall={breakpointSmall}
              menuStyleAlt={menuStyleAlt}
              lightTheme={lightTheme}
              logoDark={logoDark}
              logo={logo}
              t={t}
              icons={icons}
              styles={styles}
            />
          </nav>
          <button className={styles.search} aria-label="search">
            <Icon
              lib="cg"
              name="CgSearch"
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
          {(isClient && location?.pathname === '/store') ||
          (cart && cart.length > 0 && location?.pathname !== '/cart') ? (
            <button
              className={`${styles.settings} ${styles.cart}`}
              aria-label="cart"
              onClick={() => {
                navigate('/cart')
              }}
            >
              <Icon
                lib="bs"
                name="BsCart2"
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
              <Icon
                lib="fa"
                name="FaStoreAlt"
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
          <button
            className={styles.settings}
            onClick={() => toggleToolbar(windowWidth)}
          >
            <Icon
              lib="io5"
              name="IoSettingsSharp"
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
            onTransitionEnd={toolbar.onTransitionEnd}
            className={`${styles.toolbar} ${
              toolbar.open ? styles.show : toolbar.hidden ? styles.hidden : ''
            }`}
            aria-labelledby="settings"
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
              onChange={(o) => {
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
                    : `${styles.active} ${styles['dlt-btn']} ${styles['toolbar-btn']}`
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
                onClick={() => menuStyleAltToggle()}
                className={`${styles.navstyle} ${styles['toolbar-btn']}`}
              >
                {windowWidth < breakpoint ? (
                  <Icon
                    lib="tb"
                    name="TbLayoutNavbar"
                    aria-hidden={true}
                    style={{ fontSize: '1.5em' }}
                  />
                ) : (
                  <>
                    <Icon
                      lib="hi"
                      name="HiOutlineDotsHorizontal"
                      className={styles.dots}
                      aria-hidden={true}
                      style={{ fontSize: '1.8em' }}
                    />
                    <Icon
                      lib="tfi"
                      name="TfiLineDashed"
                      className={styles.dashes}
                      aria-hidden={true}
                      style={{ fontSize: '1.8em' }}
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
                      openForm === null ? styles.closed : ''
                    }`}
                  >
                    <FormLogin
                      setIsFormOpen={bindForm('login')}
                      isOpen={isLoginFormOpen}
                      text="nav"
                    />
                    <Register
                      setIsFormOpen={bindForm('register')}
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
                  className="password-reset"
                  wrapperClass="password-reset-wrap"
                  text={`${t('ForgotPassword')}`}
                  isOpen={isResetFormOpen}
                  setIsFormOpen={bindForm('reset')}
                  hideBrackets={true}
                >
                  <PasswordReset text="login" />
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
