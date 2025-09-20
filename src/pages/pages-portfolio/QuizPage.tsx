import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import './css/quiz.css'
import { Helmet } from 'react-helmet-async'
import { LanguageContext } from '../../contexts/LanguageContext'

export default function QuizPage() {
  const { t } = useContext(LanguageContext)!

  return (
    <>
      <Helmet>
        <title>
          {t('QuizApp')} | {t('TestYourKnowledge')}
        </title>
        <meta
          name='description'
          content={`${t('QuizApp')} | ${t('TestYourKnowledge')}`}
        />
        <link rel='canonical' href={`https://react.jenniina.fi/portfolio/quiz`} />
      </Helmet>
      <div>
        <Outlet />
      </div>
    </>
  )
}
