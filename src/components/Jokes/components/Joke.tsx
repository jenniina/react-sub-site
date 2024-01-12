import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { ESave, ELanguages, ReducerProps, EUserNotUpdated } from '../../../interfaces'
import {
  EAreYouSureYouWantToHideThisJoke,
  EAuthor,
  ECategory,
  ECategoryTitle,
  ECategory_en,
  EDelete,
  EDeletedJoke,
  EErrorDeletingJoke,
  EHide,
  EJokeHidden,
  ESaveJoke,
  ESavedJoke,
  IJoke,
} from '../interfaces'
import { addToBlacklistedJokes, updateUser } from '../../../reducers/usersReducer'
import { notify } from '../../../reducers/notificationReducer'
import { useEffect } from 'react'
import { initializeUser } from '../../../reducers/authReducer'

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
  jokeId: IJoke['jokeId']
  handleBlacklistUpdate: (jokeId: IJoke['jokeId'], value: string | undefined) => void
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
  jokeId,
  handleBlacklistUpdate,
}: Props) => {
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
        <div className='save-delete-wrap'>
          <button type='submit' className={`submit ${visibleJoke ? 'fadeIn' : ''}`}>
            {ESaveJoke[language]}
          </button>
          <button
            type='button'
            className={`delete danger narrow ${visibleJoke ? 'fadeIn' : ''}`}
            onClick={() =>
              handleBlacklistUpdate(
                jokeId as IJoke['jokeId'],
                jokeCategory === ECategory_en.ChuckNorris &&
                  language === ELanguages.English
                  ? (joke as string)
                  : undefined
              )
            }
          >
            {EHide[language]}
          </button>
        </div>
      ) : (
        ''
      )}
    </form>
  )
}

export default Joke
