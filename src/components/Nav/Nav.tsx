import { FC, useState, useEffect, forwardRef, Ref, useImperativeHandle } from 'react'
import { AiOutlineDash } from 'react-icons/ai'
import { BiChat, BiImages, BiImage } from 'react-icons/bi'
import { BsSegmentedNav, BsChatSquareDots, BsPerson, BsFillMenuButtonFill } from 'react-icons/bs'
import { CgSearch, CgMenuRound } from 'react-icons/cg'
import { FaRegImages } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { GrContact } from 'react-icons/gr'
import { HiOutlineSearchCircle, HiOutlineDotsHorizontal } from 'react-icons/hi'
import { ImSearch } from 'react-icons/im'
import { IoMdImages } from 'react-icons/io'
import { IoSearchCircleOutline, IoSettingsSharp, IoPerson, IoImagesOutline } from 'react-icons/io5'
import { MdImportContacts, MdPortrait, MdOutlinePerson, MdShortText } from 'react-icons/md'
import { RiSearchLine, RiMenu4Fill, RiHomeSmileLine } from 'react-icons/ri'
import { TbLayoutNavbar } from 'react-icons/tb'
import { TfiLayoutMenu, TfiLayoutMenuFull, TfiLineDashed } from 'react-icons/tfi'

import styles from './nav.module.css'
import { links } from './links.json'
import { skipLinks } from './linksskip.json'
import { Link, NavLink } from 'react-router-dom'
import { useTheme, useThemeUpdate } from '../../hooks/useTheme'
import useScrollDirection from '../../hooks/useScrollDirection'
import useWindowSize from '../../hooks/useWindowSize'
import { breakpoint, breakpointSmall } from '../../interfaces'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import logo from '../../assets/JLA_Jenniina-light-3-480x198.png'
import logoDark from '../../assets/JLA_Jenniina-3-480x198.png'
import useTimeout from '../../hooks/useTimeout'


type Link = {
    label: string,
    href: string
}

const Nav = ({ setStyleMenu }: any, ref: Ref<{ getStyle: () => boolean }>) => {

    const { windowHeight, windowWidth } = useWindowSize();

    const icons = (label: string) => {
        if (label === "Welcome")
            return <RiHomeSmileLine
                className={windowWidth < breakpoint ? styles.smallnav : ''} />
        else if (label === "About")
            return <BsPerson
                className={windowWidth < breakpoint ? styles.smallnav : ''} /> //MdOutlinePerson
        else if (label === "Portfolio")
            return <IoMdImages
                className={windowWidth < breakpoint ? styles.smallnav : ''} /> //BiImage IoImagesOutline BiImages FaRegImages  MdImportContacts
        else if (label === "Contact")
            return <BiChat
                className={windowWidth < breakpoint ? styles.smallnav : ''} />
    }

    const LinkComponent: FC<{ links: Link[] }> = ({ links }) => {
        return (
            <ul>
                {windowWidth < breakpointSmall && !menuStyleAlt ? <li className={styles.jenniina}>
                    <a href="https://jenniina.fi">
                        <img
                            src={lightTheme ? logoDark : logo}
                            width='96px' height='39.6px'
                        /></a>
                </li> : ''}

                {links.map((link: Link, index: number) => {

                    return (
                        <li key={`${link.label}${index}`} className={`${styles[link.label]}`}>
                            <NavLink to={link.href} className={({ isActive }) => (isActive ? `active ${styles.active} ${styles.link}` : `${styles.link}`)}>
                                {icons(link.label)}
                                <span>{link.label}</span>
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
                            </NavLink >
                        </li>
                    )
                })}
            </ul>
        )
    }
    const lightTheme = useTheme()
    const toggleTheme = useThemeUpdate()

    // const [click, setClick] = useState(false)
    // const handleClick = () => setClick(!click)

    // const [transparency, setTransparency] = useState(false)
    // const changeTransparency = () => {
    //     if (window.scrolled >= 100) {
    //         setTransparency(true)
    //     } else {
    //         setTransparency(false)
    //     }
    // }
    // const scroll = window.scrolled
    // useEffect(() => {
    //     window.addEventListener('scroll', changeTransparency)
    // }, [scroll])

    const clickOutsideRef = useOutsideClick({
        onOutsideClick: closingAllMenus
    })

    const scrollDirection = useScrollDirection();

    const [isMainMenuOpen, setIsMainMenuOpen] = useState(true)
    const [isMainMenuHidden, setIsMainMenuHidden] = useState(false)

    const [isToolbarOpen, setIsToolbarOpen] = useState(false)
    const [isToolbarHidden, setIsToolbarHidden] = useState(true)

    const mainMenuHideDelayTESTINGHOOK = () => {
        useTimeout(() => setIsMainMenuHidden(true), 1000)
    }
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
        isMainMenuOpen ? setIsMainMenuHidden(false) :
            mainMenuHideDelay()
        if (isMainMenuOpen && windowWidth < breakpoint) {
            setIsMainMenuOpen(false)
            mainMenuHideDelay()
        }
        isToolbarOpen ? setIsToolbarHidden(false) :
            toolbarHideDelay()
        if (isToolbarOpen) {
            setIsToolbarOpen(false)
            toolbarHideDelay()
        }
    }

    // type menuStyle = { original?: 'menuoriginal', menualt?: 'menualt' }
    // const menuStyleOriginal: menuStyle = {original: 'menuoriginal'}
    // const menuStyleAlternate: menuStyle = {menualt: 'menualt'}

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
        if (windowWidth > breakpoint
            || (menuStyleAlt
                && windowHeight > windowWidth
                && windowWidth < breakpoint))
            setIsMainMenuOpen(true)
    }, [windowWidth, windowHeight])

    useImperativeHandle(ref, () => ({
        getStyle: () => {
            return menuStyleAlt
        }
    }), [menuStyleAlt])

    //Send menuStyleAlt status to App.tsx
    useEffect(() => {
        setStyleMenu(menuStyleAlt)
    }, [menuStyleAlt])

    const [scrolled, setScrolled] = useState(false) //when false, keeps header visible

    useEffect(() => {
        window.addEventListener("scroll", scrolling);
        return () => {
            window.removeEventListener("scroll", scrolling)
        }
    });

    const scrolling = () => {
        window.scrollY > 100 ? setScrolled(true) : setScrolled(false)
    }




    return (

        <header ref={clickOutsideRef}
            className={`
                ${styles['main-header']}
                ${scrollDirection === "down" && scrolled ? styles.hide : styles.show} 
                ${lightTheme ? styles.light : ''} 
                ${menuStyleAlt
                    ? `${styles.menualt} `
                    : `${styles.menumain} `} 
                ${menuStyleTransform
                    ? `${styles.transformations}`
                    : ''} 
                `} >

            <nav className={styles['skip-links']}>
                <SkipLink skipLinks={skipLinks} />
            </nav>
            <div className={styles['header-inner-wrap']}>
                <div className={`${lightTheme
                    ? `${styles['logo-container']} ${styles.light}`
                    : styles['logo-container']} 
                        ${windowWidth < breakpointSmall
                        ? 'screen-reader-text'
                        : ''}`}>
                    <a href="https://jenniina.fi/" >
                        <span className="screen-reader-text">Jenniina</span>
                    </a>
                </div>
                <button aria-haspopup="true"
                    aria-expanded={isMainMenuOpen}
                    onClick={toggleMainMenu}
                    className={`${windowHeight < windowWidth && windowWidth < breakpoint ? `${styles.togglemenuexception} ${styles.togglemenu}` : styles.togglemenu}`}>
                    {/* <RiMenu4Fill style={windowWidth < breakpointSmall ? { fontSize: '0.9em' } : { fontSize: '1em' }} aria-hidden={true} /> */}
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
                        style={{ fontSize: '1em' }}>
                        <g>
                            <path className={styles.menupath} d="m 90 90 l -80 -80 l 60 0 a 1 1 0 1 1 0 40 l -40 0 a 1 1 0 0 0 0 40 l 60 0 l 0 -80 l -80 80">
                            </path>
                        </g>
                    </svg>
                    <span className={windowWidth < breakpoint ? 'screen-reader-text' : ''}>
                        Menu</span>
                </button>
                <nav
                    id={'site-navigation'}
                    className={`site-navigation 
                        ${styles['menu-container']} 
                            ${isMainMenuOpen
                            ? ` ${styles['show']}`
                            : `${isMainMenuHidden && windowWidth < breakpoint
                                ? styles.hidden : ''}
                                    `}
                                    ${windowHeight < windowWidth
                            && windowWidth < breakpoint
                            ? styles.altnav : ''}
                                    ${menuStyleAlt
                            && windowHeight < windowWidth
                            && windowWidth > breakpointSmall
                            && windowWidth < breakpoint
                            ? styles.altexception : ''}
                                    ${menuStyleAlt
                            && windowHeight > windowWidth
                            && windowWidth < breakpoint
                            ? styles.keepvisible : ''}
                                    `}
                    aria-expanded={isMainMenuOpen}>
                    <LinkComponent links={links} />
                </nav>
                <button className={styles.search}
                    role='search' aria-label='search' >
                    <CgSearch style={windowWidth < breakpointSmall ? { fontSize: '1em' } : { fontSize: '1.4em' }}
                        aria-hidden={true} />
                    <span className={windowWidth < breakpoint ? 'screen-reader-text' : ''}>
                        Search
                    </span>
                </button>
                <button className={styles.settings}
                    onClick={toggleToolbar} >
                    <IoSettingsSharp style={windowWidth < breakpointSmall ? { fontSize: '0.9em' } : { fontSize: '1.1em' }}
                        aria-hidden={true} />
                    <span id='settings' className={windowWidth < breakpoint ? 'screen-reader-text' : ''} >
                        Settings
                    </span>
                </button>
                <nav className={`${styles.toolbar} 
                           ${isToolbarOpen
                        ? `${styles['show']}`
                        : `${isToolbarHidden
                            ? styles.hidden
                            : ''}`}
                            `}
                    aria-labelledby='settings'
                    aria-expanded={isToolbarOpen} >
                    <div className={styles.toolwrap}>
                        <label htmlFor='dlt-btn'>
                            {lightTheme
                                ? 'Dark Mode'
                                : 'Light Mode'}
                        </label>
                        <button id='dlt-btn'
                            className={
                                lightTheme
                                    ? `${styles['dlt-btn']}`
                                    : `${styles['active']} ${styles['dlt-btn']}`
                            }
                            onClick={toggleTheme} >
                            <div
                                className={`${styles['dlt-inner-wrapper']}`} >
                                <div
                                    className={`${styles['dlt-btn-inner-left']}`} >
                                    <div
                                        className={`${styles['dlt-innermost']}`} >
                                        <span className='screen-reader-text'>
                                            {lightTheme
                                                ? 'Dark Mode'
                                                : 'Light Mode'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className={styles.toolwrap}>
                        <label htmlFor='navbar-style'>
                            Navbar style
                        </label>
                        <button id='navbar-style'
                            onClick={menuStyleAltToggle}
                            className={styles.navstyle} >
                            {windowWidth < breakpoint
                                ? <TbLayoutNavbar aria-hidden={true} fontSize='1.5em' />
                                : <>
                                    <HiOutlineDotsHorizontal className={styles.dots} aria-hidden={true} fontSize='1.8em' />
                                    <TfiLineDashed className={styles.dashes} aria-hidden={true} fontSize='1.8em' />
                                </> //MdShortText AiOutlineDash
                            }
                        </button>
                    </div>

                </nav>
            </div>
        </header>
    )
}

export default forwardRef(Nav)