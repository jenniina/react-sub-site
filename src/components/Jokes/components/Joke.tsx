import { ESave, ELanguages } from '../../../interfaces'
import {
  EAuthor,
  ECategory,
  ECategoryTitle,
  ECategory_en,
  ESaveJoke,
} from '../interfaces'

interface Props {
  joke: string
  delivery?: string
  author: string
  jokeCategory: ECategory | null
  reveal: boolean
  visibleJoke: boolean
  titleClickToReveal: string
  setReveal: (reveal: boolean) => void
  handleJokeSave: (e: React.FormEvent<HTMLFormElement>) => void
  language: ELanguages
  getCategoryInLanguage: (
    category: ECategory_en,
    language: ELanguages
  ) => string | undefined
  subCategoryResults: string[]
}
const Joke = ({
  joke,
  delivery,
  author,
  jokeCategory,
  reveal,
  setReveal,
  handleJokeSave,
  titleClickToReveal,
  language,
  visibleJoke,
  getCategoryInLanguage,
  subCategoryResults,
}: Props) => {
  const titleSave = ESave[language]

  return (
    <form
      onSubmit={handleJokeSave}
      className={`joke-form-save ${joke && visibleJoke ? 'fadeIn' : ''}`}
    >
      <article aria-live='polite' className={`joke ${visibleJoke ? 'fadeIn' : ''}`}>
        <p className={`${visibleJoke ? 'fadeIn' : ''} ${!delivery ? 'no-delivery' : ''}`}>
          <small>
            {ECategoryTitle[language]}:{' '}
            {getCategoryInLanguage(jokeCategory as ECategory_en, language)}
          </small>
        </p>
        <p className={`${visibleJoke ? 'fadeIn' : ''} ${!delivery ? 'no-delivery' : ''}`}>
          {joke}
        </p>

        <button
          type='button'
          onClick={() => setReveal(!reveal)}
          className={`delivery ${!delivery ? 'no-delivery' : 'has-delivery'} ${
            delivery && !reveal ? 'reveal' : ''
          } ${visibleJoke ? 'fadeIn' : ''}`}
        >
          <>
            <span {...(!reveal ? { 'aria-hidden': true } : { 'aria-hidden': false })}>
              {titleClickToReveal}
            </span>
            {delivery ? (
              <p aria-live='assertive' className={`${visibleJoke ? 'fadeIn' : ''}`}>
                {!reveal ? delivery : ''}
              </p>
            ) : (
              ''
            )}
          </>
        </button>
        {author ? (
          <p className={`author ${visibleJoke ? 'fadeIn' : ''}`}>
            <small>
              {EAuthor[language]}: {author}
            </small>
          </p>
        ) : (
          ''
        )}
        {subCategoryResults.length > 0 ? (
          <p className={`sub-categories ${visibleJoke ? 'fadeIn' : ''}`}>
            <small>
              {ECategoryTitle[language]}:{' '}
              {subCategoryResults.map((category) => category).join(', ')}
            </small>
          </p>
        ) : (
          ''
        )}
      </article>
      {joke || delivery ? (
        <div className='flex center'>
          <button type='submit' className={`submit ${visibleJoke ? 'fadeIn' : ''}`}>
            {ESaveJoke[language]}
          </button>
        </div>
      ) : (
        ''
      )}
    </form>
  )
}

export default Joke
