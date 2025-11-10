import { useState } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import { ELanguages } from '../../types'
import { useLanguageContext } from '../../contexts/LanguageContext'
export default function ComposerPage({
  heading,
  text,
  type,
  language,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
}) {
  const { t } = useLanguageContext()

  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <>
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>
          {t("ComposerOlliSanta")} | React, Node.js, Express, MongoDB
        </title>
        <meta name="description" content={t("ComposerIntro1")} />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/composer`}
        />
        <meta
          property="og:title"
          content={`${t(
            "ComposerOlliSanta"
          )} | React, Node.js, Express, MongoDB`}
        />
        <meta property="og:description" content={t("ComposerIntro1")} />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/composer`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div className={`composer ${type}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium flex column left gap">
                <p className="center max-content margin0auto">
                  {t('ReactWebsite')}. {t('ComposerIntro1')}{' '}
                  {t('ComposerIntro2')}
                  <br />
                  <br />
                </p>
                <div className="medium">
                  <Accordion
                    language={language}
                    text={t('ClickHereToSeeFeatures')}
                    className="composer-features"
                    wrapperClass="mb3"
                    setIsFormOpen={setIsFormOpen}
                  >
                    <>
                      <h2>{t('Features')}</h2>
                      <ul className="ul">
                        <li>{t('ComposerIntro3')}</li>
                        <li>
                          {t('Dependencies')}: React
                          <ul>
                            <li>react</li>
                            <li>react-dom</li>
                            <li>react-router-dom</li>
                            <li>react-icons</li>
                            <li>react redux</li>
                            <li>axios</li>
                          </ul>
                        </li>
                        <li>
                          {t('Dependencies')}: Node.js
                          <ul>
                            <li>express</li>
                            <li>express-validator</li>
                            <li>mongoose</li>
                            <li>bcryptjs</li>
                            <li>jsonwebtoken</li>
                            <li>dotenv</li>
                            <li>nodemailer</li>
                            <li>sanitize-html</li>
                            <li>multer</li>
                          </ul>
                        </li>
                      </ul>
                    </>
                  </Accordion>

                  <div
                    style={
                      isFormOpen
                        ? {
                            marginTop: '2rem',
                            paddingLeft: '0.5rem',
                            fontSize: '130%',
                          }
                        : { marginTop: '2rem', fontSize: '130%' }
                    }
                  >
                    <p>
                      <a href="https://ollisanta.fi">Olli Santa &raquo;</a>
                    </p>
                    <p>
                      <a href="https://github.com/jenniina/OlliSanta">
                        Github &raquo;
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
