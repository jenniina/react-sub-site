import { FC } from 'react'
import styles from '../memory.module.css'

interface PlayerAmountButtonProps {
  value: number
  isActive: boolean
  onClick: () => void
}

const PlayerAmountButton: FC<PlayerAmountButtonProps> = ({
  value,
  isActive,
  onClick,
}) => (
  <button
    className={`${styles['player-button']} ${isActive ? styles.active : ''}`}
    disabled={isActive}
    onClick={onClick}
  >
    {value}
  </button>
)

export default PlayerAmountButton
