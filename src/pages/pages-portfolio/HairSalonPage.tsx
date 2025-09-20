import { useContext, useState } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import { ELanguages } from '../../types'
import { LanguageContext } from '../../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'

export default function HairSalonPage({
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
  const { t } = useContext(LanguageContext)!

  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <>
      <Helmet>
        <title>
          {t('HairSalon')} Hannastiina | {t('HairSalonWebsite')}
        </title>
        <meta name='description' content={t('HairSalonWebsite')} />
        <link rel='canonical' href={`https://react.jenniina.fi/portfolio/salon`} />
      </Helmet>
      <div className={`salon ${type}`}>
        <div className='inner-wrap'>
          <section className='card'>
            <div>
              <div className='medium'>
                <Accordion
                  language={language}
                  text={t('ClickHereToSeeFeatures')}
                  className='salon-features'
                  wrapperClass='mb3'
                  setIsFormOpen={setIsFormOpen}
                >
                  <>
                    <h2>{t('Features')}</h2>
                    <ul className='ul'>
                      <li>{t('SalonIntro1')}</li>
                      <li>{t('SalonIntro2')}</li>
                      <li>{t('SalonIntro3')}</li>
                      <li>
                        {t('Dependencies')}: React
                        <ul>
                          <li>react</li>
                          <li>react-dom</li>
                          <li>react-icons</li>
                          <li>react redux</li>
                          <li>@reduxjs/toolkit</li>
                          <li>axios</li>
                        </ul>
                      </li>
                      <li>
                        {t('Dependencies')}: Node.js
                        <ul>
                          <li>express</li>
                          <li>express-validator</li>
                          <li>mysql2</li>
                          <li>sequelize</li>
                          <li>cors</li>
                          <li>bcryptjs</li>
                          <li>jsonwebtoken</li>
                          <li>dotenv</li>
                        </ul>
                      </li>
                    </ul>
                  </>
                </Accordion>

                <div
                  style={
                    isFormOpen
                      ? {
                          paddingLeft: '0.5rem',
                          fontSize: '130%',
                        }
                      : { fontSize: '130%' }
                  }
                >
                  <p>
                    <a href='https://hannastiina.jenniina.fi'>
                      Parturi Kampaamo Hannastiina &raquo;
                    </a>
                  </p>
                  <p>
                    <a href='https://github.com/jenniina/hannastiina'>Github &raquo;</a>
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
