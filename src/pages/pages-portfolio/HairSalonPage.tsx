import { useState } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import { useLanguageContext } from '../../contexts/LanguageContext'
import SEO from '../../components/SEO/SEO'

export default function HairSalonPage({ type }: { type: string }) {
  const { t } = useLanguageContext()

  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <>
      <SEO
        title={`${t('HairSalon')} Hannastiina | ${t('HairSalonWebsite')}`}
        description={t('HairSalonWebsite')}
        canonicalUrl="https://react.jenniina.fi/portfolio/salon"
        ogTitle={`${t('HairSalon')} Hannastiina | react.jenniina.fi`}
      />
      <div className={`salon ${type}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium">
                <Accordion
                  text={t('ClickHereToSeeFeatures')}
                  className="salon-features"
                  wrapperClass="mb3"
                  setIsFormOpen={setIsFormOpen}
                >
                  <>
                    <h2>{t('Features')}</h2>
                    <ul className="ul">
                      <li>{t('SalonIntro1')}</li>
                      <li>{t('SalonIntro2')}</li>
                      <li>{t('SalonIntro3')}</li>
                    </ul>
                  </>
                </Accordion>

                <div className="medium flex column gap">
                  <p>
                    <big>
                      <a href="https://hannastiina.jenniina.fi">
                        {t('Website')} Parturi Kampaamo Hannastiina &raquo;
                      </a>
                    </big>
                  </p>
                  <p>
                    <a href="https://github.com/jenniina/hannastiina">
                      Github &raquo;
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
