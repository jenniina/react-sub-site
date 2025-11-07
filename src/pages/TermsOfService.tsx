import { ELanguages } from "../types";
import { useTheme } from "../hooks/useTheme";
import styles from "./css/disclaimer.module.css";
import {
  EContactMe,
  EContactMeText,
  EEnFi,
  EEnFiAcceptanceOfTerms,
  EEnFiAcceptanceOfTermsText,
  EEnFiCustomer,
  EEnFiCustomerCompany,
  EEnFiChangesToTerms,
  EEnFiChangesToTermsText,
  EEnFiProductionBeginsWhen,
  EEnFiSupplier,
  EEnFiTermination,
  EEnFiTerminationText,
  EEnFiUseOfService,
  EEnFiUseOfServiceText,
  EEnFiWelcomeToTermsOfService,
  EEnFiCustomerResponsibleForCopyright,
  EEnFiSupplierNotResponsibleForErrors,
  EEnFiSupplierNotResponsibleForUpdates,
  EEnFiOrderIsBinding,
  EEnFiColorsMayVaryInPrintedWorks,
  EEnFiPrintingCostsNotIncluded,
  EEnFiSupplierMayUseProductInMarketing,
  EEnFiSupplierMayHelpWithHostingAndPrintingSolutions,
  EETermsOfService,
} from "../types/fien";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import * as HelmetAsync from "react-helmet-async";
const { Helmet } = HelmetAsync;

export function TermsProducts({ language }: { language: ELanguages }) {
  const lang: EEnFi = language === "fi" ? EEnFi.fi : EEnFi.en;

  return (
    <>
      <Helmet prioritizeSeoTags={true}>
        <title>{EETermsOfService[lang]}</title>
        <meta
          name="description"
          content={`${EEnFiWelcomeToTermsOfService[lang]} | ${EEnFiCustomer[lang]}`}
        />
        <link rel="canonical" href={`https://react.jenniina.fi/terms`} />
        <meta property="og:title" content={EETermsOfService[lang]} />
        <meta
          property="og:description"
          content={`${EEnFiWelcomeToTermsOfService[lang]} | ${EEnFiCustomer[lang]}`}
        />
        <meta property="og:url" content={`https://react.jenniina.fi/terms`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <p>
        <strong>{EEnFiSupplier[lang]}:</strong> Jenniina Laine <br />
        <strong>{EEnFiCustomer[lang]}:</strong> {EEnFiCustomerCompany[lang]}
      </p>
      <p>{EEnFiProductionBeginsWhen[lang]}</p>
      <p>{EEnFiCustomerResponsibleForCopyright[lang]}</p>
      <p>{EEnFiSupplierNotResponsibleForErrors[lang]}</p>
      <p>{EEnFiSupplierNotResponsibleForUpdates[lang]}</p>
      <p>
        {EEnFiPrintingCostsNotIncluded[lang]}{" "}
        {EEnFiSupplierMayHelpWithHostingAndPrintingSolutions[lang]}
      </p>
      <p>{EEnFiColorsMayVaryInPrintedWorks[lang]}</p>
      <p>{EEnFiSupplierMayUseProductInMarketing[lang]}</p>
      <p>{EEnFiOrderIsBinding[lang]}</p>
    </>
  );
}

export default function TermsOfService({
  heading,
  text,
  type,
  language,
}: {
  heading: string;
  text: string;
  type: string;
  language: ELanguages;
}) {
  const { t } = useContext(LanguageContext)!;

  const lightTheme = useTheme();

  const lang: EEnFi = language === "fi" ? EEnFi.fi : EEnFi.en;

  return (
    <>
      <div className={`terms ${type} ${lightTheme ? styles.light : ""}`}>
        <div className="inner-wrap">
          <section className={`card`}>
            <div>
              <p>{EEnFiWelcomeToTermsOfService[lang]}</p>
              <p>
                {t("SeeAlso")}: <Link to="/disclaimer">{t("Disclaimer")}</Link>
              </p>

              <h2>{EEnFiAcceptanceOfTerms[lang]}</h2>
              <p>{EEnFiAcceptanceOfTermsText[lang]}</p>

              <h2>{EEnFiChangesToTerms[lang]}</h2>
              <p>{EEnFiChangesToTermsText[lang]}</p>

              <h2>{EEnFiUseOfService[lang]}</h2>
              <p>{EEnFiUseOfServiceText[lang]}</p>

              <h2>{EEnFiTermination[lang]}</h2>
              <p>{EEnFiTerminationText[lang]}</p>

              <h2>{t("Products")}</h2>
              <TermsProducts language={language} />

              <h2>{EContactMe[lang]}</h2>
              <p>
                {EContactMeText[lang]}{" "}
                <Link to="/contact">{EContactMe[lang].toLowerCase()}</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
