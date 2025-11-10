import { useSelector } from 'react-redux'
import { ELanguages, ReducerProps } from '../../types'
import { useContext, useEffect, useState } from 'react'
import { useLanguageContext } from '../../contexts/LanguageContext'

interface Props {
  language: ELanguages
  className?: string
}
const Notification = ({ language = ELanguages.en, className }: Props) => {
  const { t } = useLanguageContext()

  const notification = useSelector((state: ReducerProps) => state.notification)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    setClosed(false)
  }, [notification])

  if (notification === null || closed) {
    return null
  }

  return (
    <div
      className={`notification ${notification.isError ? 'error' : ''}`}
      aria-live="assertive"
    >
      <p>
        {notification.message}{' '}
        <button
          type="button"
          className="close"
          onClick={() => {
            setClosed(true)
          }}
        >
          <span>{t('Close')}</span>
          <span aria-hidden="true" className="times">
            &times;
          </span>
        </button>
      </p>
    </div>
  )
}

export default Notification
