import { lazy, Suspense, useContext } from 'react'
import styles from '../../components/Todo/css/todo.module.css'
import { ELanguages } from '../../types'
import Accordion from '../../components/Accordion/Accordion'
import { useTheme } from '../../hooks/useTheme'
import { LanguageContext } from '../../contexts/LanguageContext'

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
    <div className={`todo ${type} ${lightMode ? styles.light : ''}`}>
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium flex column gap'>
              <Accordion
                language={language}
                text={t('EClickHereToSeeFeatures')}
                className='features'
                wrapperClass='features-wrap'
              >
                <>
                  <h2>{t('EFeatures')}</h2>
                  <ul className='ul'>
                    <li>{t('EKeyboardAccessible')}</li>
                    <li>
                      {t('ERemoveTaskEitherIndividuallyOrClearAllCompletedTasksAtOnce')}
                    </li>
                    <li>{t('ETasksCanBeEdited')}</li>
                    <li>{t('ETasksCanBeReorganizedByDraggingAndDropping')}</li>
                    <li>{t('EShowsHowManyTasksAreLeftToDo')}</li>
                    <li>{t('EStoresTasksInMongoDBIfTheUserIsLoggedIn')}</li>
                  </ul>
                  <h3>{t('EKeyboardUse')}</h3>
                  <ul className='ul'>
                    <li>{t('EAddTasksByTabbingToTheInputFieldAnd')}</li>
                    <li>{t('ERemoveATaskByTabbingToTheRemoveButtonAnd')}</li>
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
              <h2>{t('ETodoApp')}</h2>
              <Suspense
                fallback={
                  <div className='flex center margin0auto textcenter'>
                    {t('ELoading')}...
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
  )
}
