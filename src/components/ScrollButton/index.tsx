import { FC } from 'react'
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'

const ScrollButton: FC<{
  styles: CSSModuleClasses
  name: string
  id: string
  direction: 'below' | 'above' | 'any'
}> = ({ styles, name, id, direction }) => {
  return (
    <button
      className={`${styles['scroll-button']}`}
      onClick={() => {
        document.getElementById(id)?.scrollIntoView()
      }}
    >
      {direction === 'above' && (
        <>
          <GoTriangleUp
            height='1.3rem'
            width='1.3rem'
            style={{ margin: '-0.4rem 0 -0.1rem' }}
          />
          <span>{name}</span>
        </>
      )}
      {direction === 'any' && <span>{name}</span>}
      {direction === 'below' && (
        <>
          <span>{name}</span>{' '}
          <GoTriangleDown
            height='1.3rem'
            width='1.3rem'
            style={{ margin: '-0.1rem 0 -0.4rem' }}
          />
        </>
      )}
    </button>
  )
}

export default ScrollButton
