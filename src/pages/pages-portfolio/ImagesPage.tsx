import { lazy, Suspense } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import Hero from '../../components/Hero/Hero'
import { ELanguages, ELoading } from '../../types'
import styles from '../../components/Images/images.module.css'
import { EClickHereToSeeFeatures } from '../../components/Jokes/types'
import { VALID_CATEGORIES, WEIGHTED } from '../../components/Quotes/services/quotes'
import { EQuoteCategories } from '../../types/quotes'
import {
  EAndPoemsAreFrom,
  EClickingAnImageOpensAModalWithALargerVersion,
  EIAddedValueToTheSearchOfImagesAndVideosWithRandomQuotesOrPoems,
  EQuotesAreFrom,
  ETheImageOrVideoHasARandomQuoteOrPoemAddedToIt,
  ETheWordCloudIsFormedFromTheDifferentCategoriesAvailableInTheQuotesAPI,
  EYouMaySearchForImagesFetchedFromThePixabayAPI,
} from '../../types/images'

const Images = lazy(() => import('../../components/Images/Images'))

const ImagesPage = ({
  heading,
  text,
  type,
  language,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
}) => {
  return (
    <div className={`media ${type} ${styles['images-wrap']}`}>
      <div className={`inner-wrap ${styles['inner-wrap']}`}>
        <section className={`card ${styles['features-card']}`}>
          <div>
            <Accordion
              text={EClickHereToSeeFeatures[language]}
              className=''
              wrapperClass=''
              language={language}
            >
              <ul className='ul medium'>
                <li>{EYouMaySearchForImagesFetchedFromThePixabayAPI[language]}</li>
                <li>
                  {
                    EIAddedValueToTheSearchOfImagesAndVideosWithRandomQuotesOrPoems[
                      language
                    ]
                  }
                </li>
                <li>
                  {EClickingAnImageOpensAModalWithALargerVersion[language]}{' '}
                  {ETheImageOrVideoHasARandomQuoteOrPoemAddedToIt[language]}
                </li>
                <li>
                  {EQuotesAreFrom[language]}{' '}
                  <a
                    href='https://www.api-ninjas.com/api/quotes'
                    target='_blank'
                    rel='noreferrer'
                  >
                    API Ninjas
                  </a>{' '}
                  {EAndPoemsAreFrom[language]}{' '}
                  <a href='https://poetrydb.org/' target='_blank' rel='noreferrer'>
                    PoetryDB
                  </a>{' '}
                  {language === 'fi' ? 'API:sta' : ''}
                </li>
                <li>
                  {
                    ETheWordCloudIsFormedFromTheDifferentCategoriesAvailableInTheQuotesAPI[
                      language
                    ]
                  }
                </li>
                <li>
                  {EQuoteCategories[language]}: {VALID_CATEGORIES.join(', ')}
                </li>
              </ul>
            </Accordion>
          </div>
        </section>

        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>
              {ELoading[language]}...
            </div>
          }
        >
          <Images language={language} />
        </Suspense>
      </div>
    </div>
  )
}

export default ImagesPage
