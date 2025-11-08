import { Outlet } from "react-router-dom";
import { useContext } from "react";
import "./css/quiz.css";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function QuizPage() {
  const { t } = useContext(LanguageContext)!;

  return (
    <>
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>
          {t("QuizApp")} | {t("TestYourKnowledge")}
        </title>
        <meta
          name="description"
          content={`${t("QuizApp")} | ${t("TestYourKnowledge")}`}
        />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/quiz`}
        />
        <meta
          property="og:title"
          content={`${t("QuizApp")} | react.jenniina.fi`}
        />
        <meta
          property="og:description"
          content={`${t("QuizApp")} | ${t("TestYourKnowledge")}`}
        />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/quiz`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div>
        <Outlet />
      </div>
    </>
  );
}
