import { useState, useMemo } from 'react'
import { useDragAndDrop } from './hooks/useDragAndDrop'
import { Status, Data, Background } from './interfaces'
import { CardsContainer } from './components/CardsContainer'
import styles from './dragAndDrop.module.css'
import useRandomMinMax from '../../hooks/useRandomMinMax'
import { ELanguages } from '../../interfaces'

const typesItem: Status[] = ['good', 'neutral', 'bad']
const backgroundLightness: Background[] = ['light', 'dark']

export const DragAndDrop = ({ language }: { language: ELanguages }) => {
  let color = 'lemonchiffon'
  let state: Status = 'neutral'
  let background: Background
  const amount = 9 //amount of cards, add more cases as needed in SetTheData

  const array: Data[] = []

  const setTheData = useMemo(() => {
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
          state = 'good'
          break
        case 2:
          state = 'neutral'
          break
        case 3:
          state = 'bad'
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

  const modifiedData = setTheData.sort((a, b) => (a.status > b.status ? 1 : -1))

  const [data, setData] = useState<Data[]>(modifiedData)

  const {
    isDragging,
    listItemsBad,
    listItemsGood,
    listItemsNeutral,
    handleDragging,
    handleUpdate,
  } = useDragAndDrop(data)

  return (
    <div className={styles.grid}>
      {typesItem.map((container) => (
        <CardsContainer
          language={language}
          itemsGood={listItemsGood}
          itemsNeutral={listItemsNeutral}
          itemsBad={listItemsBad}
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
