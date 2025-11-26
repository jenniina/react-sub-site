import { FC, ReactNode, useRef, useState } from 'react'
import { QuoteItem } from './services/quotes'
import { useLanguageContext } from '../../contexts/LanguageContext'

interface QuoteProps {
  quote: QuoteItem
  url?: string
  title?: ReactNode
}

const Quote: FC<QuoteProps> = ({ quote, url, title }) => {
  const { t } = useLanguageContext()

  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  const copyToClipboard = () => {
    const textToCopy = `"${quote.content}" - ${quote.originator.name}`

    navigator?.clipboard
      ?.writeText?.(textToCopy)
      .then(
        () => {
          setCopied(true)
          setTimeout(() => setCopied(false), 3000)
        },
        error => {
          console.error('Failed to copy:', error)
        }
      )
      .catch(() => {
        // Fallback method for older browsers
        const textArea = document?.createElement('textarea')
        textArea.value = textToCopy
        ref.current?.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document?.execCommand('copy')
          setCopied(true)
          setTimeout(() => setCopied(false), 3000)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error('Failed to copy:', error)
        }
        ref.current?.removeChild(textArea)
      })
  }

  if (quote.content === '') return <></>

  return (
    <>
      <p ref={ref}>
        <i>
          <big style={{ display: 'inline-block', margin: '0 0 0.5em' }}>
            &quot;{quote.content}&quot;
          </big>
          &mdash;&nbsp;{quote.originator.name}
        </i>
      </p>

      <div className="flex gap">
        <button
          className="small"
          style={{ maxWidth: 'max-content', marginLeft: '1em' }}
          onClick={copyToClipboard}
        >
          {copied ? t('CopiedToClipboard') : t('CopyToClipboard')}
        </button>
        {title && (
          <small>
            {url ? (
              <a href={url} target="_blank" rel="noreferrer">
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
