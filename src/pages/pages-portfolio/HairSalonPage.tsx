import { useState } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import Hero from '../../components/Hero/Hero'
import { EDependencies, EFeatures, ELanguages } from '../../interfaces'
import { ESalonIntro1, ESalonIntro2, ESalonIntro3 } from '../../interfaces/salon'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'

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
  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <div className={`form ${type}`}>
      <Hero language={language} address='form' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium'>
              <Accordion
                language={language}
                text={EClickHereToSeeFeatures[language]}
                className='salon-features'
                setIsFormOpen={setIsFormOpen}
              >
                <h2>{EFeatures[language]}</h2>
                <ul className='ul'>
                  <li>{ESalonIntro1[language]}</li>
                  <li>{ESalonIntro2[language]}</li>
                  <li>{ESalonIntro3[language]}</li>
                  <li>
                    {EDependencies[language]}: React
                    <ul>
                      <li>react</li>
                      <li>react-dom</li>
                      <li>react-icons</li>
                      <li>react redux</li>
                      <li>@reduxjs/toolkit</li>
                      <li>axios</li>
                      <li>
                        Dev:
                        <ul>
                          <li>typescript</li>
                          <li>vite</li>
                          <li>rimraf</li>
                          <li>rollup-plugin-copy</li>
                          <li>eslint</li>
                          <li>eslint-plugin-react-hooks</li>
                          <li>eslint-plugin-react-refresh</li>
                          <li>@types/react</li>
                          <li>@types/react-dom</li>
                          <li>@typescript-eslint/eslint-plugin</li>
                          <li>@typescript-eslint/parser</li>
                          <li>@vitejs/plugin-react</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    {EDependencies[language]}: Node.js
                    <ul>
                      <li>express</li>
                      <li>express-validator</li>
                      <li>mysql2</li>
                      <li>sequelize</li>
                      <li>cors</li>
                      <li>bcryptjs</li>
                      <li>jsonwebtoken</li>
                      <li>dotenv</li>
                      <li>
                        Dev:
                        <ul>
                          <li>concurrently</li>
                          <li>nodemon</li>
                          <li>typescript</li>
                          <li>@types/bcrypt</li>
                          <li>@types/bcryptjs</li>
                          <li>@types/cors</li>
                          <li>@types/express</li>
                          <li>@types/jsonwebtoken</li>
                          <li>@types/node</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
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
  )
}
