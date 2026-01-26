import { useState } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import { useLanguageContext } from '../../contexts/LanguageContext'
import SEO from '../../components/SEO/SEO'

export default function ComposerPage({ type }: { type: string }) {
  const { t } = useLanguageContext()

  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <>
      <SEO
        title={`${t('ComposerOlliSanta')} | React, Node.js, Express, MongoDB`}
        description={t('ComposerIntro1')}
        canonicalUrl="https://react.jenniina.fi/portfolio/composer"
      />
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
