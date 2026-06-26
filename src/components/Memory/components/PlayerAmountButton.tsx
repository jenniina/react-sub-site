import { FC } from 'react'
import styles from '../memory.module.css'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import ButtonUnavailableAction from '../../ButtonUnavailableAction/ButtonUnavailableAction'

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
    <ButtonUnavailableAction
      className={`tooltip-wrap ${styles['player-button']} ${
        isActive ? styles.active : ''
      }`}
      unavailable={isActive}
      unavailableReason={isActive ? t('AlreadySelected') : ''}
      onClick={onClick}
    >
      <span>{value}</span>
      <span className="tooltip above narrow2">
        {Number(value) > 1 ? t('Duet') : t('Solo')}
      </span>
    </ButtonUnavailableAction>
  )
}

export default PlayerAmountButton
