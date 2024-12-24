import { FC } from 'react'
import styles from '../../pages/css/about.module.css'
import { colorProps } from '../../pages/About'

const ColorComponent: FC<{ array: colorProps[] }> = ({ array }) => {
  return (
    <ul style={{ marginTop: '3em' }} className={`fullwidth1 ${styles['color-ul']}`}>
      {array.map((item, index: number) => {
        const itemStyle: React.CSSProperties = {
          backgroundColor: `${item.background}`,
          color:
            item.i < 13 || (item.i > 31 && item.i <= 40) || (item.i > 40 && item.i < 46)
              ? 'var(--color-primary-20)'
              : 'var(--color-primary-1)',
          ['--i' as string]: `${item.i}`,
          ['--e' as string]: `${item.e}`,
        }
        const spanStyle: React.CSSProperties = {
          ['--i' as string]: `${item.i}`,
          ['--e' as string]: `${item.e}`,
        }

        return (
          <li
            key={`${item.background}${index}`}
            className={styles.shape}
            style={itemStyle}
          >
            <span style={spanStyle}>{itemStyle.backgroundColor}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default ColorComponent
