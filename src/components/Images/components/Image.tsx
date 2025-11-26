import { FC } from 'react'
import styles from '../images.module.css'
import { ImageHit } from '../services/images'
import ImageModal from './ImageModal'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { sanitize } from '../../../utils'
import { ModalProps } from '../../../types'
import { TTextType } from '../Images'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { useConfirm } from '../../../contexts/ConfirmContext'
import { useIsClient, useWindow } from '../../../hooks/useSSR'

interface ImageProps {
  image: ImageHit
  show: ({ children, className }: ModalProps) => void
  searchTerm: string
  textType: TTextType
}

const Image: FC<ImageProps> = ({ image, show, searchTerm, textType }) => {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t } = useLanguageContext()
  const confirm = useConfirm()

  const dispatch = useAppDispatch()

  const handleDownload = async () => {
    if (!isClient || !windowObj) return

    if (await confirm({ message: t('Download') + '?' })) {
      const response = await fetch(image.largeImageURL, { mode: 'cors' })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      try {
        const blob = await response.blob()

        const url = URL.createObjectURL(blob)

        const fileExtensionMatch = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.exec(
          image.largeImageURL
        )
        const extension = fileExtensionMatch
          ? fileExtensionMatch[1].toLowerCase()
          : 'jpg'

        const link = document?.createElement('a')
        link.href = url
        link.download = `${sanitize(`${image.id}`)}-${sanitize(
          image.user
        )}.${extension}`
        link.target = '_blank'
        link.rel = 'noreferrer'
        document?.body.appendChild(link)
        link.click()
        document?.body.removeChild(link)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Download failed:', error)
        const errorMessage = error instanceof Error ? error.message : String(error)
        void dispatch(notify(`${t('Error')}: ${errorMessage}`, true, 5))
      }
    }
  }

  const handleShowModal = () => {
    show({
      title: image.tags,
      className: styles['image-modal'],
      children: (
        <ImageModal
          image={image}
          handleDownload={() => void handleDownload()}
          searchTerm={searchTerm}
          textType={textType}
        />
      ),
    })
  }

  return (
    <div key={image.id} className={`tooltip-wrap ${styles['image-wrap']}`}>
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          width: '100%',
        }}
        aria-label={t('ClickToOpenLargeImage')}
        onClick={handleShowModal}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleShowModal()
          }
        }}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          title={image.tags}
          loading="lazy"
          className={`${styles['image-small']}`}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        />
      </button>
      <span className="tooltip above narrow2">
        {t('ClickToOpenLargeImage')}
      </span>
      <p>
        <small>
          <a href={image.pageURL} target="_blank" rel="noreferrer">
            {t('ImagePage')} ({t('Author')}: {image.user})
          </a>
        </small>
      </p>
    </div>
  )
}

export default Image
