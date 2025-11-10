import { FC, Fragment, ReactNode, useContext, useRef, useState } from 'react'
import { PoemItem } from './services/poems'
import { ELanguages } from '../../types'
import { useLanguageContext } from '../../contexts/LanguageContext'

interface PoemProps {
  poem: PoemItem
  language: ELanguages
}

const Poem: FC<PoemProps> = ({ poem, language }) => {
  const { t } = useLanguageContext()

  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  const copyToClipboard = () => {
    const textToCopy = `${poem.title} \n\n ${poem.lines.join('\n')}\n\n - ${
      poem.author
    }`

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          setCopied(true)
          setTimeout(() => setCopied(false), 3000)
        },
        error => {
          console.error('Failed to copy:', error)
        }
      )
    } else {
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
      } catch (error: any) {
        console.error('Failed to copy:', error)
      }
      ref.current?.removeChild(textArea)
    }
  }

  if (!poem || !poem.lines || poem.lines.length < 1) return <></>

  return (
    <>
      <p style={{ margin: '0 0 0.5em 0' }}>{poem.title}</p>
      <p ref={ref}>
        <i>
          <big style={{ display: 'block', margin: '0 0 0.5em' }}>
            {poem.lines.map((line, index) => (
              <Fragment key={line}>
                {line}
                {poem.lines.length === index + 1 ? '' : <br />}
              </Fragment>
            ))}
          </big>
          &mdash;&nbsp;{poem.author}
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
      </div>
    </>
  )
}

export default Poem
