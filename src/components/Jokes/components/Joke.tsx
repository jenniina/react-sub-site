import { ESave, ELanguages } from '../../../interfaces'
import { ECategory, ESaveJoke } from '../interfaces'

interface Props {
  joke: string
  delivery?: string
  currentCategory: ECategory
  reveal: boolean
  visibleJoke: boolean
  titleClickToReveal: string
  setReveal: (reveal: boolean) => void
  handleJokeSave: (e: React.FormEvent<HTMLFormElement>) => void
  language: ELanguages
}
const Joke = ({
  joke,
  delivery,
  currentCategory,
  reveal,
  setReveal,
  handleJokeSave,
  titleClickToReveal,
  language,
  visibleJoke,
}: Props) => {
  const titleSave = ESave[language]

  return (
    <form
      onSubmit={handleJokeSave}
      className={`joke-form-save ${visibleJoke ? 'fadeIn' : ''}`}
    >
      <article aria-live='polite' className={`joke ${visibleJoke ? 'fadeIn' : ''}`}>
        <p className={`${visibleJoke ? 'fadeIn' : ''} ${!delivery ? 'no-delivery' : ''}`}>
          <small>Category: {currentCategory}</small>
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
