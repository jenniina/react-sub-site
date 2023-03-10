import React, { useMemo, useCallback, FC, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './hero.module.css'
import useWindowSize from '../../hooks/useWindowSize'
import useRandomMinMax from '../../hooks/useRandomMinMax'
import * as Draggable from '../../hooks/useDraggable'
import { useTheme } from '../../hooks/useTheme'
import useEnterDirection from '../../hooks/useEnterDirection'
import { RefObject } from '../../interfaces'
import useEventListener from '../../hooks/useEventListener'
import useSessionStorage from '../../hooks/useStorage'


type itemProps = {
    i: number,
    e: number,
    size: number,
    color: string
}

//Change these too, if the headings change, or add more as needed:
const LOCATION = {
    HOME: 'Welcome',
    ABOUT: 'About',
    PORTFOLIO: 'Portfolio',
    CONTACT: 'Contact',
    FORM: 'Multistep Form',
    BLOBAPP: 'Blob App',
    DND: 'Drag and Drop',
}

export default function Hero({ heading, text }: { heading: string; text: string }) {

    const location = useLocation()

    //Unused, left for reference
    const addDirectionClass = (e: React.PointerEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        target.classList.add(styles[useEnterDirection(e)])
        setTimeout(() => {
            target.classList.remove(styles[useEnterDirection(e)])
        }, 1000)
    }

    //Move ABOUT- and ELSE-items up, down, left or right, depending on the direction they're approached from:
    const movingItem = (e: React.PointerEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        const targetRight = window.getComputedStyle(target).getPropertyValue("right");
        const targetTop = window.getComputedStyle(target).getPropertyValue("top");
        const from = useEnterDirection(e)
        switch (from) {
            case 'top':
                target.style.top = `${parseFloat(targetTop) + 10}px`
                break;
            case 'right':
                target.style.right = `${parseFloat(targetRight) + 10}px`
                break;
            case 'bottom':
                target.style.top = `${parseFloat(targetTop) - 10}px`
                break;
            case 'left':
                target.style.right = `${parseFloat(targetRight) - 10}px`
            default:
        }
    }

    const resetButton = useRef() as RefObject<HTMLButtonElement>
    const ulRef = useRef() as RefObject<HTMLUListElement>

    //Make ELSE-item dots follow the mouse:
    const follow = (e: PointerEvent) => {
        const eyes = [...document.querySelectorAll<HTMLSpanElement>('.inner')]
        if (eyes) {
            eyes.forEach(eye => {
                const rect = eye.getBoundingClientRect()
                const x = rect.left + rect.width / 2
                const y = rect.top + rect.height / 2
                const rotation = radianToAngle(e.clientX, e.clientY, x, y)
                eye.style.transform = `rotate(${rotation}deg)`
            })
        }
    }
    function radianToAngle(cx: number, cy: number, ex: number, ey: number) {
        const dy = ey - cy,
            dx = ex - cx,
            rad = Math.atan2(dy, dx),
            deg = rad * 180 / Math.PI
        return deg
    }
    useEventListener("mousemove", (e: PointerEvent) => {
        follow(e)
    })

    const lightTheme = useTheme()

    Draggable.isTouchDevice();

    const touchDevice = Draggable.isTouchDevice()

    const { windowHeight, windowWidth } = useWindowSize();

    const removeItem = (element: HTMLElement) => {
        if (!touchDevice) { //if not a touch device, remove item
            element.classList.add(styles.exitItem)
            setTimeout(() => {
                element.remove()
            }, 1000)
        } else {//if a touch device, activate animation on tap
            element.classList.add(styles.active)
            element.addEventListener('blur', () => {
                element.classList.remove(styles.active)
                element.removeEventListener('touchend', removeWithTouch)
            })
            setTimeout(() => {
                element.addEventListener('touchend', removeWithTouch) //remove item on second tap
            }, 100)
        }
    }

    const removeWithTouch = (e: TouchEvent) => {
        e.preventDefault();
        (e.target as HTMLElement).classList.add(styles.exitItem)
        setTimeout(() => {
            (e.target as HTMLElement).remove()
        }, 1000)
    }

    const itemArray: itemProps[] = []
    const spanArray: itemProps[] = [] //Contact page

    const [values, setValues] = useSessionStorage<itemProps[]>("HeroArray", [
        { i: 1, e: 3.274, size: 10, color: "var(--color-secondary-7)" },
        { i: 2, e: 5.044, size: 11, color: "var(--color-primary-8)" },
        { i: 3, e: 1.886, size: 9, color: "var(--color-primary-6)" },
        { i: 4, e: 4.966, size: 6, color: "var(--color-primary-6)" },
        { i: 5, e: 1.621, size: 9, color: "var(--color-secondary-2)" },
        { i: 6, e: 3.489, size: 11, color: "var(--color-primary-9)" },
        { i: 7, e: 3.790, size: 11, color: "var(--color-secondary-5)" },
        { i: 8, e: 8.365, size: 4, color: "var(--color-secondary-2)" },
        { i: 9, e: 7.846, size: 11, color: "var(--color-primary-7)" },
        { i: 10, e: 4.121, size: 11, color: "var(--color-primary-9)" }
    ])

    const initialAmount = 10
    const [amount, setAmount] = useState<number>(initialAmount)

    const handleReset = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        amount === initialAmount ? setAmount(initialAmount + 1) : setAmount(initialAmount)
    }

    const setupItems: itemProps[] = useMemo(() => {
        for (let i: number = 0; i <= amount; i++) {
            const number = Math.ceil(useRandomMinMax(0.1, 2))
            let colorSwitch: string
            switch (number) {
                case 1:
                    colorSwitch =
                        `var(--color-secondary-${Math.round(useRandomMinMax(10, 13))})`
                    break;
                case 2:
                    colorSwitch =
                        `var(--color-primary-${Math.round(useRandomMinMax(9, 14))})`
                    break;
                default:
                    colorSwitch =
                        `var(--color-primary-${Math.round(useRandomMinMax(9, 14))})`
            }
            const item: itemProps = {
                i: i,
                e: useRandomMinMax(1, 9),
                size: Math.round(useRandomMinMax(5, 12)),
                color: colorSwitch
            }
            //itemArray.push(item)
            if (i == 0) {
                setValues([])
            } else {
                setValues(prev => {
                    return [...prev, item]
                })
            }
        }
        return (values)
    }, [amount])


    const spans: itemProps[] = useMemo(() => {
        for (let i: number = 1; i <= 4; i++) {
            const span: itemProps = {
                i: i,
                e: useRandomMinMax(1, 9),
                size: i,
                color: 'hsla(0, 0%, 100%, 0.8)',
            }
            spanArray.push(span)
        }
        return (spanArray)
    }, [values])

    const ItemComponent: FC<{ array: itemProps[], location: string }> = useCallback(({ array, location }) => {
        //classname for various pages's hero section ul are with no spaces and lowercase, such as "todoapp" instead of "Todo App":
        const locale = location.replaceAll(' ', '').toLowerCase()
        {
            return (
                <ul
                    ref={ulRef}
                    id={`listbox`}
                    role="listbox"
                    aria-labelledby={`description`}
                    aria-activedescendant=""
                    className={`${styles[locale]} ${styles.herocontent}`} >
                    {array.map((item, index: number) => {

                        if (location == LOCATION.HOME) {
                            const dividedBy = 1.5;

                            const style: React.CSSProperties = {
                                position: 'absolute',
                                top: touchDevice ?
                                    `calc(3vh + calc(1vh * ${item.e} * ${item.e / 1.3}))` :
                                    `calc(3vh + calc(1vh * ${item.e} * ${item.e / 1.9}))`,
                                right: `calc(1% + calc(${item.i} * 1vw * ${item.e}))`,
                                width: windowWidth < windowHeight
                                    ? `${item.size / dividedBy}vh`
                                    : `${item.size / dividedBy}vw`,
                                height: windowWidth < windowHeight
                                    ? `${item.size / dividedBy}vh`
                                    : `${item.size / dividedBy}vw`,
                            };
                            const inner: React.CSSProperties = {
                                color: `${item.color}`,
                                ['--i' as string]: `${item.i}`,
                                ['--e' as string]: `${item.e}`,
                                ['--s' as string]: windowWidth < windowHeight
                                    ? `${item.size}vh`
                                    : `${item.size}vw`,
                                width: '100%',
                                height: '100%',
                                minWidth: `20px`,
                                minHeight: `20px`,
                                borderRadius: '3px',
                                opacity: `${item.size > 6
                                    ? `1`
                                    : `0.${Math.ceil(item.size + 3)}`
                                    }`
                                ,

                            };

                            return (

                                // HOME WELCOME

                                <li key={`${item.color}${index}`}
                                    id={`shape${index + 1}`}
                                    className={`${styles.item} ${styles[locale]} ${styles.geometric} 
                                ${windowHeight < windowWidth
                                            ? styles.wide
                                            : styles.tall
                                        }`}
                                    style={style}
                                    role={'option'}
                                    tabIndex={0}
                                    onFocus={e => {
                                        ulRef.current?.setAttribute("aria-activedescendant", `${e.target.id}`)
                                    }}
                                    onBlurCapture={e => {
                                        ulRef.current?.setAttribute("aria-activedescendant", '')
                                    }}
                                    onMouseDown={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onTouchStart={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onPointerDown={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onKeyDown={e => {
                                        switch (e.key) {
                                            case 'Enter':
                                            case 'Space':
                                                removeItem(e.target as HTMLElement)
                                                break;
                                            case 'Escape':
                                                if (resetButton.current) resetButton.current.focus()
                                        }
                                    }}
                                >
                                    <div style={inner}>
                                        {spanArray.map((span, index) => {
                                            const style: React.CSSProperties = {
                                                position: 'absolute',
                                                borderRadius: '3px',
                                                color: `${item.color}`,
                                                ['--color' as string]: `${span.color}`,
                                                ['--i' as string]: `${item.i}`,
                                                ['--e' as string]: `${item.e}`,
                                                ['--s' as string]: `${item.size}`,
                                                ['--number' as string]: `${index}`,
                                            };
                                            return <span key={`${item.i}-${index}`} style={style}><label className='screen-reader-text'>shape {index + 1}</label></span>
                                        })}
                                    </div>

                                </li>
                            )

                        } else if (location == LOCATION.ABOUT) {

                            const style: React.CSSProperties = {
                                position: 'absolute',
                                top: `calc(3vh + calc(1vh * ${item.e} * ${item.e / 2}))`,
                                right: `calc(2% + ${item.i / 1.2} * 1vw * ${item.e})`,
                                backgroundColor: `transparent`,
                                color: `${item.color}`,
                                ['--i' as string]: `${item.i}`,
                                ['--e' as string]: `${item.e}`,
                                ['--s' as string]: windowWidth < windowHeight
                                    ? `${item.size}vh`
                                    : `${item.size}vw`,
                                width: windowWidth < windowHeight
                                    ? `${item.size}vh`
                                    : `${item.size}vw`,
                                height: windowWidth < windowHeight
                                    ? `${item.size}vh`
                                    : `${item.size}vw`,
                                ['--s2' as string]: item.size,
                                maxHeight: '200px',
                                maxWidth: '200px',
                                minHeight: '40px',
                                minWidth: '40px',
                                borderRadius: '65% 65% 70% 60% / 60% 70% 60% 65%',
                                opacity: `
                                ${lightTheme
                                        ? `0.${item.size > 8
                                            ? 99
                                            : Math.ceil(item.size + 1)}`
                                        : `0.${item.size > 9
                                            ? 99
                                            : Math.ceil(item.size)}`
                                    }`,
                            };

                            return (
                                //ABOUT
                                <li key={`${item.color}${index}`} className={`${styles.item} ${styles.about} ${styles.bubbles} ${windowHeight < windowWidth ? styles.wide : styles.tall}`} style={style}
                                    id={`bubble${index + 1}`}
                                    role={'option'}
                                    tabIndex={0}
                                    onFocus={e => {
                                        ulRef.current?.setAttribute("aria-activedescendant", `${e.target.id}`)
                                    }}
                                    onBlurCapture={e => {
                                        ulRef.current?.setAttribute("aria-activedescendant", '')
                                    }}
                                    onPointerEnter={e => {
                                        movingItem(e)
                                    }}
                                    onMouseDown={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onTouchStart={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onPointerDown={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onKeyDown={e => {
                                        switch (e.key) {
                                            case 'Enter':
                                            case 'Space':
                                                removeItem(e.target as HTMLElement)
                                                break;
                                            case 'Escape':
                                                if (resetButton.current) resetButton.current.focus()
                                        }
                                    }}
                                ><span><label className='screen-reader-text'>bubble {index + 1}</label></span></li>
                            )
                        } else if
                            (location === LOCATION.CONTACT ||
                            location === LOCATION.FORM) {

                            // CONTACT
                            const style: React.CSSProperties = {
                                position: 'absolute',
                                top: `calc(3vh + 1.1vh * ${item.size - 2} * ${item.e / 2})`,
                                right: `calc(2% + ${item.e / 1.5} * 1vw * ${item.e})`,
                                backgroundColor: `transparent`,
                                color: `${item.color}`,
                                ['--i' as string]: `${item.i}`,
                                ['--e' as string]: `${item.e}`,
                                ['--s2' as string]: `${item.size}`,
                                ['--s' as string]: windowWidth < windowHeight
                                    ? `${item.size}vh`
                                    : `${item.size}vw`,
                                width: windowWidth < windowHeight
                                    ? `calc(${item.size - 1} * 0.8vh)`
                                    : `calc(${item.size - 1} * 0.8vw)`,
                                height: windowWidth < windowHeight
                                    ? `calc(${item.size - 1} * 0.8vh)`
                                    : `calc(${item.size - 1} * 0.8vw)`,
                                minHeight: '40px',
                                minWidth: '40px',
                                maxHeight: '80px',
                                maxWidth: '80px',
                                borderRadius: '50%',
                            };
                            const styleInner: React.CSSProperties = {
                                position: 'absolute',
                                top: `0`,
                                right: `0`,
                                backgroundColor: `transparent`,
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                opacity: `
                                ${lightTheme
                                        ? `0.${item.size > 8
                                            ? 99
                                            : Math.ceil(item.size + 1)}`
                                        : `0.${item.size > 9
                                            ? 99
                                            : Math.ceil(item.size)}`
                                    }`,
                            };

                            return (

                                //CONTACT

                                <li key={`${item.color}${index}`}
                                    id={`eye${index + 1}`}
                                    className={`${styles.item} ${styles.eyes} ${styles[locale]} 
                                ${windowHeight < windowWidth
                                            ? styles.wide
                                            : styles.tall
                                        }`}
                                    style={style}
                                    role={'option'}
                                    tabIndex={0}
                                    onFocus={e => {
                                        ulRef.current?.setAttribute("aria-activedescendant", `${e.target.id}`)
                                    }}
                                    onBlurCapture={e => {
                                        ulRef.current?.setAttribute("aria-activedescendant", '')
                                    }}
                                    onPointerEnter={e => movingItem(e)}
                                    // onPointerEnter={e => addDirectionClass(e)}
                                    onPointerCancel={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onMouseDown={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onTouchStart={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onPointerDown={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onKeyDown={e => {
                                        switch (e.key) {
                                            case 'Enter':
                                            case 'Space':
                                                e.preventDefault()
                                                removeItem(e.target as HTMLElement)
                                                break;
                                            case 'Escape':
                                                if (resetButton.current) resetButton.current.focus()
                                        }
                                    }}
                                ><div style={styleInner} className={`inner ${styles.inner}`}><span className='else-eye'><label className='screen-reader-text'>eye {index + 1}</label></span></div></li>
                            )
                        } else if (
                            location == LOCATION.PORTFOLIO ||
                            location == LOCATION.BLOBAPP ||
                            location == LOCATION.DND
                        ) {
                            const style: React.CSSProperties = {
                                position: 'absolute',
                                top: `calc( ${item.i} * 1vh  * ${item.size / 2.4})`,
                                right: `calc(2% + ${item.i * item.e} * 1vw )`,
                                backgroundColor: `${item.color}`,
                                color: `${item.color}`,//for currentColor
                                ['--i' as string]: `${item.i}`,
                                ['--e' as string]: `${item.e}`,
                                ['--s' as string]: windowWidth < windowHeight
                                    ? `${item.size}vh`
                                    : `${item.size}vw`,
                                width: windowWidth < windowHeight
                                    ? `calc(var(--i) * 1vh)`
                                    : `calc(var(--i) * 1vw)`,
                                height: windowWidth < windowHeight
                                    ? `calc(var(--i) * 1vh)`
                                    : `calc(var(--i) * 1vw)`,
                                minWidth: `70px`,
                                minHeight: `70px`,
                                maxWidth: `160px`,
                                maxHeight: `160px`,
                                borderRadius: '50%',
                                opacity: `1`,
                                filter: 'blur(30px)'
                            };

                            return (

                                //BLOBS

                                <li
                                    key={`${item.color}${index}`}
                                    id={`blob${index + 1}`}
                                    className={`${styles.item} ${styles[locale]} ${styles.portfolio} 
                                ${windowHeight < windowWidth
                                            ? styles.wide
                                            : styles.tall}`}
                                    style={style}
                                    draggable={true}
                                    tabIndex={0}
                                    role={'option'}
                                    onMouseDown={e => {
                                        Draggable.start(e);
                                        (e.target as HTMLLIElement).classList.add(styles.drag)
                                    }}
                                    onMouseMove={e => {
                                        Draggable.movement(e)
                                    }}
                                    onMouseUp={e => {
                                        Draggable.stopMovementCheck(e);
                                        (e.target as HTMLLIElement).classList.remove(styles.drag)
                                    }}
                                    onMouseLeave={e => {
                                        Draggable.stopMoving(e);
                                        (e.target as HTMLLIElement).classList.remove(styles.drag)
                                    }}
                                    onTouchStart={e => {
                                        Draggable.start(e)
                                    }}
                                    onTouchMove={e => {
                                        Draggable.movement(e)
                                    }}
                                    onTouchEnd={e => {
                                        Draggable.stopMovementCheck(e)
                                    }}
                                    onWheel={e => {
                                        Draggable.wheel(e.target as HTMLElement)
                                    }}
                                    onFocus={e => {
                                        Draggable.focused(e.target)
                                        ulRef.current?.setAttribute("aria-activedescendant", `${e.target.id}`)
                                    }}
                                    onBlurCapture={e => {
                                        Draggable.blurred(e.target)
                                        ulRef.current?.setAttribute("aria-activedescendant", '')
                                    }}
                                    onKeyDown={e => {
                                        Draggable.keyDown(e, e.target as HTMLElement)

                                        switch (e.key) {
                                            case 'Escape':
                                                if (resetButton.current) resetButton.current.focus()
                                        }
                                    }}

                                ><span><label className='screen-reader-text'>blob {index + 1}</label></span></li>
                            )
                        }
                        else {

                            //ELSE
                            const style: React.CSSProperties = {
                                position: 'absolute',
                                top: `calc(3vh + 1.1vh * ${item.size - 2} * ${item.e / 2})`,
                                right: `calc(2% + ${item.e / 1.5} * 1vw * ${item.e})`,
                                backgroundColor: `transparent`,
                                color: `${item.color}`,
                                ['--i' as string]: `${item.i}`,
                                ['--e' as string]: `${item.e}`,
                                ['--s2' as string]: `${item.size}`,
                                ['--s' as string]: windowWidth < windowHeight
                                    ? `${item.size}vh`
                                    : `${item.size}vw`,
                                width: windowWidth < windowHeight
                                    ? `calc(${item.size - 2} * 0.8vh)`
                                    : `calc(${item.size - 2} * 0.8vw)`,
                                height: windowWidth < windowHeight
                                    ? `calc(${item.size - 2} * 0.8vh)`
                                    : `calc(${item.size - 2} * 0.8vw)`,
                                minHeight: '40px',
                                minWidth: '40px',
                                maxHeight: '90px',
                                maxWidth: '90px',
                                borderRadius: '65% 65% 70% 60% / 60% 70% 60% 65%',
                            };
                            const styleInner: React.CSSProperties = {
                                position: 'absolute',
                                top: `0`,
                                right: `0`,
                                backgroundColor: `transparent`,
                                width: '100%',
                                height: '100%',
                                borderRadius: '65% 65% 70% 60% / 60% 70% 60% 65%',
                                opacity: `0.${item.size > 6
                                    ? 99
                                    : Math.ceil(item.size + 3)}
                                    }`,
                            };

                            return (

                                //ELSE

                                <li key={`${item.color}${index}`}
                                    id={`eye${index + 1}`}
                                    className={`${styles.item} ${styles.eyes} ${styles[locale]} 
                                ${windowHeight < windowWidth
                                            ? styles.wide
                                            : styles.tall
                                        }`}
                                    style={style}
                                    role={'option'}
                                    tabIndex={0}
                                    onFocus={e => {
                                        ulRef.current?.setAttribute("aria-activedescendant", `${e.target.id}`)
                                    }}
                                    onBlurCapture={e => {
                                        ulRef.current?.setAttribute("aria-activedescendant", '')
                                    }}
                                    onPointerEnter={e => movingItem(e)}
                                    // onPointerEnter={e => addDirectionClass(e)}
                                    onPointerCancel={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onMouseDown={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onTouchStart={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onPointerDown={e => {
                                        removeItem(e.target as HTMLElement)
                                    }}
                                    onKeyDown={e => {
                                        switch (e.key) {
                                            case 'Enter':
                                            case 'Space':
                                                e.preventDefault()
                                                removeItem(e.target as HTMLElement)
                                                break;
                                            case 'Escape':
                                                if (resetButton.current) resetButton.current.focus()
                                        }
                                    }}
                                ><div style={styleInner} className={`inner ${styles.inner}`}><span className='else-eye'><label className='screen-reader-text'>eye {index + 1}</label></span></div></li>
                            )
                        }
                    })}

                    <svg className="filter">
                        <filter id="svgfilter">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                            <feColorMatrix values="
                                1 0 0 0 0 
                                0 1 0 0 0 
                                0 0 1 0 0
                                0 0 0 30 -11 
                                " >
                            </feColorMatrix>
                        </filter>
                    </svg>
                </ul>
            )
        }
    }, [values])



    return (
        <div className={`
        ${lightTheme ? styles.light : ''} 
        ${touchDevice ? styles.touch : ''} 
        hero ${styles.hero} ${styles[heading]}`}>
            <h1><span data-text={heading}>{heading}</span></h1>
            <p>{text}</p>
            <label id='description' className='screen-reader-text'>Hero section with interactive elements</label>
            <ItemComponent array={setupItems} location={heading} />
            <div className={styles.bottom} >
                <button
                    ref={resetButton}
                    type="button" onClick={handleReset}><span>Reset</span></button>
            </div>
        </div>
    )
}



