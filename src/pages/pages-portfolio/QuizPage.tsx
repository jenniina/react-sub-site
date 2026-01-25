import { Outlet } from 'react-router-dom'
import './css/quiz.css'
import { useLanguageContext } from '../../contexts/LanguageContext'
import SEO from '../../components/SEO/SEO'

export default function QuizPage() {
  const { t } = useLanguageContext()

  return (
    <>
      <SEO
        title={`${t('QuizApp')} | ${t('TestYourKnowledge')}`}
        description={`${t('QuizApp')} | ${t('TestYourKnowledge')}`}
        canonicalUrl="https://react.jenniina.fi/portfolio/quiz"
      />
      <div>
        <Outlet />
      </div>
    </>
  )
}
