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
              <div className="medium flex column left gap mb3">
                <p className="left">
                  {t('ReactWebsite')}. {t('ComposerIntro1')}{' '}
                  {t('ComposerIntro2')}
                </p>

                <Accordion
                  className={`accordion-composer composer`}
                  wrapperClass="composer-wrap"
                  text={t('Features')}
                >
                  <p>{t('ComposerIntro3')}</p>
                </Accordion>
              </div>
              <div className="medium flex column gap-half">
                <p>
                  <big>
                    <a href="https://ollisanta.fi">Olli Santa &raquo;</a>
                  </big>
                </p>
                <p>
                  <a href="https://github.com/jenniina/OlliSanta">
                    Github &raquo;
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
