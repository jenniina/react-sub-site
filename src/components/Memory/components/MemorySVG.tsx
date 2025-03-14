import { FC } from 'react'

interface Props {
  size: string
}

const MemorySVG: FC<Props> = ({ size }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width={size}
      height={size}
      fill='currentColor'
      viewBox='0 0 12 12'
    >
      <path
        style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
        d='M1.5,3c0-0.8,0.7-1.5,1.5-1.5h1.1C5,1.5,5.6,2.2,5.6,3v1.1C5.6,5,5,5.6,4.1,5.6H3C2.2,5.6,1.5,5,1.5,4.1V3z M6.4,3c0-0.8,0.7-1.5,1.5-1.5H9c0.8,0,1.5,0.7,1.5,1.5v1.1C10.5,5,9.8,5.6,9,5.6H7.9C7,5.6,6.4,5,6.4,4.1V3z M1.5,7.9 C1.5,7,2.2,6.4,3,6.4h1.1C5,6.4,5.6,7,5.6,7.9V9c0,0.8-0.7,1.5-1.5,1.5H3c-0.8,0-1.5-0.7-1.5-1.5V7.9z M6.4,7.9C6.4,7,7,6.4,7.9,6.4 H9c0.8,0,1.5,0.7,1.5,1.5V9c0,0.8-0.7,1.5-1.5,1.5H7.9C7,10.5,6.4,9.8,6.4,9V7.9z M6.8,8c0-0.6,0.5-1.2,1.2-1.2h0.9 C9.5,6.8,10,7.4,10,8v0.9C10,9.5,9.5,10,8.9,10H8c-0.6,0-1.2-0.5-1.2-1.2V8z'
      />
    </svg>
  )
}

export default MemorySVG
