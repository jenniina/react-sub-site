import { FC, CSSProperties, memo, useEffect, useState } from 'react'
import styles from '../memory.module.css'
import { CardType, EStopGame } from '../../../interfaces/memory'
import useWindowSize from '../../../hooks/useWindowSize'
import { EFinish } from '../../../interfaces/quiz'
import { ELanguages } from '../../../interfaces'

interface Player {
  id: number
  name: string
  score: number
}

interface Card {
  id: number
  value: string | JSX.Element
}

interface GameGridProps {
  setGameStarted: (value: boolean) => void
  language: ELanguages
  gridSize: number
  cards: Card[]
  flippedCards: number[]
  flippedOverCards: number[]
  matchedCards: number[]
  cardType: {
    value: string
  }
  handleCardClick: (index: number) => void
  renderCardContent: (card: Card) => React.ReactNode
}

const GameGrid: FC<GameGridProps> = ({
  setGameStarted,
  language,
  gridSize,
  cards,
  flippedCards,
  flippedOverCards,
  matchedCards,
  cardType,
  handleCardClick,
  renderCardContent,
}) => {
  const { windowHeight, windowWidth } = useWindowSize()
  const size = `size${gridSize}`

  return (
    <>
      <div className={`${styles['grid-wrap']} ${styles[size]}`}>
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            ['--size' as string]: `${windowHeight > windowWidth ? 94 : 85}`,
            ['--amount' as string]: `${gridSize}`,
            ['--multiplier' as string]: `${windowHeight > windowWidth ? '1vw' : '1vh'}`,
          }}
        >
          {cards.map((card, index) => {
            const fontSize =
              cardType.value === CardType.icons
                ? windowHeight > windowWidth
                  ? `${50 / gridSize}vw`
                  : `${50 / gridSize}vh`
                : windowHeight > windowWidth
                ? `${40 / gridSize}vw`
                : `${40 / gridSize}vh`

            const cardStyle: CSSProperties = {
              ['--fontSize' as string]: fontSize,
            }

            return (
              <div
                key={card.id}
                style={cardStyle}
                className={`${styles.card} ${
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? styles.flipped
                    : ''
                } ${flippedOverCards.includes(index) ? styles['flipped-over'] : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className={styles.front}>{renderCardContent(card)}</div>
                <div className={styles.back}></div>
              </div>
            )
          })}
        </div>
      </div>
      <button
        className={styles.finish}
        type='button'
        onClick={() => {
          setGameStarted(false)
        }}
      >
        {EStopGame[language]}
      </button>
    </>
  )
}

export default memo(GameGrid)
