import { useState } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import Hero from '../../components/Hero/Hero'
import {
  EBookApp,
  EDependencies,
  EFeatures,
  ELanguages,
  EMongoDBAtlasDatabase,
  ETheWebServiceIsHostedAtRenderCom,
} from '../../interfaces'
import { ESiteMayBeSlow } from '../../interfaces/welcome'

export default function GraphQLPage({
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
                text={EFeatures[language]}
                className='graphQL-features'
                setIsFormOpen={setIsFormOpen}
              >
                <h2>{EFeatures[language]}</h2>
                <p>
                  {ETheWebServiceIsHostedAtRenderCom[language]}{' '}
                  <a href='https://www.mongodb.com/atlas/database'>
                    {EMongoDBAtlasDatabase[language]}
                  </a>
                  .
                </p>
                <ul className='ul'>
                  <li>
                    {EDependencies[language]}: React
                    <ul>
                      <li>
                        <a href='https://www.apollographql.com/docs/react/get-started/'>
                          Apollo Client
                        </a>
                      </li>
                      <li>
                        <a href='https://react.dev/'>React</a>
                      </li>
                      <li>
                        <a href='https://reactjs.org/'>react-dom</a>
                      </li>
                      <li>
                        <a href='https://github.com/react-icons/react-icons#readme'>
                          react-icons
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/thebuilder/react-intersection-observer#readme'>
                          react-intersection-observer
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/remix-run/react-router#readme'>
                          react-router-dom
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/kentcdodds/cross-env#readme'>
                          cross-env
                        </a>
                      </li>
                      <li>
                        Dev:
                        <ul>
                          <li>
                            <a href='https://vitejs.dev/guide/why.html'>Vite</a>
                          </li>
                          <li>
                            <a href='https://github.com/vitest-dev/vitest#readme'>
                              vitest
                            </a>
                          </li>
                          <li>
                            <a href='https://eslint.org'>eslint</a>
                          </li>
                          <li>
                            <a href='https://github.com/facebook/create-react-app#readme'>
                              eslint-config-react-app
                            </a>
                          </li>
                          <li>
                            <a href='https://www.typescriptlang.org/'>TypeScript</a>
                          </li>
                          <li>
                            <a href='https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react'>
                              @types/react
                            </a>
                          </li>
                          <li>
                            <a href='https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom'>
                              @types/react-dom
                            </a>
                          </li>
                          <li>
                            <a href='https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#readme'>
                              @vitejs/plugin-react
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    {EDependencies[language]}: Node.js
                    <ul>
                      <li>
                        <a href='https://graphql.org/'>GraphQL</a>
                      </li>
                      <li>
                        <a href='https://github.com/ardatan/graphql-tools#readme'>
                          @graphql-tools/schema
                        </a>
                      </li>
                      <li>
                        <a href='https://www.apollographql.com/docs/apollo-server/'>
                          Apollo Server
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/apollographql/apollo-server#readme'>
                          apollo-server-core
                        </a>
                      </li>
                      <li>
                        <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'>
                          JavaScript
                        </a>
                      </li>
                      <li>
                        <a href='https://mongoosejs.com'>mongoose</a>
                      </li>
                      <li>
                        <a href='https://github.com/blakehaswell/mongoose-unique-validator#readme'>
                          mongoose-unique-validator
                        </a>
                      </li>
                      <li>
                        <a href='http://expressjs.com/'>express</a>
                      </li>
                      <li>
                        <a href='https://github.com/motdotla/dotenv#readme'>dotenv</a>
                      </li>
                      <li>
                        <a href='https://github.com/expressjs/cors#readme'>cors</a>
                      </li>
                      <li>
                        <a href='https://github.com/auth0/node-jsonwebtoken#readme'>
                          jsonwebtoken
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/dcodeIO/bcrypt.js#readme'>bcryptjs</a>
                      </li>
                      <li>
                        <a href='https://github.com/websockets/ws'>
                          ws: websocket client
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/enisdenjo/graphql-ws#readme'>
                          graphql-ws
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/apollostack/graphql-subscriptions#readme'>
                          graphql-subscriptions
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/kentcdodds/cross-env#readme'>
                          cross-env
                        </a>
                      </li>
                      <li>
                        <a href='https://nodemailer.com/'>nodemailer</a>
                      </li>
                      <li>
                        Dev:
                        <ul>
                          <li>
                            <a href='https://nodemon.io'>nodemon</a>
                          </li>
                          <li>
                            <a href='https://github.com/cypress-io/cypress'>cypress</a>
                          </li>
                          <li>
                            <a href='https://github.com/Zaista/cypress-mongodb'>
                              cypress-mongodb
                            </a>
                          </li>
                          <li>
                            <a href='https://eslint.org'>eslint</a>
                          </li>
                          <li>
                            <a href='https://github.com/cypress-io/eslint-plugin-cypress#readme'>
                              eslint-plugin-cypress
                            </a>
                          </li>
                          <li>
                            <a href='https://github.com/aminya/eslint-plugin-yaml#readme'>
                              eslint-plugin-yaml
                            </a>
                          </li>
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
                  <a href='https://jenniina-books-list-app.onrender.com/'>
                    {EBookApp[language]}{' '}
                    <span style={{ fontSize: '75%' }}>({ESiteMayBeSlow[language]})</span>{' '}
                    &raquo;
                  </a>
                </p>
                <p>
                  <a href='https://github.com/jenniina/Fullstackopen_part11_Library'>
                    Github &raquo;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
