import { useState, useMemo, useReducer, useCallback, useEffect } from "react"
import { Data, Status } from "../interfaces"
import useLocalStorage from "../../../hooks/useStorage"
import '../dragAndDrop.module.css'

export const useDragAndDrop = (initialState: Data[]) => {

    const LOCATION = {
        GOOD: 'good',
        NEUTRAL: 'neutral',
        BAD: 'bad'
    }


    const goodItems = initialState.filter((item) => item?.status === LOCATION.GOOD);
    const neutralItems = initialState.filter((item) => item?.status === LOCATION.NEUTRAL);
    const badItems = initialState.filter((item) => item?.status === LOCATION.BAD);

    const storageName = "DnD-All"
    const [isDragging, setIsDragging] = useState(false)

    const [listItemsGood, setListItemsGood, removeListItemsGood] = useLocalStorage<Data[]>("DnD-Good", goodItems)
    const [listItemsNeutral, setListItemsNeutral, removeListItemsNeutral] = useLocalStorage<Data[]>("DnD-Neutral", neutralItems)
    const [listItemsBad, setListItemsBad, removeListItemsBad] = useLocalStorage<Data[]>("DnD-Bad", badItems)

    const handleUpdate = useCallback((id: number, status: Status, target?: number) => {
        let cardGood = listItemsGood?.find(item => item?.id === id)
        let cardNeutral = listItemsNeutral?.find(item => item?.id === id)
        let cardBad = listItemsBad?.find(item => item?.id === id)

        let card = cardGood || cardNeutral || cardBad

        let targetGood = listItemsGood?.find(item => item?.id === target)
        let targetNeutral = listItemsNeutral?.find(item => item?.id === target)
        let targetBad = listItemsBad?.find(item => item?.id === target)

        let targetCard = targetGood || targetNeutral || targetBad


        //if the status and card status do not match (moving from one container to another):

        if (card && card.status !== status) {

            if (status === LOCATION.GOOD) {
                card.status = status
                let targetIndex = listItemsGood?.findIndex(item => item?.id == target)

                if (targetIndex == 0 || targetIndex == -1)
                    setListItemsGood(prev => ([
                        card!,
                        ...prev
                    ]))
                else if (listItemsGood && targetIndex == listItemsGood.length - 1)
                    setListItemsGood(prev => ([
                        ...prev,
                        card!
                    ]))
                else
                    setListItemsGood(prev => ([
                        ...prev.slice(0, targetIndex),
                        card!,
                        ...prev.slice(targetIndex, prev.length)
                    ]))
                setListItemsNeutral(prev => ([...prev.filter(item => item?.id !== id)]))
                setListItemsBad(prev => ([...prev.filter(item => item?.id !== id)]))
            }

            else if (status === LOCATION.BAD) {
                card.status = status
                let targetIndex = listItemsBad?.findIndex(item => item?.id == target)

                if (targetIndex == 0 || targetIndex == -1)
                    setListItemsBad(prev => ([
                        card!,
                        ...prev
                    ]))
                else if (targetIndex == listItemsBad.length - 1) {

                    setListItemsBad(prev => ([
                        ...prev,
                        card!
                    ]))
                } else
                    setListItemsBad(prev => ([
                        ...prev.slice(0, targetIndex),
                        card!,
                        ...prev.slice(targetIndex, prev.length)
                    ]))
                setListItemsGood(prev => ([...prev.filter(item => item?.id !== id)]))
                setListItemsNeutral(prev => ([...prev.filter(item => item?.id !== id)]))
            }

            else if (status === LOCATION.NEUTRAL) {
                card.status = status
                let targetIndex = listItemsNeutral?.findIndex(item => item?.id == target)

                if (targetIndex == 0 || targetIndex == -1)
                    setListItemsNeutral(prev => ([
                        card!,
                        ...prev
                    ]))
                else if (targetIndex == listItemsNeutral.length - 1)
                    setListItemsNeutral(prev => ([
                        ...prev,
                        card!,
                    ]))
                else
                    setListItemsNeutral(prev => ([
                        ...prev.slice(0, targetIndex),
                        card!,
                        ...prev.slice(targetIndex, prev.length)
                    ]))
                setListItemsGood(prev => ([...prev.filter(item => item?.id !== id)]))
                setListItemsBad(prev => ([...prev.filter(item => item?.id !== id)]))
            }
        }


        //if the status and card status match (moving a card within a container):

        else if (targetCard && card && card.status === status) {

            if (targetCard.status === LOCATION.GOOD && cardGood) {
                let cardIndex = listItemsGood?.findIndex(item => item?.id == id)
                let targetIndex = listItemsGood?.findIndex(item => item?.id == target)

                if (targetIndex == 0)
                    setListItemsGood(prev => ([
                        cardGood!,
                        ...prev.filter(item => item?.id !== id)
                    ]))
                else if ((targetIndex == listItemsGood.length - 2 && targetIndex < cardIndex))
                    setListItemsGood(prev => ([
                        ...prev.slice(0, targetIndex).filter(item => item?.id !== id),
                        cardGood!,
                        ...prev.slice(targetIndex, prev.length).filter(item => item?.id !== id)
                    ]))
                else if (targetIndex == 1 && cardIndex !== 0)
                    setListItemsGood(prev => ([
                        ...prev.slice(0, targetIndex).filter(item => item?.id !== id),
                        cardGood!,
                        ...prev.slice(targetIndex, prev.length).filter(item => item?.id !== id)
                    ]))
                else
                    setListItemsGood(prev => ([
                        ...prev.slice(0, targetIndex + 1).filter(item => item?.id !== id),
                        cardGood!,
                        ...prev.slice(targetIndex + 1, prev.length).filter(item => item?.id !== id)
                    ]))
            }

            else if (targetCard.status === LOCATION.BAD && cardBad) {
                let cardIndex = listItemsBad?.findIndex(item => item?.id == id)
                let targetIndex = listItemsBad?.findIndex(item => item?.id == target)

                if (targetIndex == 0)
                    setListItemsBad(prev => ([
                        cardBad!,
                        ...prev.filter(item => item?.id !== id)
                    ]))
                else if (targetIndex == listItemsBad.length - 2 && targetIndex < cardIndex)
                    setListItemsBad(prev => ([
                        ...prev.slice(0, targetIndex).filter(item => item?.id !== id),
                        cardBad!,
                        ...prev.slice(targetIndex, prev.length).filter(item => item?.id !== id)
                    ]))
                else if (targetIndex == 1 && cardIndex !== 0)
                    setListItemsBad(prev => ([
                        ...prev.slice(0, targetIndex).filter(item => item?.id !== id),
                        cardBad!,
                        ...prev.slice(targetIndex, prev.length).filter(item => item?.id !== id)
                    ]))
                else
                    setListItemsBad(prev => ([
                        ...prev.slice(0, targetIndex + 1).filter(item => item?.id !== id),
                        cardBad!,
                        ...prev.slice(targetIndex + 1, prev.length).filter(item => item?.id !== id)
                    ]))
            }

            else if (targetCard.status === LOCATION.NEUTRAL && cardNeutral) {

                let cardIndex = listItemsNeutral?.findIndex(item => item?.id == id)
                let targetIndex = listItemsNeutral?.findIndex(item => item?.id == target)

                if (targetIndex == 0)
                    setListItemsNeutral(prev => ([
                        cardNeutral!,
                        ...prev.filter(item => item?.id !== id)
                    ]))

                else if (targetIndex == listItemsNeutral.length - 2 && targetIndex < cardIndex)
                    setListItemsNeutral(prev => ([
                        ...prev.slice(0, targetIndex).filter(item => item?.id !== id),
                        cardNeutral!,
                        ...prev.slice(targetIndex, prev.length).filter(item => item?.id !== id)
                    ]))
                else if (targetIndex == 1 && cardIndex !== 0)
                    setListItemsNeutral(prev => ([
                        ...prev.slice(0, targetIndex).filter(item => item?.id !== id),
                        cardNeutral!,
                        ...prev.slice(targetIndex, prev.length).filter(item => item?.id !== id)
                    ]))
                else
                    setListItemsNeutral(prev => ([
                        ...prev.slice(0, targetIndex + 1).filter(item => item?.id !== id),
                        cardNeutral!,
                        ...prev.slice(targetIndex + 1, prev.length).filter(item => item?.id !== id)
                    ]))
            }
        }
    }, [listItemsGood, listItemsBad, listItemsNeutral])

    const handleDragging = (dragging: boolean) => setIsDragging(dragging)

    return {
        isDragging,
        listItemsBad,
        listItemsGood,
        listItemsNeutral,
        handleUpdate,
        handleDragging,
    }
}