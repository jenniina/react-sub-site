import { FC, useEffect, useState, MouseEvent as ReactMouseEvent } from 'react'
import styles from '../images.module.css'
import { ELanguages } from '../../../types'
import { EClickToLoadImage } from '../../../types/images'
import { ImageHit } from '../services/images'
import useTooltip from '../../../hooks/useTooltip'
import { getQuote, QuoteItem } from '../../Quotes/services/quotes'
import Quote from '../../Quotes/Quote'
import Poem from '../../Poems/Poem'
import { getPoem } from '../../Poems/services/poems'
import { TTextType } from '../Images'
import { PoemItem } from '../../Poems/services/poems'

interface ModalImageProps {
  image: ImageHit
  language: ELanguages
  handleDownload: () => void
  searchTerm: string
  textType: TTextType
}

const ImageModal: FC<ModalImageProps> = ({
  image,
  language,
  handleDownload,
  searchTerm,
  textType,
}) => {
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip()

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left + 10
    const y = e.clientY - rect.top + 10
    handleMouseMove(x, y)
  }
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

  useEffect(() => {
    if (textType === 'poem') {
      const linecount = Math.floor(Math.random() * 5) + 1
      const fetchPoem = async () => {
        const poem = await getPoem(language, linecount)
        setPoem(poem[0])
      }
      fetchPoem()
    } else if (textType === 'quote') {
      const fetchQuote = async () => {
        const quote = await getQuote(language, searchTerm)
        setQuote(quote)
      }
      fetchQuote()
    } else {
      const randomOneOrTwo = Math.floor(Math.random() * 2) + 1
      if (randomOneOrTwo === 1) {
        const fetchPoem = async () => {
          const linecount = Math.floor(Math.random() * 5) + 1
          const poem = await getPoem(language, linecount)
          setPoem(poem[0])
        }
        fetchPoem()
      } else {
        const fetchQuote = async () => {
          const quote = await getQuote(language, searchTerm)
          setQuote(quote)
        }
        fetchQuote()
      }
    }
  }, [language, searchTerm, textType])

  return (
    <div onMouseMove={onMouseMove} onMouseLeave={handleMouseLeave}>
      <div className={`tooltip-wrap ${styles['image-wrap']} ${styles['image-modal']}`}>
        <button onClick={handleDownload}>
          <img
            src={image.largeImageURL}
            alt={image.tags}
            loading='lazy'
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
            {EClickToLoadImage[language]}
          </span>
        )}
      </div>
      {textType === 'quote' ? (
        <Quote quote={quote} language={language} />
      ) : (
        <Poem poem={poem} language={language} />
      )}
    </div>
  )
}

export default ImageModal
