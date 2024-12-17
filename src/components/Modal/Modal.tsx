import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './modal.module.css'
import { useModal } from '../../hooks/useModal'
import { EClose, ELanguages } from '../../interfaces'

interface Props {
  language: ELanguages
}

const Modal: FC<Props> = ({ language }) => {
  const { modal } = useModal()
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    setClosed(false)
  }, [modal])

  if (modal === null || modal === undefined || closed) {
    return null
  }

  return (
    <div className={`${styles['modal-overlay']}`} onClick={() => setClosed(true)}>
      <div
        className={`${styles['modal-content']} ${modal.className ?? ''}`}
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-label={modal.title}
      >
        <button
          className={`${styles['close-button']} tooltip-wrap`}
          onClick={() => setClosed(true)}
        >
          <span aria-hidden='true'>&times;</span>
          <span className='scr'>{EClose[language]}</span>
          <span aria-hidden='true' className='tooltip below left narrow2'>
            {EClose[language]}
          </span>
        </button>
        {modal?.children}
      </div>
    </div>
  )
}

export default Modal
