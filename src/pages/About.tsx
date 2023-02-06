import { useMemo, FC } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/about.module.css'
import useWindowSize from '../hooks/useWindowSize'
import Hero from '../components/Hero/Hero'
import { IoSettingsSharp } from 'react-icons/io5'

type colorProps = {
    i: number,
    e: number,
    background: string
}

export default function About({ heading, text, type }: { heading: string; text: string; type: string }) {

    const lightTheme = useTheme()

    const colorsArray: colorProps[] = []

    const setupColorblocks: colorProps[] = useMemo(() => {
        for (let i: number = 1; i <= 20; i++) {
            const item: colorProps = {
                i: i,
                e: 41 - i,
                background: `var(--color-primary-${i})`
            }
            colorsArray.push(item)
        }

        for (let i: number = 1; i <= 20; i++) {
            const item: colorProps = {
                i: 20 + i,
                e: 21 - i,
                background: `var(--color-secondary-${i})`
            }
            colorsArray.push(item)
        }
        return (colorsArray)
    }, [])

    const ColorComponent: FC<{ array: colorProps[] }> = ({ array }) => {
        return (
            <ul style={{ marginTop: '3em' }} className={`fullwidth1 ${styles['color-ul']}`}>
                {array.map((item, index: number) => {
                    const itemStyle: React.CSSProperties = {
                        backgroundColor: `${item.background}`,
                        color: item.i < 13 || item.i > 31 ? 'var(--color-primary-20)' : 'var(--color-primary-1)',
                        ['--i' as string]: `${item.i}`,
                        ['--e' as string]: `${item.e}`
                    };
                    const spanStyle: React.CSSProperties = {
                        ['--i' as string]: `${item.i}`,
                        ['--e' as string]: `${item.e}`
                    };

                    return (

                        <li key={`${item.background}${index}`} className={styles.shape} style={itemStyle}>
                            <span style={spanStyle}>{itemStyle.backgroundColor}</span>
                        </li>
                    )
                })}
            </ul>
        )
    }


    return (
        <div className={`${heading} ${type} ${lightTheme
            ? styles.light : ''}`} >
            <Hero heading={heading} text={text} />
            <div>
                <section className={`card ${styles.section}`} >
                    <div>
                        <div className="wide">
                            <p>This is a sub-site of <a href="https://jenniina.fi">jenniina.fi</a> made with and focusing on ReactJS. Other porfolio items may be found at the <a href="https://jenniina.fi/#portfolio">portfolio section</a> of the main site. </p>
                            <p><a href="https://github.com/jenniina/react-sub-site">Github Repository</a></p>

                            <h2 id='site-features'>Features of this site</h2>

                            <h3 id='settings' className="left">Site settings</h3>
                            <big> See menu bar <IoSettingsSharp
                                style={{ display: 'inline-block', marginBottom: '-0.15em' }} /> <span className='screen-reader-text'>Settings</span> icon</big>
                            <ul className="ul">

                                <li>Light/Dark mode button</li>
                                <li>Navigation style toggle button
                                    <ul>
                                        <li>Four styles</li>
                                        <li>Two at small screen size and two at large screen size</li>
                                    </ul>
                                </li>

                            </ul>

                            <h3 id='hero' className="left">Hero section</h3>
                            <big>Interactive elements </big>
                            <ul className="ul">
                                <li>Bubbles (top of the current page)</li>
                                <ul>
                                    <li>Hover/focus animation</li>
                                    <li>Remove with click or Enter when focused</li>
                                    <li>Pointer-enter direction aware movement</li>
                                </ul>

                                <li>Draggable blobs (<Link to="/react/portfolio">Portfolio page</Link> and some sub-pages)
                                    <ul>
                                        <li>Draggable</li>
                                        <li>Keyboard focus: move blobs with arrow keys</li>
                                    </ul>
                                </li>
                                <li>Geometric shapes (<Link to="/react/">Welcome page</Link>)
                                    <ul>
                                        <li>Hover/focus animation</li>
                                        <li>Remove with click or Enter when focused</li>
                                    </ul>
                                </li>
                                <li>Alien eyes (<Link to="/react/contact">Contact Page</Link>)
                                    <ul>
                                        <li>Rotate to face cursor</li>
                                        <li>Hover/focus animation</li>
                                        <li>Remove with click or Enter when focused</li>
                                        <li>Pointer-enter direction aware movement</li>
                                    </ul>
                                </li>
                                <li>Reset button on the lower right corner</li>
                                <li>Press Escape to skip to reset button</li>
                            </ul>

                            <h3 id='react' className="left">React Apps</h3>
                            <big>In the <Link to="/react/portfolio">Portfolio section</Link></big>

                            <ul className="ul">

                                <li><big><Link to="/react/portfolio/blob">Blob App</Link></big>
                                    <ul>
                                        <li>Draggable elements</li>
                                        <li>Color-changing </li>
                                        <li>Size-changing</li>
                                        <li>Adding more</li>
                                        <li>Removal </li>
                                    </ul>
                                </li>
                                <li><big><Link to="/react/portfolio/draganddrop">Drag and Drop App</Link></big>
                                    <ul>
                                        <li>Draggable list elements</li>
                                        <li>Sortable within their container</li>
                                        <li>Can be moved to two other containers</li>
                                        <li>Keyboard accessible drop-down list</li>
                                    </ul>
                                </li>
                                <li><big><Link to="/react/portfolio/todo">Todo App</Link></big>
                                    <ul>
                                        <li>Add tasks to list</li>
                                        <li>Remove tasks one by one or every finished task at once</li>
                                        <li>See number of unfinished tasks</li>
                                        <li>Uses localStorage to store the information</li>
                                    </ul>
                                </li>
                                <li><big><Link to="/react/portfolio/select">Custom Select App </Link></big>
                                    <ul>
                                        <li>Single select</li>
                                        <li>Multiple select</li>
                                        <li>Navigate with arrow keys</li>
                                        <li>Go to item by typing the first few letters of the item</li>
                                    </ul>
                                </li>
                                <li><big><Link to="/react/portfolio/form">Multistep Form</Link></big>
                                    <ul>
                                        <li>Three step fully functional contact form</li>
                                        <li>Uses emailjs-com to send the message</li>
                                    </ul>
                                </li>
                            </ul>
                            <h3 id='other' className="left">Other features</h3>
                            <ul className="ul">
                                <li>Page transition animation</li>
                                <li>Main title wave animation</li>
                                <li>Back to top link at the lower right corner and at the footer</li>
                                <li>Exit links at the top and bottom of the pages</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={`fullwidth ${styles.section} ${styles.sectioncolor}`}>
                    <div className={styles.colortextwrap}>
                        <div>
                            <div className="wide">
                                <h3 id='color' className="left" style={{ marginTop: 0 }}>Site Colors</h3>
                                <p>The site colors' lightnesses switch in light mode, wherein var(--color-primary-1) becomes the lightest color instead of the darkest. </p>
                                <p>Animated clip-paths and text rotation on hover, with dynamic delay.</p>
                            </div>
                        </div>
                    </div>

                    <ColorComponent array={setupColorblocks} />

                </section>

            </div>
        </div >
    )
}
