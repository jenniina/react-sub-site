import { FC } from 'react'
import styles from '../memory.module.css'
import { EDuet, ESolo } from '../../../interfaces/memory'
import { ELanguages } from '../../../interfaces'

interface PlayerAmountButtonProps {
  language: ELanguages
  value: number
  isActive: boolean
  onClick: () => void
}

const PlayerAmountButton: FC<PlayerAmountButtonProps> = ({
  language,
  value,
  isActive,
  onClick,
}) => (
  <button
    className={`tooltip-wrap ${styles['player-button']} ${isActive ? styles.active : ''}`}
    disabled={isActive}
    onClick={onClick}
  >
    <span>{value}</span>
    <span className='tooltip above narrow2'>
      {Number(value) > 1 ? EDuet[language] : ESolo[language]}
    </span>
  </button>
)

export default PlayerAmountButton
