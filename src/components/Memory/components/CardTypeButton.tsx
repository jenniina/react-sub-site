import { FC } from 'react'
import styles from '../memory.module.css'
import { CardType, CardTypeOptions } from '../../../types/memory'
import Icon from '../../Icon/Icon'

interface CardTypeButtonProps {
  option: CardTypeOptions
  isActive: boolean
  onClick: () => void
}

const CardTypeButton: FC<CardTypeButtonProps> = ({
  option,
  isActive,
  onClick,
}) => {
  const getCardTypeIcon = (value: CardType) => {
    switch (value) {
      case CardType.icons:
        return <Icon lib="md" name="MdInsertEmoticon" />
      case CardType.numbers:
        return <Icon lib="md" name="Md123" />
      case CardType.letters:
        return <Icon lib="md" name="MdAbc" />
      default:
        return null
    }
  }
  return (
    <button
      className={`tooltip-wrap ${isActive ? `${styles.active} grayer` : ''}`}
      onClick={onClick}
      disabled={isActive}
      aria-label={option.label}
    >
      {getCardTypeIcon(option.value)}
      <span className="tooltip above narrow2 space">{option.label}</span>
    </button>
  )
}

export default CardTypeButton
