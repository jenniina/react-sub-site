import React, { FC, useEffect, useState, useCallback } from 'react'
import { ELanguages } from '../../../types'
import { VideoHit } from '../services/images'
import useTooltip from '../../../hooks/useTooltip'
import Quote from '../../Quotes/Quote'
import { getQuote, QuoteItem } from '../../Quotes/services/quotes'
import Poem from '../../Poems/Poem'
import { getPoem, PoemItem } from '../../Poems/services/poems'
import { TTextType } from '../Images'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { useLanguageContext } from '../../../contexts/LanguageContext'

interface ModalVideoProps {
  video: VideoHit
  searchTerm: string
  textType: TTextType
  handleDownload: () => void
}

const VideoModal: FC<ModalVideoProps> = ({
  video,
  searchTerm,
  textType,
  handleDownload,
}) => {
  const { t, language } = useLanguageContext()

  const dispatch = useAppDispatch()

  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip()

  const [txt, setTxt] = useState<PoemItem | QuoteItem | null>(null)

  const isPoem = textType === 'poem'
  const isQuote = textType === 'quote'

  const fetchPoem = useCallback(
    async (linecount: number): Promise<PoemItem | null> => {
      const poem = await getPoem(language, linecount)
      return poem[0] || null
    },
    [language]
  )

  const fetchQuote = useCallback(async (): Promise<QuoteItem | null> => {
    if (language === ELanguages.fi) {
      const response = await getQuote(ELanguages.en, searchTerm)
      if (response.quote) return response.quote
      else {
        void dispatch(notify(response.message ?? t('Error'), true, 8))
        return null
      }
    } else {
      const response = await getQuote(language, searchTerm)
      if (response.quote) return response.quote
      else {
        void dispatch(notify(response.message ?? t('Error'), true, 8))
        return null
      }
    }
  }, [language, searchTerm, dispatch, t])

  useEffect(() => {
    const fetchData = async () => {
      const linecount = Math.floor(Math.random() * 5) + 2
      let data: PoemItem | QuoteItem | null = null

      if (isPoem) {
        data = await fetchPoem(linecount)
      } else if (textType === 'quote') {
        data = await fetchQuote()
      } else {
        const randomOneOrTwo = Math.floor(Math.random() * 2) + 1
        if (randomOneOrTwo === 1) {
          data = await fetchPoem(linecount)
        } else {
          data = await fetchQuote()
        }
      }

      setTxt(data)
    }

    void fetchData()
  }, [textType, fetchPoem, fetchQuote, isPoem])

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
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleDownload()
            }
          }}
          controls
        >
          <track kind="captions" srcLang="en" label="No captions available" />
        </video>
        {tooltip.visible && (
          <span
            className={`tooltip center narrow`}
            style={{ top: tooltip.y, left: tooltip.x, right: 'unset' }}
          >
            {t('ClickToLoadVideo')}
          </span>
        )}
      </div>
      {isQuote ? (
        <Quote
          quote={txt as QuoteItem}
          url={video.pageURL}
          title={
            <>
              {t('VideoPage')} ({t('Author')}: {video.user})
            </>
          }
        />
      ) : (
        <Poem poem={txt as PoemItem} />
      )}
    </>
  )
}

export default VideoModal
