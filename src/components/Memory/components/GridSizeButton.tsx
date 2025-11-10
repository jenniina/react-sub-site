import React, { FC } from 'react'
import styles from '../memory.module.css'

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
}) => (
  <button
    className={`tooltip-wrap ${isActive ? `${styles.active} grayer` : ''}`}
    onClick={onClick}
    disabled={isActive}
  >
    <span>{option.icon}</span>
    <span className="tooltip above narrow2 space">{option.label}</span>
  </button>
)

export default GridSizeButton
