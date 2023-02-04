import { useContext, useState, useRef, useEffect, FC, ChangeEvent } from 'react'
import { useTheme, useThemeUpdate } from '../hooks/useTheme'

import { ReactDOM } from 'react'
import styles from './css/welcome.module.css'
import TodoApp from '../components/Todo/TodoApp'
import useWindowSize from '../hooks/useWindowSize'
import useArray from '../hooks/useArray'
import useEventListener from '../hooks/useEventListener'
import useIsOnScreen from '../hooks/useIsOnScreen'
import useMediaQuery from '../hooks/useMediaQuery'
import useSize from '../hooks/useSize'
import { RefObject } from '../interfaces'
import useToggle from '../hooks/useToggle'

import Hero from '../components/Hero/Hero'
import { ImImages } from 'react-icons/im'
import { IoLogoHtml5, IoLogoCss3, IoMdImages } from 'react-icons/io'
import { IoLogoReact, IoImages, IoImagesSharp } from 'react-icons/io5'
import { MdDesignServices, MdOutlineDesignServices, MdImportantDevices, MdOutlineImportantDevices } from 'react-icons/md'
import { RiCodeSSlashFill } from 'react-icons/ri'
import { SiJavascript, SiTypescript, SiPhp, SiVisualstudio } from 'react-icons/si'
import { TbCode } from 'react-icons/tb'

import illustrator from './../assets/logos/illustrator.png'
import photoshop from './../assets/logos/photoshop.png'
import indesign from './../assets/logos/indesign.png'
import aftereffects from './../assets/logos/aftereffects.png'
import animate from './../assets/logos/animate.png'
import acrobat from './../assets/logos/acrobat.png'




export default function Home({ heading, text, type }: { heading: string; text: string; type: string }) {

    const lightTheme = useTheme()

    const logoSize = '44px';

    const { windowHeight, windowWidth } = useWindowSize();

    const [input, setInput] = useState('')

    const prevInput = useRef('')

    useEffect(() => {
        prevInput.current = input
    }, [input])

    const { array, set, push, remove, filter, update, clear } = useArray([
        1, 2, 3, 4, 5, 6,
    ])

    const [key, setKey] = useState("")
    useEventListener("keydown", (e: KeyboardEvent) => {
        setKey(e.key)
    })

    const headerTwoRef = useRef() as RefObject<HTMLElement>
    const visible = useIsOnScreen(headerTwoRef, "-200px")

    const mediaIsLarge = useMediaQuery("(min-width: 1000px)")

    const textAreaRef = useRef() as RefObject<HTMLTextAreaElement>
    const size = useSize(textAreaRef)

    const [value, toggleValue] = useToggle(false)
    const [count, setCount] = useState(0)


    return (
        <div className={`${heading} ${type} ${lightTheme
            ? styles.light : ''}`} >
            <Hero heading={heading} text={text} />
            <div className='inner-wrap'>
                <section className="card">
                    <div>
                        <h1>Heading 1</h1>
                        <h2>Heading 2</h2>
                        <h3>Heading 3</h3>
                        <h4>Heading 4</h4>
                        <h5>Heading 5</h5>
                        <h6>Heading 6</h6>
                    </div>
                </section>
                <section className="card">
                    <div>
                        <p>Last Key: {key}</p>
                        <p>Mediaquery large is: {mediaIsLarge.toString()}</p>
                        <label htmlFor='textarea'>{JSON.stringify(size)}</label>
                        <textarea id='textarea' ref={textAreaRef}></textarea>
                    </div>
                </section>
                <section className="card">
                    <div>
                        <div>{array.join(", ")}</div>
                        <button onClick={() => push(7)}>Add 7</button>
                        <button onClick={() => update(1, 9)}>Change Second Element To 9</button>
                        <button onClick={() => remove(1)}>Remove Second Element</button>
                        <button onClick={() => filter((n: number) => n < 4)}>
                            Keep Numbers Less Than 4
                        </button>
                        <button onClick={() => set([1, 2, 3, 4, 5, 6])}>Set To 1, 2, 3, 4, 5, 6</button>
                        <button onClick={clear}>Clear</button>
                    </div>
                </section>
                <section className="card" ref={headerTwoRef}>
                    <div>
                        <p>{visible && "(Visible)"}<br /><br /></p>
                        <div className='input-wrap'>
                            <label className='drop'>
                                <input name="test" type="text" required value={input}
                                    onChange={e => setInput(e.target.value)} />
                                <span>Test</span></label>
                        </div>
                        <p>current: {input} </p>
                        <p>previous: {prevInput.current}</p>
                    </div>
                </section>
                <section>
                    <div>
                        <h2>
                            Footer
                        </h2>
                        <div style={{ width: 'max-content', margin: '1em auto' }}>
                            <div style={{ width: 'max-content', margin: '0.4em auto', fontSize: '2em' }}>[ {value.toString()} ]</div>
                            <button onClick={() => toggleValue(!value)}>Toggle</button>
                            <button onClick={() => toggleValue(true)}>Make True</button>
                            <button onClick={() => toggleValue(false)}>Make False</button>
                        </div>
                        <div style={{ width: 'max-content', margin: '1em auto' }}><button onClick={() => setCount((count) => count + 1)} >
                            count is {count}
                        </button></div>

                    </div>
                </section>
                <h2>Skills</h2>
                <section className={`card ${styles.skills}`}>
                    <div>
                        <h3 id="web-design">
                            <div><TbCode style={windowHeight < windowWidth
                                ? { fontSize: '8vw' }
                                : { fontSize: '8vh' }
                            } /></div>
                            <div>Web Design</div>
                        </h3>
                        <h4>// Technologies I've worked with</h4>
                        <div className={styles.techwrap}>
                            <div className={`${styles.html} ${styles.tech}`}>
                                <div>
                                    <IoLogoHtml5 className={styles.icon} aria-hidden='true' />
                                    <h5>HTML</h5>
                                    <p>Comfortable</p>
                                </div>
                            </div>
                            <div className={`${styles.css} ${styles.tech}`}>
                                <div>
                                    <IoLogoCss3 className={styles.icon} aria-hidden='true' />
                                    <h5>CSS</h5>
                                    <p>Comfortable</p>
                                </div>
                            </div>
                            <div className={`${styles.javascript} ${styles.tech}`}>
                                <div>
                                    <SiJavascript className={`${styles.icon}`} aria-hidden='true' />
                                    <h5>JavaScript</h5>
                                    <p
                                    >Basic</p>
                                </div>
                            </div>
                            <div className={`${styles.php} ${styles.tech}`}>
                                <div>
                                    <SiPhp className={styles.icon} aria-hidden='true' />
                                    <h5>PHP </h5>
                                    <p>Basic</p>
                                </div>
                            </div>
                            <div className={`${styles.typescript} ${styles.tech}`}>
                                <div>
                                    <SiTypescript className={styles.icon} aria-hidden='true' />
                                    <h5>TypeScript</h5>
                                    <p>Beginner</p>
                                </div>
                            </div>
                            <div className={`${styles.react} ${styles.tech}`}>
                                <div>
                                    <IoLogoReact className={styles.icon} aria-hidden='true' />
                                    <h5>React</h5>
                                    <p>Beginner</p>
                                </div>
                            </div>
                        </div>
                        <h3>// Tools I use</h3>
                        <div className={styles.toolwrap}>
                            <div className={`${styles.html} ${styles.tool}`} >
                                <p>Adobe XD & Figma</p>
                                <p>WordPress</p>
                                <p>VS Code</p>
                                <p>MAMP</p>
                                <p>Browsersync</p>
                                <p>WAVE Web Accessibility Evaluation Tool</p>
                                <p>NVDA Non-visual Desktop Access screen reader</p>
                                <p>Screaming Frog SEO Spider</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`card ${styles.skills}`}>
                    <div>
                        <h3 id="graphic-design">
                            <div><IoMdImages style={windowHeight < windowWidth
                                ? { fontSize: '8vw' }
                                : { fontSize: '8vh' }
                            } /></div>
                            <div>Graphic and Motion Design</div>
                        </h3>
                        <h4>// Programs I use</h4>
                        <div className={styles.techwrap}>
                            <div className={`${styles.illustrator} ${styles.tech} ${styles.graphic}`} >
                                <div>
                                    <img src={illustrator} className={styles.icon} aria-hidden='true' height={logoSize} width={logoSize} />
                                    <h5>Illustrator</h5>
                                    <p>Comfortable</p>
                                </div>
                            </div>
                            <div className={`${styles.photoshop} ${styles.tech} ${styles.graphic}`} >
                                <div>
                                    <img src={photoshop} className={styles.icon} aria-hidden='true' height={logoSize} width={logoSize} />
                                    <h5>Photoshop</h5>
                                    <p>Comfortable</p>
                                </div>
                            </div>
                            <div className={`${styles.indesign} ${styles.tech} ${styles.graphic}`} >
                                <div>
                                    <img src={indesign} className={styles.icon} aria-hidden='true' height={logoSize} width={logoSize} />
                                    <h5>InDesign</h5>
                                    <p>Basic</p>
                                </div>
                            </div>
                            <div className={`${styles.acrobat} ${styles.tech} ${styles.graphic}`} >
                                <div>
                                    <img src={acrobat} className={styles.icon} aria-hidden='true' height={logoSize} width={logoSize} />
                                    <h5>Acrobat</h5>
                                    <p>Basic</p>
                                </div>
                            </div>
                            <div className={`${styles.aftereffects} ${styles.tech} ${styles.graphic}`} >
                                <div>
                                    <img src={aftereffects} className={styles.icon} aria-hidden='true' height={logoSize} width={logoSize} />
                                    <h5>AfterEffects</h5>
                                    <p>Intermediate</p>
                                </div>
                            </div>
                            <div className={`${styles.animate} ${styles.tech} ${styles.graphic}`} >
                                <div>
                                    <img src={animate} className={styles.icon} aria-hidden='true' height={logoSize} width={logoSize} />
                                    <h5>Animate</h5>
                                    <p>Basic</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
