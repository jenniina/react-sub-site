import { FC, useEffect, useState, MouseEvent as ReactMouseEvent } from 'react'
import styles from '../images.module.css'
import { ELanguages } from '../../../types'
import { ImageHit } from '../services/images'
import useTooltip from '../../../hooks/useTooltip'
import { getQuote, QuoteItem } from '../../Quotes/services/quotes'
import Quote from '../../Quotes/Quote'
import Poem from '../../Poems/Poem'
import { getPoem } from '../../Poems/services/poems'
import { TTextType } from '../Images'
import { PoemItem } from '../../Poems/services/poems'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useLanguageContext } from '../../../contexts/LanguageContext'

interface ModalImageProps {
  image: ImageHit
  handleDownload: () => void
  searchTerm: string
  textType: TTextType
}

const ImageModal: FC<ModalImageProps> = ({
  image,
  handleDownload,
  searchTerm,
  textType,
}) => {
  const { t, language } = useLanguageContext()

  const dispatch = useAppDispatch()
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip()

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left + 10
    const y = e.clientY - rect.top + 10
    handleMouseMove(x, y)
  }
  const [quote, setQuote] = useState<QuoteItem>({
    id: 0,
    content: '',
    originator: {
      name: '',
      id: 0,
      description: '',
      language_code: 'en',
      master_id: 0,
      url: '',
    },
    tags: [''],
    url: '',
    language_code: 'en',
  })

  const [poem, setPoem] = useState<PoemItem>({
    title: '',
    author: '',
    lines: [],
    linecount: '0',
  })

  useEffect(() => {
    if (textType === 'poem') {
      const linecount = Math.floor(Math.random() * 5) + 1
      const fetchPoem = async () => {
        const poem = await getPoem(language, linecount)
        setPoem(poem[0])
      }
      void fetchPoem()
    } else if (textType === 'quote') {
      const fetchQuote = async () => {
        if (language === ELanguages.fi) {
          const response = await getQuote(ELanguages.en, searchTerm)
          if (response.quote) setQuote(response.quote)
          else void dispatch(notify(response.message ?? t('Error'), true, 8))
        } else {
          const response = await getQuote(language, searchTerm)
          if (response.quote) setQuote(response.quote)
          else void dispatch(notify(response.message ?? t('Error'), true, 8))
        }
      }
      void fetchQuote()
    } else {
      const randomOneOrTwo = Math.floor(Math.random() * 2) + 1
      if (randomOneOrTwo === 1) {
        const fetchPoem = async () => {
          const linecount = Math.floor(Math.random() * 5) + 1
          const poem = await getPoem(language, linecount)
          setPoem(poem[0])
        }
        void fetchPoem()
      } else {
        const fetchQuote = async () => {
          const response = await getQuote(language, searchTerm)
          if (response.quote) setQuote(response.quote)
          else void dispatch(notify(response.message ?? t('Error'), true, 8))
        }
        void fetchQuote()
      }
    }
  }, [language, searchTerm, textType, dispatch, t])

  return (
    <div onMouseMove={onMouseMove} onMouseLeave={handleMouseLeave}>
      <div
        className={`tooltip-wrap ${styles['image-wrap']} ${styles['image-modal']}`}
      >
        <button onClick={handleDownload} className="reset">
          <img
            src={image.largeImageURL}
            alt={image.tags}
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              cursor: 'pointer',
              position: 'relative',
            }}
          />{' '}
        </button>
        {tooltip.visible && (
          <span
            className={`tooltip narrow`}
            style={{ top: tooltip.y, left: tooltip.x, right: 'unset' }}
          >
            {t('ClickToLoadImage')}
          </span>
        )}
      </div>
      {textType === 'quote' ? <Quote quote={quote} /> : <Poem poem={poem} />}
    </div>
  )
}

export default ImageModal
