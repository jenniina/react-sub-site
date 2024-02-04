import { useState, useMemo } from 'react'
// import { useDragAndDrop } from './hooks/useDragAndDrop'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { Status, Data, Background } from './interfaces'
import { CardsContainer } from './components/CardsContainer'
import styles from './dragAndDrop.module.css'
import useRandomMinMax from '../../hooks/useRandomMinMax'
import { ELanguages } from '../../interfaces'
import useLocalStorage from '../../hooks/useStorage'

const typesItem: Status[] = ['good', 'neutral', 'bad']
const backgroundLightness: Background[] = ['light', 'dark']

export const DragAndDrop = ({ language }: { language: ELanguages }) => {
  let color = 'lemonchiffon'
  let state: Status = 'neutral'
  let background: Background
  const amount = 9 //amount of cards, add more cases as needed in SetTheData

  const array: Data[] = []

  const statuses: Status[] = ['good', 'neutral', 'bad']

  const storedData = statuses
    .map((status) => {
      const item = window.localStorage.getItem(`DnD-${status}`)
      return item ? JSON.parse(item) : []
    })
    .flat()

  const setTheData = useMemo(() => {
    // If data is already in localStorage, use that
    if (storedData.length > 0) {
      return storedData
    }

    // Otherwise, generate the data
    for (let i: number = 1; i <= amount; i++) {
      switch (i) {
        case 1:
          color = 'orchid'
          background = backgroundLightness[0]
          break
        case 2:
          color = 'lightgreen'
          background = backgroundLightness[0]
          break
        case 3:
          color = 'lightsalmon'
          background = backgroundLightness[0]
          break
        case 4:
          color = 'lightblue'
          background = backgroundLightness[0]
          break
        case 5:
          color = 'pink'
          background = backgroundLightness[0]
          break
        case 6:
          color = 'turquoise'
          background = backgroundLightness[0]
          break
        case 7:
          color = 'blue'
          background = backgroundLightness[1]
          break
        case 8:
          color = 'crimson'
          background = backgroundLightness[1]
          break
        case 9:
          color = 'red'
          background = backgroundLightness[0]
          break
        default:
          color = 'yellow'
          background = backgroundLightness[0]
      }
      //randomize the item status
      const number = Math.round(useRandomMinMax(0.1, 3))
      switch (number) {
        case 1:
          state = statuses[0]
          break
        case 2:
          state = statuses[1]
          break
        case 3:
          state = statuses[2]
          break
      }

      const item: Data = {
        id: i,
        content: color,
        color: color,
        status: state,
        background: background,
      }
      array.push(item)
    }
    return array
  }, [])

  //const modifiedData = setTheData
  //.sort((a, b) => (a.status > b.status ? 1 : -1))

  const { isDragging, listItemsByStatus, handleDragging, handleUpdate } = useDragAndDrop(
    setTheData,
    statuses
  )

  return (
    <div className={styles.grid}>
      {typesItem.map((container) => (
        <CardsContainer
          language={language}
          itemsByStatus={listItemsByStatus[container]?.items}
          status={container}
          key={container}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  )
}
