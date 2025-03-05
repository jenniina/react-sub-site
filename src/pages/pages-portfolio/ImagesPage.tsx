import { lazy, Suspense, useContext } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import { ELanguages } from '../../types'
import styles from '../../components/Images/images.module.css'
import { LanguageContext } from '../../contexts/LanguageContext'

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
  const { t } = useContext(LanguageContext)!

  return (
    <div className={`media ${type} ${styles['images-wrap']}`}>
      <div className={`inner-wrap ${styles['inner-wrap']}`}>
        <section className={`card ${styles['features-card']}`}>
          <div>
            <Accordion
              text={t('EClickHereToSeeFeatures')}
              className=''
              wrapperClass=''
              language={language}
            >
              <ul className='ul medium'>
                <li>{t('EYouMaySearchForImagesFetchedFromThePixabayAPI')}</li>
                <li>
                  {t('EIAddedValueToTheSearchOfImagesAndVideosWithRandomQuotesOrPoems')}
                </li>
                <li>
                  {t('EClickingAnImageOpensAModalWithALargerVersion')}{' '}
                  {t('ETheImageOrVideoHasARandomQuoteOrPoemAddedToIt')}
                </li>
                <li>
                  {t('EQuotesAreFrom')}{' '}
                  <a
                    href='https://rapidapi.com/martin.svoboda/api/quotes15'
                    target='_blank'
                    rel='noreferrer'
                  >
                    RapidAPI
                  </a>{' '}
                  {t('EAndPoemsAreFrom')}{' '}
                  <a href='https://poetrydb.org/' target='_blank' rel='noreferrer'>
                    PoetryDB
                  </a>{' '}
                  {language === 'fi' ? 'API:sta' : ''}
                </li>
              </ul>
            </Accordion>
          </div>
        </section>

        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
          }
        >
          <Images language={language} />
        </Suspense>
      </div>
    </div>
  )
}

export default ImagesPage
