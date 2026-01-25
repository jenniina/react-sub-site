import Accordion from '../../components/Accordion/Accordion'
import { ELanguages } from '../../types'
import styles from '../../components/Images/images.module.css'
import { useLanguageContext } from '../../contexts/LanguageContext'
import Images from '../../components/Images/Images'
import SEO from '../../components/SEO/SEO'

const ImagesPage = ({ type }: { type: string }) => {
  const { t, language } = useLanguageContext()

  return (
    <>
      <SEO
        title={`${t('SearchForMedia')} | ${t('SearchforVideos')}`}
        description={t('YouMaySearchForImagesFetchedFromThePixabayAPI')}
        canonicalUrl="https://react.jenniina.fi/portfolio/media"
        ogTitle={`${t('SearchForMedia')} | react.jenniina.fi`}
      />
      <div className={`media ${type} ${styles['images-wrap']}`}>
        <div className={`inner-wrap ${styles['inner-wrap']}`}>
          <section className={`card ${styles['features-card']}`}>
            <div>
              <Accordion
                text={t('ClickHereToSeeFeatures')}
                className=""
                wrapperClass=""
              >
                <ul className="ul medium">
                  <li>{t('YouMaySearchForImagesFetchedFromThePixabayAPI')}</li>
                  <li>
                    {t(
                      'IAddedValueToTheSearchOfImagesAndVideosWithRandomQuotesOrPoems'
                    )}
                  </li>
                  <li>
                    {t('ClickingAnImageOpensAModalWithALargerVersion')}{' '}
                    {t('TheImageOrVideoHasARandomQuoteOrPoemAddedToIt')}
                  </li>
                  <li>
                    {t('QuotesAreFrom')}{' '}
                    <a
                      href="https://rapidapi.com/martin.svoboda/api/quotes15"
                      target="_blank"
                      rel="noreferrer"
                    >
                      RapidAPI
                    </a>{' '}
                    {t('AndPoemsAreFrom')}{' '}
                    <a
                      href="https://poetrydb.org/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      PoetryDB
                    </a>{' '}
                    {language === ELanguages.fi ? 'API:sta' : ''}
                  </li>
                </ul>
              </Accordion>
            </div>
          </section>

          <Images />
        </div>
      </div>
    </>
  )
}

export default ImagesPage
