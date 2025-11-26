import Accordion from '../../components/Accordion/Accordion'
import { ELanguages } from '../../types'
import styles from '../../components/Images/images.module.css'
import { useLanguageContext } from '../../contexts/LanguageContext'
import Images from '../../components/Images/Images'

const ImagesPage = ({ type }: { type: string }) => {
  const { t, language } = useLanguageContext()

  return (
    <>
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>
          {t("SearchForMedia")} | {t("SearchforVideos")}
        </title>
        <meta
          name="description"
          content={t("YouMaySearchForImagesFetchedFromThePixabayAPI")}
        />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/media`}
        />
        <meta
          property="og:title"
          content={`${t("SearchForMedia")} | react.jenniina.fi`}
        />
        <meta
          property="og:description"
          content={t("YouMaySearchForImagesFetchedFromThePixabayAPI")}
        />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/media`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
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
