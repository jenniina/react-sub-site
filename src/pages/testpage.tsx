import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import styles from './css/welcome.module.css'
import useArray from '../hooks/useArray'
import useEventListener from '../hooks/useEventListener'
import useIsOnScreen from '../hooks/useIsOnScreen'
import useMediaQuery from '../hooks/useMediaQuery'
import useSize from '../hooks/useSize'
import { RefObject } from '../interfaces'
import useToggle from '../hooks/useToggle'

import Hero from '../components/Hero/Hero'


export default function Home({ heading, text, type }: { heading: string; text: string; type: string }) {

    const lightTheme = useTheme()

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
                        <h2>useEventListener hook test</h2>
                        <p>Last key pressed is <em>{key}</em></p>

                        <h2>UseMediaQuery hook test</h2>
                        <p>Screen size is larger than 1000px: {mediaIsLarge.toString()}</p>

                        <h2>UseSize hook test</h2>
                        <label htmlFor='textarea'>Textarea size: {JSON.stringify(size)}</label>
                        <textarea id='textarea' ref={textAreaRef}></textarea>
                    </div>
                </section>
                <section className="card">
                    <div>
                        <h2>UseArray hook test</h2>
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
                        <h2>useIsOnScreen hook test</h2>
                        <p>{visible && "(Visible)"}<br /><br /></p>
                        <h2>Basic state</h2>
                        <div className='input-wrap'>
                            <label className='drop'>
                                <input name="test" type="text" required value={input}
                                    onChange={e => setInput(e.target.value)} />
                                <span>Test</span></label>
                        </div>
                        <p>current key: {input} </p>
                        <p>previous key: {prevInput.current}</p>
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

            </div>
        </div>
    )
}
