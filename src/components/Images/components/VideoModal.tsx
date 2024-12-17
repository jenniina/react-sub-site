import { FC, useEffect, useState } from 'react'
import { EDownload, ELanguages } from '../../../interfaces'
import { EClickToLoadVideo, EVideoPage } from '../../../interfaces/images'
import { VideoHit } from '../services/images'
import useTooltip from '../../../hooks/useTooltip'
import Quote from '../../Quotes/Quote'
import { getQuote, QuoteItem } from '../../Quotes/services/quotes'
import { EAuthor } from '../../Jokes/interfaces'
import Poem from '../../Poems/Poem'
import { getPoem, PoemItem } from '../../Poems/services/poems'
import { TTextType } from '../Images'

interface ModalVideoProps {
  video: VideoHit
  language: ELanguages
  searchTerm: string
  textType: TTextType
}

const VideoModal: FC<ModalVideoProps> = ({ video, language, searchTerm, textType }) => {
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip()

  const [quote, setQuote] = useState<QuoteItem>({
    quote: '',
    category: '',
    author: '',
  })

  const [poem, setPoem] = useState<PoemItem>({
    title: '',
    author: '',
    lines: [],
    linecount: '0',
  })

  const fetchPoem = async (linecount: number) => {
    const poem = await getPoem(language, linecount)
    setPoem(poem[0])
  }

  const fetchQuote = async () => {
    const quote = await getQuote(language, searchTerm)
    setQuote(quote)
  }

  useEffect(() => {
    const linecount = Math.floor(Math.random() * 5) + 2
    if (textType === 'poem') {
      fetchPoem(linecount)
    } else if (textType === 'quote') {
      fetchQuote()
    } else {
      const randomOneOrTwo = Math.floor(Math.random() * 2) + 1
      if (randomOneOrTwo === 1) {
        fetchPoem(linecount)
      } else {
        fetchQuote()
      }
    }
  }, [language, searchTerm, textType])

  const handleDownload = () => {
    if (window.confirm(EDownload[language] + '?')) {
      const link = document.createElement('a')
      link.href = video.videos.medium.url
      link.download = `video_${video.id}.mp4`
      link.target = '_blank'
      link.rel = 'noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left + 10
    const y = e.clientY - rect.top + 10
    handleMouseMove(x, y)
  }

  return (
    <>
      <div
        className={`tooltip-wrap`}
        onMouseMove={onMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <video
          src={
            Number(video.videos.large.size) > 0
              ? video.videos.large.url
              : video.videos.medium.url
          }
          title={video.tags}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '100%',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={handleDownload}
          controls
        />
        {tooltip.visible && (
          <span
            className={`tooltip center narrow`}
            style={{ top: tooltip.y, left: tooltip.x, right: 'unset' }}
          >
            {EClickToLoadVideo[language]}
          </span>
        )}
      </div>
      {textType === 'quote' ? (
        <Quote
          quote={quote}
          language={language}
          url={video.pageURL}
          title={
            <>
              {EVideoPage[language]} ({EAuthor[language]}: {video.user})
            </>
          }
        />
      ) : (
        <Poem poem={poem} language={language} />
      )}
    </>
  )
}

export default VideoModal
