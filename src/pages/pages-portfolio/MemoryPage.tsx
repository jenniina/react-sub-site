import Memory from '../../components/Memory/Memory'
import { useLanguageContext } from '../../contexts/LanguageContext'
import SEO from '../../components/SEO/SEO'

export default function MemoryPage({ type }: { type: string }) {
  const { t } = useLanguageContext()

  return (
    <>
      <SEO
        title={`${t('MemoryGame')} | ${t('MemoryGameIntro')}`}
        description={t('MemoryGameIntro')}
        canonicalUrl="https://react.jenniina.fi/portfolio/memory"
      />
      <div className={`memory ${type}`}>
        <div className="inner-wrap">
          <Memory />
        </div>
      </div>
    </>
  )
}
