import React, { FC } from 'react'
import styles from '../memory.module.css'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import ButtonUnavailableAction from '../../ButtonUnavailableAction/ButtonUnavailableAction'

interface GridSizeOption {
  value: number
  icon: string | React.JSX.Element
  label: string
}

interface GridSizeButtonProps {
  option: GridSizeOption
  isActive: boolean
  onClick: () => void
}

const GridSizeButton: FC<GridSizeButtonProps> = ({
  option,
  isActive,
  onClick,
}) =>
  (() => {
    const { t } = useLanguageContext()

    return (
      <ButtonUnavailableAction
        className={`tooltip-wrap ${isActive ? `${styles.active} grayer` : ''}`}
        onClick={onClick}
        unavailable={isActive}
        unavailableReason={isActive ? t('AlreadySelected') : ''}
      >
        <span>{option.icon}</span>
        <span className="tooltip above narrow2 space">{option.label}</span>
      </ButtonUnavailableAction>
    )
  })()

export default GridSizeButton
