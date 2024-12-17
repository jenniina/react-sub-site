import { FC, ReactNode } from 'react'
import styles from '../images.module.css'
import {
  EClickToLoadImage,
  EClickToOpenLargeImage,
  EImagePage,
} from '../../../interfaces/images'
import { EAuthor } from '../../Jokes/interfaces'
import { ImageHit } from '../services/images'
import { EDownload, EError, ELanguages } from '../../../interfaces'
import useTooltip from '../../../hooks/useTooltip'
import ImageModal from './ImageModal'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { sanitize } from '../../../utils'
import { ModalProps } from '../../../interfaces'
import { TTextType } from '../Images'

interface ImageProps {
  image: ImageHit
  language: ELanguages
  show: ({ children, className }: ModalProps) => void
  searchTerm: string
  textType: TTextType
}

const Image: FC<ImageProps> = ({ image, language, show, searchTerm, textType }) => {
  const dispatch = useAppDispatch()

  const handleDownload = async () => {
    if (window.confirm(EDownload[language] + '?')) {
      const response = await fetch(image.largeImageURL, { mode: 'cors' })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      try {
        const blob = await response.blob()

        const url = window.URL.createObjectURL(blob)

        const fileExtensionMatch = image.largeImageURL.match(
          /\.(jpg|jpeg|png|gif|bmp|webp)$/i
        )
        const extension = fileExtensionMatch ? fileExtensionMatch[1].toLowerCase() : 'jpg'

        const link = document.createElement('a')
        link.href = url
        link.download = `${sanitize(`${image.id}`)}-${sanitize(image.user)}.${extension}`
        link.target = '_blank'
        link.rel = 'noreferrer'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Download failed:', error)
        dispatch(notify(`${EError[language]}: ${error}`, true, 5))
      }
    }
  }

  return (
    <div key={image.id} className={`tooltip-wrap ${styles['image-wrap']}`}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        title={image.tags}
        loading='lazy'
        className={`${styles['image-small']}`}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
        onClick={() => {
          show({
            title: image.tags,
            className: styles['image-modal'],
            children: (
              <ImageModal
                image={image}
                language={language}
                handleDownload={handleDownload}
                searchTerm={searchTerm}
                textType={textType}
              />
            ),
          })
        }}
      />
      <span className='tooltip above narrow2'>{EClickToOpenLargeImage[language]}</span>
      <p>
        <small>
          <a href={image.pageURL} target='_blank' rel='noreferrer'>
            {EImagePage[language]} ({EAuthor[language]}: {image.user})
          </a>
        </small>
      </p>
    </div>
  )
}

export default Image
