import { lazy, Suspense, useContext } from 'react'
import styles from '../../components/Todo/css/todo.module.css'
import { ELanguages } from '../../types'
import Accordion from '../../components/Accordion/Accordion'
import { useTheme } from '../../hooks/useTheme'
import { LanguageContext } from '../../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'

const TodoApp = lazy(() => import('../../components/Todo/TodoApp'))

export default function TodoPage({
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
  const { t } = useContext(LanguageContext)!

  const lightMode = useTheme()
  return (
    <>
      <Helmet>
        <title>
          {t('TodoApp')} | {t('GetOrganizedOneTaskAtATime')}
        </title>
        <meta name='description' content={t('TodoAppIntro')} />
        <link rel='canonical' href={`https://react.jenniina.fi/portfolio/todo`} />
      </Helmet>
      <div className={`todo ${type} ${lightMode ? styles.light : ''}`}>
        <div className='inner-wrap'>
          <section className='card'>
            <div>
              <div className='medium flex column gap'>
                <Accordion
                  language={language}
                  text={t('ClickHereToSeeFeatures')}
                  className='features'
                  wrapperClass='features-wrap'
                >
                  <>
                    <h2>{t('Features')}</h2>
                    <ul className='ul'>
                      <li>{t('KeyboardAccessible')}</li>
                      <li>
                        {t('RemoveTaskEitherIndividuallyOrClearAllCompletedTasksAtOnce')}
                      </li>
                      <li>{t('TasksCanBeEdited')}</li>
                      <li>{t('TasksCanBeReorganizedByDraggingAndDropping')}</li>
                      <li>{t('ShowsHowManyTasksAreLeftToDo')}</li>
                      <li>{t('StoresTasksInMongoDBIfTheUserIsLoggedIn')}</li>
                    </ul>
                    <h3>{t('KeyboardUse')}</h3>
                    <ul className='ul'>
                      <li>{t('AddTasksByTabbingToTheInputFieldAnd')}</li>
                      <li>{t('RemoveATaskByTabbingToTheRemoveButtonAnd')}</li>
                    </ul>
                  </>
                </Accordion>
                <a href='https://github.com/jenniina/react-sub-site/tree/main/src/components/Todo'>
                  Github
                </a>
              </div>
            </div>
          </section>
          <section className='card'>
            <div>
              <div className='flex column gap'>
                <h2>{t('TodoApp')}</h2>
                <Suspense
                  fallback={
                    <div className='flex center margin0auto textcenter'>
                      {t('Loading')}...
                    </div>
                  }
                >
                  <TodoApp language={language} />
                </Suspense>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
