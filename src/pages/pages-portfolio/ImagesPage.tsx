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
              text={t('ClickHereToSeeFeatures')}
              className=''
              wrapperClass=''
              language={language}
            >
              <ul className='ul medium'>
                <li>{t('YouMaySearchForImagesFetchedFromThePixabayAPI')}</li>
                <li>
                  {t('IAddedValueToTheSearchOfImagesAndVideosWithRandomQuotesOrPoems')}
                </li>
                <li>
                  {t('ClickingAnImageOpensAModalWithALargerVersion')}{' '}
                  {t('TheImageOrVideoHasARandomQuoteOrPoemAddedToIt')}
                </li>
                <li>
                  {t('QuotesAreFrom')}{' '}
                  <a
                    href='https://rapidapi.com/martin.svoboda/api/quotes15'
                    target='_blank'
                    rel='noreferrer'
                  >
                    RapidAPI
                  </a>{' '}
                  {t('AndPoemsAreFrom')}{' '}
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
            <div className='flex center margin0auto textcenter'>{t('Loading')}...</div>
          }
        >
          <Images language={language} />
        </Suspense>
      </div>
    </div>
  )
}

export default ImagesPage
