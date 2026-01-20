import styles from "../../pages/css/portfolio.module.css"
import { Link } from "react-router-dom"
import Accordion from "../Accordion/Accordion"

import { useLanguageContext } from "../../contexts/LanguageContext"
import {
  getPortfolioTitle,
  portfolioItems,
  renderPortfolioIcon,
} from "../../data/portfolioItems"

export default function Portfolio() {
  const { t } = useLanguageContext()

  return (
    <section className={`card ${styles.card}`}>
      <div>
        <div className={styles.notes}>
          <p className={styles.introparagraph}>
            {t("ThisSiteFocusesOnReactApplications")} <br /> <br />
            <a href="https://jenniina.fi/#portfolio">{t("MainSite")}</a>
            <br />
            <br />
            {t("PleaseReportAnyIssuesWithTheSiteToJenniina")}:{" "}
            <Link to="/portfolio/select?survey=true">
              {t("Survey").toLowerCase()}
            </Link>{" "}
          </p>
          <h2>React Apps</h2>

          <p>{t("ReactSpecificAppsMadeWithViteAndTypescript")}</p>
          <Accordion
            text={t("Dependencies")}
            className="dependencies"
            wrapperClass="dependencies-wrap"
          >
            <>
              <p id="list-libraries-label">{t("Dependencies")}:</p>
              <ul id="list-libraries" aria-labelledby="list-libraries-label">
                <li>react-icons</li>
                <li>react-dom</li>
                <li>react-router-dom</li>
                <li>react-redux</li>
                <li>@reduxjs/toolkit</li>
                <li>axios</li>
                <li>uuid</li>
              </ul>
              <p id="list-libraries-label2">{t("Dependencies")} (Node.js):</p>
              <ul id="list-libraries2" aria-labelledby="list-libraries-label2">
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
            </>
          </Accordion>
        </div>
        <ul className={`${styles.list}`}>
          {portfolioItems.map((item) => (
            <li
              key={item.id}
              className={
                item.listClassName === "multistep"
                  ? styles.multistep
                  : undefined
              }
            >
              <Link to={item.url}>
                {renderPortfolioIcon(item.icon)}
                <span>
                  {item.id === "composer"
                    ? `${getPortfolioTitle(item, t)} (${t("Website")})`
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
