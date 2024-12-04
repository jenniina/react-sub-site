import React, { FC } from 'react'
import styles from '../memory.module.css'
import { CardType, CardTypeOptions } from '../../../interfaces/memory'
import { Md123, MdAbc, MdInsertEmoticon } from 'react-icons/md'

interface CardTypeButtonProps {
  option: CardTypeOptions
  isActive: boolean
  onClick: () => void
}

const CardTypeButton: FC<CardTypeButtonProps> = ({ option, isActive, onClick }) => {
  const getCardTypeIcon = (value: CardType) => {
    switch (value) {
      case CardType.icons:
        return <MdInsertEmoticon />
      case CardType.numbers:
        return <Md123 />
      case CardType.letters:
        return <MdAbc />
      default:
        return null
    }
  }
  return (
    <button
      className={`tooltip-wrap ${isActive ? `${styles.active} grayer` : ''}`}
      onClick={onClick}
      disabled={isActive}
    >
      {getCardTypeIcon(option.value)}
      <span className='tooltip above narrow2 space'>{option.label}</span>
    </button>
  )
}

export default CardTypeButton
