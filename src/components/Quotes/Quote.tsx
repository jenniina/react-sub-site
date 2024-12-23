import { FC, ReactNode, useRef, useState } from 'react'
import { QuoteItem } from './services/quotes'
import { ECopiedToClipboard, ECopyToClipboard, ELanguages } from '../../interfaces'
import { ECategoryTitle } from '../Jokes/interfaces'

interface QuoteProps {
  quote: QuoteItem
  language: ELanguages
  url?: string
  title?: ReactNode
}

const Quote: FC<QuoteProps> = ({ quote, language, url, title }) => {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  const copyToClipboard = () => {
    const textToCopy = `"${quote.quote}" - ${quote.author}`

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          setCopied(true)
          setTimeout(() => setCopied(false), 3000)
        },
        (error) => {
          console.error('Failed to copy:', error)
        }
      )
    } else {
      // Fallback method for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = textToCopy
      ref.current?.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      } catch (error: any) {
        console.error('Failed to copy:', error)
      }
      ref.current?.removeChild(textArea)
    }
  }

  if (quote.quote === '') return <></>

  return (
    <>
      <p ref={ref}>
        <i>
          <big style={{ display: 'inline-block', margin: '0 0 0.5em' }}>
            "{quote.quote}"
          </big>
          &mdash;&nbsp;{quote.author}
        </i>
      </p>

      <div className='flex gap'>
        <small style={{ maxWidth: 'max-content', margin: '0' }}>
          [ {ECategoryTitle[language]}: {quote.category} ]
        </small>
        <button
          className='small'
          style={{ maxWidth: 'max-content', marginLeft: '1em' }}
          onClick={copyToClipboard}
        >
          {copied ? ECopiedToClipboard[language] : ECopyToClipboard[language]}
        </button>
        {title && (
          <small>
            {url ? (
              <a href={url} target='_blank' rel='noreferrer'>
                {title}
              </a>
            ) : (
              <>{title}</>
            )}
          </small>
        )}
      </div>
    </>
  )
}

export default Quote
