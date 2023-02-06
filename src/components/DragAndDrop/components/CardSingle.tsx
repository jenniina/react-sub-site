import { KeyboardEvent, MouseEvent, useState, useRef } from 'react'
import { Data, Status } from "../interfaces"
import styles from '../dragAndDrop.module.css'
import { MdOutlineDragIndicator } from 'react-icons/md'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface Props {
    status: Status,
    id: number,
    data: Data,
    index: number,
    handleDragging: (dragging: boolean) => void,
    handleUpdate: (id: number, status: Status, target?: number) => void,
    getTarget: (status: Status, target: number) => void
}
const types = { good: 'good', neutral: 'neutral', bad: 'bad' }

function CardSingle({ status, id, index, data, handleDragging, handleUpdate, getTarget }: Props) {

    const styleCard: React.CSSProperties = {
        backgroundColor: data?.color,
        padding: '0.5em 5%',
        color: data?.background == 'dark' ? "white" : "black",
        borderColor: data?.background == 'dark' ? "var(--color-gray-lighter)" : "var(--color-gray-dark)"
    };

    const [isOpen, setIsOpen] = useState(false)
    function toggleOpen() {
        setIsOpen(prev => !prev)
    }
    function closing() {
        setIsOpen(false);
    }
    const ref = useOutsideClick({ onOutsideClick: closing })

    //https://www.aurigait.com/blog/drag-and-drop-in-react/

    const dragItem = useRef<number>(0)
    const dragOverItem = useRef<number>(0);

    const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, position: number) => {
        e.preventDefault()
        getTarget(data?.status, position)
        dragOverItem.current = position;
    };
    const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        handleDragging(true)
        e.preventDefault()
    }

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, position: number) => {
        e.dataTransfer.setData('text', `${data?.id}`)
    }


    function containerUpdate(e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) {
        if (data)
            handleUpdate(data.id, (e.target as HTMLAnchorElement).textContent as Status)

    }
    function keyListen(e: KeyboardEvent<HTMLAnchorElement>) {
        switch (e.code) {
            case 'Enter':
            case 'Space':
                e.stopPropagation();
                e.preventDefault();
                if (data)
                    handleUpdate(data.id, (e.target as HTMLAnchorElement).textContent as Status);
                setIsOpen(prev => !prev);
                break
            case 'Escape':
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(false);
                break
        }
    }

    const handleUpAndDown = (e: KeyboardEvent<HTMLElement>, position: number) => {
        e.preventDefault()
        const previous = Number(((e.target as HTMLElement)?.previousElementSibling as HTMLLIElement)?.dataset.identity)
        const next = Number(((e.target as HTMLElement)?.nextElementSibling as HTMLLIElement)?.dataset.identity)
        switch (e.key) {
            case 'ArrowUp':
                if (data && previous)
                    handleUpdate(position, data.status, previous);
                break
            case 'ArrowDown':
                if (data && next)
                    handleUpdate(position, data.status, next);
                break
            default:
                break
        }
    }


    return (
        <li
            ref={ref}
            draggable={'true'}
            onDragStart={(e) => handleDragStart(e, id)}
            onDragEnter={(e) => handleDragEnter(e, id)}
            onDragOver={e => handleDragOver(e)}
            role={'listitem'}
            title={data?.status}
            tabIndex={0}
            onKeyUp={e => handleUpAndDown(e, id)}
            data-identity={id}
        >
            <div style={styleCard} className={`${styles['card']}`}>
                <span className={styles.text}>
                    {data?.content}
                </span>
                <button aria-haspopup="true" onClick={toggleOpen}>
                    <MdOutlineDragIndicator aria-hidden="true" />
                    <span className='screen-reader-text' id={`instructions${id}`}>
                        choose destination
                    </span>
                </button>
                <nav className={isOpen ? `${styles.open} ${styles.blur}` : `${styles.blur}`} >
                    <ul role='listbox' aria-describedby={`instructions${id}`} aria-expanded={isOpen ? 'true' : 'false'}
                        className={styles[status]}
                    >
                        <li role='option'>
                            <a className={styles.good}
                                onClick={e => containerUpdate(e)}
                                onKeyDown={e => keyListen(e)}
                                tabIndex={0}
                            >{types.good}</a></li>{/* no spaces */}

                        <li role='option'>
                            <a className={styles.neutral}
                                onClick={e => containerUpdate(e)}
                                onKeyDown={e => keyListen(e)}
                                tabIndex={0}
                            >{types.neutral}</a></li>{/* no spaces */}
                        <li role='option'>
                            <a className={styles.bad}
                                onClick={e => containerUpdate(e)}
                                onKeyDown={e => keyListen(e)}
                                tabIndex={0}
                            >{types.bad}</a></li>{/* no spaces */}
                    </ul>
                </nav>
            </div>
        </li>
    )
}

export default CardSingle

