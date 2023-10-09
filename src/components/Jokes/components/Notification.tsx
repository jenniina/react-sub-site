import { useSelector } from 'react-redux'
import { ReducerProps } from '../interfaces'
import { useEffect, useState } from 'react'
import { EClose, ELanguages } from '../interfaces'

interface Props {
  language: ELanguages
}
const Notification = ({ language }: Props) => {
  const notification = useSelector((state: ReducerProps) => state.notification)
  const [closed, setClosed] = useState(false)
  const titleClose = EClose[language]

  useEffect(() => {
    setClosed(false)
  }, [notification])

  if (notification === null || closed) {
    return null
  }

  return (
    <div
      className={`notification ${notification.isError ? 'error' : ''}`}
      aria-live='polite'
    >
      <p>
        {notification.message}{' '}
        <button
          type='button'
          className='close'
          onClick={() => {
            setClosed(true)
          }}
        >
          <span>{titleClose}</span>
          <span aria-hidden='true' className='times'>
            &times;
          </span>
        </button>
      </p>
    </div>
  )
}

export default Notification
