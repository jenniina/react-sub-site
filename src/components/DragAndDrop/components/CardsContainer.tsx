import { useState } from 'react'
import { Data, Status } from "../interfaces"
import CardSingle from "./CardSingle"
import { useTheme } from '../../../hooks/useTheme'
import styles from '../dragAndDrop.module.css'

interface Props {
    itemsGood: Data[]
    itemsNeutral: Data[]
    itemsBad: Data[]
    status: Status
    isDragging: boolean
    handleUpdate: (id: number, status: Status, target?: number) => void
    handleDragging: (dragging: boolean) => void
}

export const CardsContainer = ({ status, isDragging, handleDragging, handleUpdate, itemsGood = [], itemsNeutral = [], itemsBad = [] }: Props) => {

    const lightTheme = useTheme()

    const [theTarget, setTheTarget] = useState<number>(0)

    const getTarget = (status: Status, target: number) => {
        setTheTarget(target)
    }

    const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
        handleUpdate(+e.dataTransfer.getData('text'), status, theTarget)
        handleDragging(false)
    }

    const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => e.preventDefault()

    return (
        <div className={`${styles['cards-container']} ${isDragging ? styles['area-dragging'] : ''} ${lightTheme ? styles['light'] : ''}`}>
            <label htmlFor={status} >
                <span>{`${status}?`}</span>
            </label>
            <ul id={status}
                className={styles[status]}
                role={'list'}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {status === "good" ?
                    itemsGood.map((item, index) => (
                        <CardSingle
                            id={item.id}
                            index={index}
                            data={item}
                            status={status}
                            key={`${status}item${item.id}-${Date.now()}`}
                            handleDragging={handleDragging}
                            handleUpdate={handleUpdate}
                            getTarget={getTarget}
                        />

                    ))
                    : ''}
                {
                    status === "neutral" ?
                        itemsNeutral.map((item, index) => (
                            <CardSingle
                                id={item.id}
                                index={index}
                                data={item}
                                status={status}
                                key={`${status}item${item.id}-${Date.now()}`}
                                handleDragging={handleDragging}
                                handleUpdate={handleUpdate}
                                getTarget={getTarget}
                            />

                        ))
                        : ''
                }
                {
                    status === "bad" ?
                        itemsBad.map((item, index) => (
                            <CardSingle
                                id={item.id}
                                index={index}
                                data={item}
                                status={status}
                                key={`${status}item${item.id}-${Date.now()}`}
                                handleDragging={handleDragging}
                                handleUpdate={handleUpdate}
                                getTarget={getTarget}
                            />

                        ))
                        : ''
                }

            </ul>
        </div>
    )
}