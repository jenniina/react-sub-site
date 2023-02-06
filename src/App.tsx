import { useState, FC, useRef, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './css/App.css'
import Nav from './components/Nav/Nav'
import Welcome from './pages/Welcome'
import Test from './pages/testpage'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import BlobPage from './pages/pages-portfolio/BlobPage'
import DragAndDropPage from './pages/pages-portfolio/DragAndDropPage'
import TodoPage from './pages/pages-portfolio/TodoPage'
import CustomSelectPage from './pages/pages-portfolio/CustomSelectPage'
import NavPortfolio from './components/NavPortfolio/NavPortfolio'
import FormPage from './pages/pages-portfolio/FormPage'
import { Footer } from './components/Footer/Footer'
import { useTheme } from './hooks/useTheme'
import { useScrollbarWidth } from './hooks/useScrollbarWidth'
import { RefObject } from './interfaces'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
import { isTouchDevice } from './hooks/useDraggable'

const App: FC = () => {

  const touchDevice = isTouchDevice();

  const scrollbarWidth = useScrollbarWidth()

  const styleInnerWrap: React.CSSProperties = {
    ['--scrollbar_width' as string]: `${scrollbarWidth}px`
  };


  //To get menualt type from Nav and set Footer padding accordingly:
  const [styleMenu, setStyleMenu] = useState<boolean>()
  const menuStyle = useRef() as RefObject<{ getStyle: () => boolean }>

  const [menuStyleAltTransform, setMenuStyleAltTransform] = useState(false)

  const lightTheme = useTheme()


  //So transformations don't take place when changing menu style or toggling light/dark mode:
  useEffect(() => {
    setMenuStyleAltTransform(false)
    setTimeout(() => {
      setMenuStyleAltTransform(true)
    }, 300)
  }, [lightTheme, menuStyle.current])

  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);

  const [transitionPage, setTransistionPage] = useState("fadeIn");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (location.pathname !== displayLocation.pathname) setTransistionPage("fadeOut");
  }, [location]);

  return (
    <div className={`App ${lightTheme ? 'light' : ''} ${touchDevice ? 'touch' : ''}  ${menuStyleAltTransform ? `transformations` : ''}`} >
      <div className="App-inner-wrap" style={styleInnerWrap}>
        <Nav setStyleMenu={setStyleMenu} ref={menuStyle} />

        <main id={`main-content`}

          className={`${transitionPage} main-content`}
          onAnimationEnd={() => {
            if (transitionPage === "fadeOut") {
              setTransistionPage("fadeIn");
              setDisplayLocation(location);
            }
          }}
        >

          <Routes location={displayLocation}>

            <Route path='*' element={<Welcome heading='Welcome' text='to the React sub-page of Jenniina.fi' type='page' />} />
            <Route path='/react/about' element={<About heading='About' text='This Site' type='page' />} />

            <Route path='/react/test' element={<Test heading='Test Page' text='' type='page' />} />

            <Route path='/react/portfolio' element={<NavPortfolio />} >
              <Route index element={<Portfolio heading='Portfolio' type='page' text='ReactJS' />} />
              <Route path='/react/portfolio/blob' element={<BlobPage heading='Blob App' text='' type='page subpage' />} />
              <Route path='/react/portfolio/draganddrop' element={<DragAndDropPage heading='Drag and Drop' text='' type='page subpage' />} />
              <Route path='/react/portfolio/todo' element={<TodoPage heading='Todo App' text='' type='page subpage' />} />
              <Route path='/react/portfolio/select' element={<CustomSelectPage heading='Custom Select' text='' type='page subpage' />} />
              <Route path='/react/portfolio/form' element={<FormPage heading='Multistep Form' text='' type='page subpage' />} />

            </Route>


            <Route path='/react/contact' element={<Contact heading='Contact' text="Let's collaborate" type='page' />} />
            {/* <Route path="*" element={<NotFound heading='404' />}/> */}

          </Routes>

        </main>

        <Footer styleMenu={styleMenu} />
        <ScrollToTop styleMenu={styleMenu} />

      </div>
    </div>
  )
}

export default App
