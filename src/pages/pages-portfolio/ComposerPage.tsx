import { useState } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import Hero from '../../components/Hero/Hero'
import { EDependencies, EFeatures, ELanguages } from '../../interfaces'
import { EComposerIntro1, EComposerIntro2 } from '../../interfaces/composer'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'

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
  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <div className={`form ${type}`}>
      <Hero language={language} address='form' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium flex column left gap'>
              <p className='center max-content margin0auto'>
                {EComposerIntro1[language]}
              </p>
              <div className='medium'>
                <Accordion
                  language={language}
                  text={EClickHereToSeeFeatures[language]}
                  className='salon-features'
                  wrapperClass='salon-features-wrap'
                  setIsFormOpen={setIsFormOpen}
                >
                  <h2>{EFeatures[language]}</h2>
                  <ul className='ul'>
                    <li>{EComposerIntro2[language]}</li>
                    <li>
                      {EDependencies[language]}: React
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
                      {EDependencies[language]}: Node.js
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
                    <a href='https://ollisanta.fi'>Olli Santa &raquo;</a>
                  </p>
                  <p>
                    <a href='https://github.com/jenniina/OlliSanta'>Github &raquo;</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
