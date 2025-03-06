import { FC, useContext } from 'react'
import styles from '../memory.module.css'
import { ELanguages } from '../../../types'
import { LanguageContext } from '../../../contexts/LanguageContext'

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
}) => {
  const { t } = useContext(LanguageContext)!

  return (
    <button
      className={`tooltip-wrap ${styles['player-button']} ${
        isActive ? styles.active : ''
      }`}
      disabled={isActive}
      onClick={onClick}
    >
      <span>{value}</span>
      <span className='tooltip above narrow2'>
        {Number(value) > 1 ? t('Duet') : t('Solo')}
      </span>
    </button>
  )
}

export default PlayerAmountButton
