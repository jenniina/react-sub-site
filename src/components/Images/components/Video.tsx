import { FC, useContext } from 'react'
import styles from '../images.module.css'
import { VideoHit } from '../services/images'
import { ELanguages } from '../../../types'
import VideoModal from './VideoModal'
import { ModalProps } from '../../../types'
import { TTextType } from '../Images'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { useConfirm } from '../../../contexts/ConfirmContext'
import { useIsClient, useWindow } from '../../../hooks/useSSR'

interface VideoProps {
  video: VideoHit
  language: ELanguages
  show: ({ children, className }: ModalProps) => void
  searchTerm: string
  textType: TTextType
}

const Video: FC<VideoProps> = ({
  video,
  language,
  show,
  searchTerm,
  textType,
}) => {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t } = useLanguageContext()
  const confirm = useConfirm()

  const handleDownload = async () => {
    if (!isClient || !windowObj) return

    if (await confirm({ message: `${t('Download') + '?'}` })) {
      const response = await fetch(video.videos.large.url, { mode: 'cors' })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const blob = await response.blob()

      const url = URL.createObjectURL(blob)

      const fileExtensionMatch = video.videos.large.url
        ? video.videos.large.url.match(/\.(mp4)$/i)
        : video.videos.medium.url.match(/\.(mp4)$/i)
      const extension = fileExtensionMatch
        ? fileExtensionMatch[1].toLowerCase()
        : 'mp4'

      const link = document?.createElement('a')
      link.href = url
      link.download = `video_${video.id}.${extension}`
      link.target = '_blank'
      link.rel = 'noreferrer'
      document?.body.appendChild(link)
      link.click()
      document?.body.removeChild(link)
    }
  }

  const handleShowModal = () => {
    show({
      title: video.tags,
      className: styles['video-modal'],
      children: (
        <VideoModal
          video={video}
          language={language}
          searchTerm={searchTerm}
          textType={textType}
          handleDownload={handleDownload}
        />
      ),
    })
  }

  return (
    <div key={video.id} className={`tooltip-wrap ${styles['video-wrap']}`}>
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          width: '100%',
        }}
        aria-label={t('ClickToOpenLargeVideo')}
        onClick={handleShowModal}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleShowModal()
          }
        }}
      >
        <img
          src={video.videos.small.thumbnail}
          alt={video.tags}
          className={`${styles['video-small']}`}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        />
      </button>
      <span className="tooltip above narrow2">
        {t('ClickToOpenLargeVideo')}
      </span>
      <p>
        <small>
          <a href={video.pageURL} target="_blank" rel="noreferrer">
            {t('VideoPage')} ({t('Author')}: {video.user})
          </a>
        </small>
      </p>
    </div>
  )
}

export default Video
