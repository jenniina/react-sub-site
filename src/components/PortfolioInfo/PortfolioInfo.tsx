import styles from '../../pages/css/portfolio.module.css'
import { Link } from 'react-router-dom'
import Accordion from '../Accordion/Accordion'

import { useLanguageContext } from '../../contexts/LanguageContext'
import {
  getPortfolioTitle,
  portfolioItems,
  renderPortfolioIcon,
} from '../../data/portfolioItems'

export default function Portfolio() {
  const { t } = useLanguageContext()

  return (
    <section className={`card ${styles.card}`}>
      <div>
        <div className={styles.notes}>
          <p className={styles.introparagraph}>
            {t('ThisSiteFocusesOnReactApplications')} <br /> <br />
            <a href="https://jenniina.fi/#portfolio">{t('MainSite')}</a>
            <br />
            <br />
            {t('PleaseReportAnyIssuesWithTheSiteToJenniina')}:{' '}
            <Link to="/portfolio/select?survey=true">
              {t('Survey').toLowerCase()}
            </Link>{' '}
          </p>
          <h2>React Apps</h2>

          <p>{t('ReactSpecificAppsMadeWithViteAndTypescript')}</p>
          <Accordion
            text={t('Dependencies')}
            className="dependencies"
            wrapperClass="dependencies-wrap"
          >
            <div className={styles.dependencies}>
              <h3 id="list-libraries-label">{t('Dependencies')}:</h3>
              <ul id="list-libraries" aria-labelledby="list-libraries-label">
                <li>react</li>
                <li>react-icons</li>
                <li>react-dom</li>
                <li>react-router-dom</li>
                <li>react-redux</li>
                <li>@reduxjs/toolkit</li>
                <li>axios</li>
                <li>dom-to-image-more</li>
                <li>react-helmet-async</li>
                <li>uuid</li>
              </ul>
              <h3 id="list-dev-libraries-label">{t('Dependencies')} (dev):</h3>
              <ul
                id="list-dev-libraries"
                aria-labelledby="list-dev-libraries-label"
              >
                <li>@types/eslint-plugin-jsx-a11y</li>
                <li>@types/react</li>
                <li>@types/react-dom</li>
                <li>@types/uuid</li>
                <li>@vitejs/plugin-react</li>
                <li>cross-env</li>
                <li>esbuild</li>
                <li>eslint</li>
                <li>eslint-config-prettier</li>
                <li>eslint-plugin-jsx-a11y</li>
                <li>eslint-plugin-prettier</li>
                <li>eslint-plugin-react</li>
                <li>eslint-plugin-react-hooks</li>
                <li>globals</li>
                <li>jiti</li>
                <li>knip</li>
                <li>prettier</li>
                <li>rollup-plugin-copy</li>
                <li>terser</li>
                <li>typescript</li>
                <li>typescript-eslint</li>
                <li>vike</li>
                <li>vite</li>
              </ul>

              <h3 id="list-node-libraries-label">
                {t('Dependencies')} (Backend Node.js):
              </h3>
              <ul
                id="list-node-libraries"
                aria-labelledby="list-node-libraries-label"
              >
                <li>bcryptjs</li>
                <li>cors</li>
                <li>dotenv</li>
                <li>express</li>
                <li>express-validator</li>
                <li>flatted</li>
                <li>jsonwebtoken</li>
                <li>mongoose</li>
                <li>nodemailer</li>
                <li>sanitize-html</li>
              </ul>

              <h3 id="list-node-dev-libraries-label">
                {t('Dependencies')} (Backend Node.js dev):
              </h3>
              <ul
                id="list-node-dev-libraries"
                aria-labelledby="list-node-dev-libraries-label"
              >
                <li>@types/bcryptjs</li>
                <li>@types/cors</li>
                <li>@types/express</li>
                <li>@types/jsonwebtoken</li>
                <li>@types/node</li>
                <li>concurrently</li>
                <li>nodemon</li>
                <li>typescript</li>
              </ul>
            </div>
          </Accordion>
        </div>
        <ul className={`${styles.list}`}>
          {portfolioItems.map((item) => (
            <li
              key={item.id}
              className={
                item.listClassName === 'multistep'
                  ? styles.multistep
                  : undefined
              }
            >
              <Link to={item.url}>
                {renderPortfolioIcon(item.icon)}
                <span>
                  {item.id === 'composer'
                    ? `${getPortfolioTitle(item, t)} (${t('Website')})`
                    : getPortfolioTitle(item, t)}
                </span>
              </Link>
              <p>{item.description(t)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
