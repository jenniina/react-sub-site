import { FC, ReactNode } from 'react'
import styles from '../images.module.css'
import { EClickToOpenLargeVideo, EVideoPage } from '../../../interfaces/images'
import { EAuthor } from '../../Jokes/interfaces'
import { VideoHit } from '../services/images'
import { ELanguages } from '../../../interfaces'
import VideoModal from './VideoModal'
import { ModalProps } from '../../../interfaces'
import { TTextType } from '../Images'

interface VideoProps {
  video: VideoHit
  language: ELanguages
  show: ({ children, className }: ModalProps) => void
  searchTerm: string
  textType: TTextType
}

const Video: FC<VideoProps> = ({ video, language, show, searchTerm, textType }) => {
  return (
    <div key={video.id} className={`tooltip-wrap ${styles['video-wrap']}`}>
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
        onClick={() => {
          show({
            title: video.tags,
            className: styles['video-modal'],
            children: (
              <VideoModal
                video={video}
                language={language}
                searchTerm={searchTerm}
                textType={textType}
              />
            ),
          })
        }}
      />
      <span className='tooltip above narrow2'>{EClickToOpenLargeVideo[language]}</span>
      <p>
        <small>
          <a href={video.pageURL} target='_blank' rel='noreferrer'>
            {EVideoPage[language]} ({EAuthor[language]}: {video.user})
          </a>
        </small>
      </p>
    </div>
  )
}

export default Video
