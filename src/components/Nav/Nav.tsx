import { FC, useState, useEffect, forwardRef, Ref, useImperativeHandle } from 'react'
import { BiChat } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { CgSearch } from 'react-icons/cg'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoMdImages } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'
import { RiHomeSmileLine } from 'react-icons/ri'
import { TbLayoutNavbar } from 'react-icons/tb'
import { TfiLineDashed } from 'react-icons/tfi'
import styles from './nav.module.css'
//import { links } from './links.json'
//import { skipLinks } from './linksskip.json'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme, useThemeUpdate } from '../../hooks/useTheme'
import useScrollDirection from '../../hooks/useScrollDirection'
import useWindowSize from '../../hooks/useWindowSize'
import {
  EAbout,
  EContact,
  EDarkMode,
  EExitToMainSite,
  ELanguageTitle,
  ELightMode,
  EMenu,
  ENavStyle,
  EPasswordsDoNotMatch,
  EPleaseCheckYourEmailForYourVerificationLink,
  EPortfolio,
  ERegistrationSuccesful,
  ESearch,
  ESettings,
  ESkipToFooter,
  ESkipToMainContent,
  ESkipToMainNavigation,
  EWelcome,
  ReducerProps,
  breakpoint,
  breakpointSmall,
} from '../../interfaces'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import logo from '../../assets/JLA_Jenniina-light-3-480x198.png'
import logoDark from '../../assets/JLA_Jenniina-3-480x198.png'
import useTimeout from '../../hooks/useTimeout'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { logout } from '../../reducers/authReducer'
import { ELogin, ELogout, ELanguages, ELoggedInAs } from '../../interfaces'
import FormLogin from '../Login/Login'
import Register from '../Register/Register'
import { notify } from '../../reducers/notificationReducer'
import { createUser } from '../../reducers/usersReducer'
import Notification from '../Notification/Notification'
import { Select, SelectOption } from '../Select/Select'

type Link = {
  label: string
  href: string
}

interface NavProps {
  setStyleMenu: (style: boolean) => void
  language: ELanguages
  options: (enumObj: typeof ELanguages) => SelectOption[]
  getKeyByValue: (
    enumObj: typeof ELanguages,
    value: ELanguages
  ) => undefined | SelectOption['label']
  setLanguage: (language: ELanguages) => void
}

const Nav = (
  { setStyleMenu, language, options, getKeyByValue, setLanguage }: NavProps,
  ref: Ref<{ getStyle: () => boolean }>
) => {
  const { windowHeight, windowWidth } = useWindowSize()

  const links = [
    {
      label: EWelcome[language],
      href: '/',
    },
    {
      label: EAbout[language],
      href: '/about',
    },
    {
      label: EPortfolio[language],
      href: '/portfolio',
    },
    {
      label: EContact[language],
      href: '/contact',
    },
  ]

  const skipLinks = [
    {
      label: ESkipToMainNavigation[language],
      href: '#site-navigation',
    },
    {
      label: ESkipToMainContent[language],
      href: '#main-content',
    },
    {
      label: ESkipToFooter[language],
      href: '#main-footer',
    },
  ]

  const icons = (label: string) => {
    if (label === EWelcome[language])
      return (
        <RiHomeSmileLine className={windowWidth < breakpoint ? styles.smallnav : ''} />
      )
    else if (label === EAbout[language])
      return <BsPerson className={windowWidth < breakpoint ? styles.smallnav : ''} />
    //MdOutlinePerson
    else if (label === EPortfolio[language])
      return <IoMdImages className={windowWidth < breakpoint ? styles.smallnav : ''} />
    //BiImage IoImagesOutline BiImages FaRegImages  MdImportContacts
    else if (label === EContact[language])
      return <BiChat className={windowWidth < breakpoint ? styles.smallnav : ''} />
  }

  const LinkComponent: FC<{ links: Link[] }> = ({ links }) => {
    return (
      <ul>
        {windowWidth < breakpointSmall && !menuStyleAlt ? (
          <li className={styles.jenniina}>
            <a href='https://jenniina.fi'>
              <img src={lightTheme ? logoDark : logo} width='96px' height='39.6px' />
            </a>
          </li>
        ) : (
          ''
        )}

        {links.map((link: Link, index: number) => {
          return (
            <li key={`${link.label}${index}`} className={`${styles[link.label]}`}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? `active ${styles.active} ${styles.link} tooltipwrap`
                    : `${styles.link} tooltipwrap`
                }
              >
                {icons(link.label)}
                <span>{link.label}</span>
                <b className='tooltip' aria-hidden={true} data-tooltip={link.label}></b>
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
  const lightTheme = useTheme()
  const toggleTheme = useThemeUpdate()

  const clickOutsideRef = useOutsideClick({
    onOutsideClick: closingAllMenus,
  })

  const scrollDirection = useScrollDirection()

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true)
  const [isMainMenuHidden, setIsMainMenuHidden] = useState(false)

  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [isToolbarHidden, setIsToolbarHidden] = useState(true)

  //with the clear and reset options destructured for use:
  const { clear, reset } = useTimeout(() => setIsMainMenuHidden(true), 1000) //clear and reset could be called with something like an onClick={clear}

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
    //setIsMainMenuOpen(prev => !prev)
    if (isMainMenuOpen && windowWidth < breakpoint) {
      setIsMainMenuOpen(false)
      mainMenuHideDelay()
    } else {
      setIsMainMenuOpen(true)
      setIsMainMenuHidden(false)
    }
    if (isToolbarOpen) {
      setIsToolbarOpen(false)
      toolbarHideDelay()
    }
  }
  function toggleToolbar() {
    //setIsToolbarOpen(prev => !prev)
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

  //runs when clicked outside the header, see useOutsideClick
  function closingAllMenus() {
    isMainMenuOpen ? setIsMainMenuHidden(false) : mainMenuHideDelay()
    if (isMainMenuOpen && windowWidth < breakpoint) {
      setIsMainMenuOpen(false)
      mainMenuHideDelay()
    }
    isToolbarOpen ? setIsToolbarHidden(false) : toolbarHideDelay()
    if (isToolbarOpen) {
      setIsToolbarOpen(false)
      toolbarHideDelay()
    }
  }

  const [menuStyleAlt, setMenuStyleAlt] = useState(true)
  const [menuStyleTransform, setMenuStyleTransform] = useState(true)

  function menuStyleAltToggle() {
    if (menuStyleAlt && isMainMenuOpen && windowWidth < breakpoint) {
      setIsMainMenuOpen(false)

      mainMenuHideDelay()
      setTimeout(() => {
        //setIsMainMenuHidden(true)
        setMenuStyleAlt(false)
      }, 300)
    } else if (!isMainMenuOpen && windowWidth < breakpoint) {
      setIsMainMenuOpen(true)
      setIsMainMenuHidden(false)
      setMenuStyleAlt(true)
    } else {
      setMenuStyleAlt((prev) => !prev)
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
      windowWidth > breakpoint ||
      (menuStyleAlt && windowHeight > windowWidth && windowWidth < breakpoint)
    )
      setIsMainMenuOpen(true)
  }, [windowWidth, windowHeight])

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
    window.addEventListener('scroll', scrolling)
    return () => {
      window.removeEventListener('scroll', scrolling)
    }
  })

  const scrolling = () => {
    window.scrollY > 100 ? setScrolled(true) : setScrolled(false)
  }

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const titleLogout = ELogout[language]
  const titleLogin = ELogin[language]
  const titleLoggedInAs = ELoggedInAs[language]

  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false)
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
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
  }, [location])

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (password !== confirmPassword) {
      dispatch(notify(`${EPasswordsDoNotMatch}`, true, 8))
      return
    }
    dispatch(createUser({ name, username, password, language, verified: false }))
      .then(async () => {
        dispatch(
          notify(
            `${ERegistrationSuccesful[language]} - ${EPleaseCheckYourEmailForYourVerificationLink[language]} `,
            false,
            8
          )
        )
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setName('')
      })
      .catch((err) => {
        console.log(err)
        if (err.code === 'ERR_BAD_REQUEST') {
          dispatch(notify(`Error: ${err.response?.data?.message}`, true, 8))
          return
        }
        dispatch(notify(`Error: ${err.message}`, true, 8))
      })
  }

  return (
    <>
      <header
        ref={clickOutsideRef}
        className={`
                ${styles['main-header']}
                ${scrollDirection === 'down' && scrolled ? styles.hide : styles.show} 
                ${lightTheme ? styles.light : ''} 
                ${menuStyleAlt ? `${styles.menualt} ` : `${styles.menumain} `} 
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
            <a href='https://jenniina.fi/'>
              <span>« {EExitToMainSite[language]}</span>
            </a>
          </div>
          <button
            aria-haspopup='true'
            aria-expanded={isMainMenuOpen}
            onClick={toggleMainMenu}
            className={`${
              windowHeight < windowWidth && windowWidth < breakpoint
                ? `${styles.togglemenuexception} ${styles.togglemenu}`
                : styles.togglemenu
            }`}
          >
            <svg
              stroke='currentColor'
              strokeWidth='12'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
              viewBox='0 0 100 100'
              aria-hidden='true'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
              style={{ fontSize: '1em' }}
            >
              <g>
                <path
                  className={styles.menupath}
                  d='m 90 90 l -80 -80 l 60 0 a 1 1 0 1 1 0 40 l -40 0 a 1 1 0 0 0 0 40 l 60 0 l 0 -80 l -80 80'
                ></path>
              </g>
            </svg>
            <span className={windowWidth < breakpoint ? 'scr' : ''}>
              {EMenu[language]}
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
                                      windowWidth > breakpointSmall &&
                                      windowWidth < breakpoint
                                        ? styles.altexception
                                        : ''
                                    }
                                    ${
                                      menuStyleAlt &&
                                      windowHeight > windowWidth &&
                                      windowWidth < breakpoint
                                        ? styles.keepvisible
                                        : ''
                                    }
                                    `}
            aria-expanded={isMainMenuOpen}
          >
            <LinkComponent links={links} />
          </nav>
          <button className={styles.search} role='search' aria-label='search'>
            <CgSearch
              style={
                windowWidth < breakpointSmall
                  ? { fontSize: '1em' }
                  : { fontSize: '1.4em' }
              }
              aria-hidden={true}
            />
            <span className={windowWidth < breakpoint ? 'scr' : ''}>
              {ESearch[language]}
            </span>
          </button>
          <button className={styles.settings} onClick={toggleToolbar}>
            <IoSettingsSharp
              style={
                windowWidth < breakpointSmall
                  ? { fontSize: '0.9em' }
                  : { fontSize: '1.1em' }
              }
              aria-hidden={true}
            />
            <span id='settings' className={windowWidth < breakpoint ? 'scr' : ''}>
              {ESettings[language]}
            </span>
          </button>
          <nav
            id='settings-toolbar'
            className={`${styles.toolbar} 
                           ${
                             isToolbarOpen
                               ? `${styles['show']}`
                               : `${isToolbarHidden ? styles.hidden : ''}`
                           }
                            `}
            aria-labelledby='settings'
            aria-expanded={isToolbarOpen}
          >
            <Select
              language={language}
              id='language-navbar'
              className={`language ${styles.language}`}
              instructions={ELanguageTitle[language]}
              hide
              options={options(ELanguages)}
              value={
                language
                  ? ({
                      value: language,
                      label: getKeyByValue(ELanguages, language),
                    } as SelectOption)
                  : undefined
              }
              onChange={(o) => {
                setLanguage(o?.value as ELanguages)
              }}
            />
            <div className={styles.toolwrap}>
              <label htmlFor='dlt-btn'>
                {lightTheme ? EDarkMode[language] : ELightMode[language]}
              </label>
              <button
                id='dlt-btn'
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
                      <span className='scr'>
                        {lightTheme ? EDarkMode[language] : ELightMode[language]}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className={styles.toolwrap}>
              <label htmlFor='navbar-style'>{ENavStyle[language]}</label>
              <button
                id='navbar-style'
                onClick={menuStyleAltToggle}
                className={`${styles.navstyle} ${styles['toolbar-btn']}`}
              >
                {windowWidth < breakpoint ? (
                  <TbLayoutNavbar aria-hidden={true} fontSize='1.5em' />
                ) : (
                  <>
                    <HiOutlineDotsHorizontal
                      className={styles.dots}
                      aria-hidden={true}
                      fontSize='1.8em'
                    />
                    <TfiLineDashed
                      className={styles.dashes}
                      aria-hidden={true}
                      fontSize='1.8em'
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
                      !isRegisterFormOpen && !isLoginFormOpen ? styles.closed : ''
                    }`}
                  >
                    <FormLogin
                      setIsFormOpen={setIsLoginFormOpen}
                      isOpen={isLoginFormOpen}
                      language={language}
                      titleLoggedInAs={titleLoggedInAs}
                      titleLogin={titleLogin}
                      titleLogout={titleLogout}
                      text='nav'
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
                      text='nav'
                    />
                  </div>
                  {/* <NavLink
                  to='/login'
                  className={({ isActive }) =>
                    isActive ? `active ${styles.active} ${styles.link}` : `${styles.link}`
                  }
                >
                  <span>Log in</span>
                </NavLink>
                <NavLink
                  to='/register'
                  className={({ isActive }) =>
                    isActive ? `active ${styles.active} ${styles.link}` : `${styles.link}`
                  }
                >
                  <span>Register</span>
                </NavLink> */}
                </>
              ) : (
                <>
                  <NavLink
                    to='/edit'
                    className={({ isActive }) =>
                      isActive
                        ? `active ${styles.active} ${styles.link}`
                        : `${styles.link}`
                    }
                  >
                    <span>Edit</span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    id='logoutnav'
                    className={`logout danger ${styles.logout}`}
                  >
                    {titleLogout} &times;
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
      <Notification language={language} />
    </>
  )
}

export default forwardRef(Nav)
