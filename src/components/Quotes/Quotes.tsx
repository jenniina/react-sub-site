import { FC, FormEvent, useState } from 'react'
import { ELanguages, ESearch } from '../../types'
import Accordion from '../Accordion/Accordion'
import styles from './quotes.module.css'
import { ESearchForQuote, ESearchForQuoteSeparately } from '../../types/quotes'
import { EAll, ECategoryTitle, EInEnglish, ENote } from '../Jokes/types'
import { Select, SelectOption } from '../Select/Select'
import useLocalStorage from '../../hooks/useStorage'
import { getQuote, QuoteItem, VALID_CATEGORIES } from './services/quotes'
import { firstToUpperCase } from '../../utils'
import Quote from './Quote'

interface Props {
  language: ELanguages
}

const Quotes: FC<Props> = ({ language }) => {
  const [quote, setQuote] = useLocalStorage<QuoteItem>('Stored-Quote', {
    quote: '',
    category: '',
    author: '',
  })

  const [searchQuote, setSearchQuote] = useState<string>('')

  const optionsQuoteCategories = [
    { label: EAll[language], value: '' },
    ...Object.values(VALID_CATEGORIES).map((category) => ({
      label: firstToUpperCase(category),
      value: category,
    })),
  ]
  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState<
    SelectOption | undefined
  >(optionsQuoteCategories[0])

  const fetchQuote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const quote = await getQuote(language, searchQuote)
    setQuote(quote)
  }

  return (
    <section className={`card ${styles['quote-section']}`}>
      <div>
        <Accordion
          language={language}
          id='search-quote'
          className='quote-accordion'
          wrapperClass={styles.accordion}
          text={ESearchForQuoteSeparately[language]}
          closeClass={styles['closed-accordion']}
        >
          <>
            <h2>{ESearchForQuote[language]}</h2>
            <p className='textcenter'>
              ({ENote[language]} {EInEnglish[language]})
            </p>
            <form onSubmit={fetchQuote}>
              <Select
                z={9}
                id='quote-category'
                className={`${styles.select} ${styles['accordion-select']}`}
                hideDelete
                instructions={ECategoryTitle[language]}
                value={selectedQuoteCategory}
                onChange={(o) => setSelectedQuoteCategory(o)}
                options={optionsQuoteCategories}
                language={language}
              />

              <button className={styles['accordion-submit']} type='submit'>
                {ESearch[language]}
              </button>
            </form>
            {quote.quote !== '' && (
              <div
                className={styles['accordion-paragraph-wrap']}
                style={{
                  width: '100%',
                  maxWidth:
                    'clamp(100px, max-content, calc(100vw - var(--scrollbar_width)))',
                  margin: '2em auto 0',
                }}
              >
                <Quote quote={quote} language={language} />
              </div>
            )}
          </>
        </Accordion>
      </div>
    </section>
  )
}

export default Quotes
