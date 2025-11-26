import { FC } from 'react'
import styles from '../memory.module.css'
import { useLanguageContext } from '../../../contexts/LanguageContext'

interface PlayerAmountButtonProps {
  value: number
  isActive: boolean
  onClick: () => void
}

const PlayerAmountButton: FC<PlayerAmountButtonProps> = ({
  value,
  isActive,
  onClick,
}) => {
  const { t } = useLanguageContext()

  return (
    <button
      className={`tooltip-wrap ${styles['player-button']} ${
        isActive ? styles.active : ''
      }`}
      disabled={isActive}
      onClick={onClick}
    >
      <span>{value}</span>
      <span className="tooltip above narrow2">
        {Number(value) > 1 ? t('Duet') : t('Solo')}
      </span>
    </button>
  )
}

export default PlayerAmountButton
