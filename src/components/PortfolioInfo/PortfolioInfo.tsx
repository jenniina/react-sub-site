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
          <h2>{t('ReactApps')}</h2>

          <p>{t('ReactSpecificAppsMadeWithViteAndTypescript')}</p>
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
