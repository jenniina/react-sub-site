import React from 'react'
import styles from './css/confirm.module.css'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { CgUndo } from 'react-icons/cg'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

type ConfirmProps = {
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const Confirm: React.FC<ConfirmProps> = ({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  const { t } = useLanguageContext()
  return (
    <aside
      id={styles.confirm}
      className={styles.confirm}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-message"
    >
      <div className={styles.content}>
        <p className={styles.message} id="confirm-message">
          {message}
        </p>
        <div className={styles.buttons}>
          <button className={styles['confirm-btn']} onClick={onConfirm}>
            {confirmText ? confirmText : t('Confirm')}&nbsp;&nbsp;
            <IoMdCheckmarkCircleOutline />
          </button>
          <button className={styles['cancel-btn']} onClick={onCancel}>
            {cancelText ? cancelText : t('Cancel')}&nbsp;&nbsp;
            <CgUndo />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Confirm
