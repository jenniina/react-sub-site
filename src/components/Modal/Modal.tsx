import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './modal.module.css'
import { useModal } from '../../hooks/useModal'
import { EClose, ELanguages } from '../../interfaces'

interface Props {
  language: ELanguages
}

const Modal: FC<Props> = ({ language }) => {
  const { modal, closeModal } = useModal()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (modal) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement

      closeButtonRef.current?.focus()

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements =
            closeButtonRef.current?.parentElement?.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          if (!focusableElements || focusableElements.length === 0) {
            e.preventDefault()
            return
          }
          const firstElement = focusableElements?.[0] as HTMLElement
          const lastElement = focusableElements?.[
            focusableElements.length - 1
          ] as HTMLElement

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement?.focus()
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement?.focus()
            }
          }
        } else if (e.key === 'Escape') {
          handleClose()
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        if (previouslyFocusedElement.current) previouslyFocusedElement.current.focus()
        else document.body.focus()
      }
    }
  }, [modal, closeButtonRef.current])

  const handleClose = () => {
    closeModal()
    if (previouslyFocusedElement.current) previouslyFocusedElement.current.focus()
    else document.body.focus()
  }

  if (modal === null || modal === undefined || !modal.children) {
    return null
  }

  return (
    <div className={`${styles['modal-overlay']}`} onClick={handleClose}>
      <div
        className={`${styles['modal-content']} ${modal.className ?? ''}`}
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-label={modal.title}
      >
        <button
          ref={closeButtonRef}
          className={`${styles['close-button']} tooltip-wrap`}
          onClick={handleClose}
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
