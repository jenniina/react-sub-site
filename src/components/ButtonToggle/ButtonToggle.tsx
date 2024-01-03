import { ChangeEventHandler, MouseEventHandler } from 'react'
import { useTheme } from '../../hooks/useTheme'
import styles from './buttonToggle.module.css'

interface Props {
  id: string | number
  on: string
  off: string
  name: string
  className?: string
  handleToggleChange:
    | ChangeEventHandler<HTMLInputElement>
    | MouseEventHandler<HTMLInputElement>
    | undefined
  isChecked: boolean
  equal?: boolean
  label: string
  hideLabel?: boolean
}
const ButtonToggle = ({
  id,
  on,
  off,
  name,
  className,
  isChecked,
  handleToggleChange,
  equal,
  label,
  hideLabel,
}: Props) => {
  const lightTheme = useTheme()

  return (
    <div
      className={`${styles['toggle-container']} toggle-container ${className}-container`}
    >
      <span
        className={`label ${hideLabel ? 'scr' : ''}`}
        aria-live='polite'
        onClick={handleToggleChange as MouseEventHandler<HTMLSpanElement>}
      >
        {label}
      </span>
      <label
        htmlFor={`toggle-${id}`}
        className={`${styles.toggle} toggle ${className} focus-within ${
          lightTheme ? styles.light : ''
        } ${equal ? styles.equal : ''}`}
      >
        <input
          type='checkbox'
          name={name}
          id={`toggle-${id}`}
          checked={isChecked}
          onChange={handleToggleChange as ChangeEventHandler<HTMLInputElement>}
          className='scr'
        />
        <span className={`${styles.slider} slider`}></span>
        <span className={`${styles.labels} labels`} data-on={on} data-off={off}></span>
      </label>
    </div>
  )
}

export default ButtonToggle
