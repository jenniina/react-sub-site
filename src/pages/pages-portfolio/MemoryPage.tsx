import { ELanguages } from '../../types'
import { useLanguageContext } from '../../contexts/LanguageContext'
import Memory from '../../components/Memory/Memory'

export default function MemoryPage({
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
  const { t } = useLanguageContext()

  return (
    <>
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>
          {t("MemoryGame")} | {t("MemoryGameIntro")}
        </title>
        <meta name="description" content={t("MemoryGameIntro")} />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/memory`}
        />
        <meta
          property="og:title"
          content={`${t("MemoryGame")} | react.jenniina.fi`}
        />
        <meta property="og:description" content={t("MemoryGameIntro")} />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/memory`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div className={`memory ${type}`}>
        <div className="inner-wrap">
          <Memory language={language} />
        </div>
      </div>
    </>
  )
}
