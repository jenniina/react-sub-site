import styles from '../../components/Todo/css/todo.module.css'
import Accordion from '../../components/Accordion/Accordion'
import { useTheme } from '../../hooks/useTheme'
import { useLanguageContext } from '../../contexts/LanguageContext'
import TodoApp from '../../components/Todo/TodoApp'
import SEO from '../../components/SEO/SEO'

export default function TodoPage({ type }: { type: string }) {
  const { t } = useLanguageContext()

  const lightMode = useTheme()
  return (
    <>
      <SEO
        title={`${t('TodoApp')} | ${t('GetOrganizedOneTaskAtATime')}`}
        description={t('TodoAppIntro')}
        canonicalUrl="https://react.jenniina.fi/portfolio/todo"
        ogTitle={`${t('TodoApp')} | react.jenniina.fi`}
      />
      <div className={`todo ${type} ${lightMode ? styles.light : ''}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium flex column gap">
                <Accordion
                  text={t('ClickHereToSeeFeatures')}
                  className="features"
                  wrapperClass="features-wrap"
                >
                  <>
                    <h2>{t('Features')}</h2>
                    <ul className="ul">
                      <li>{t('KeyboardAccessible')}</li>
                      <li>
                        {t(
                          'RemoveTaskEitherIndividuallyOrClearAllCompletedTasksAtOnce'
                        )}
                      </li>
                      <li>{t('TasksCanBeEdited')}</li>
                      <li>{t('TasksCanBeReorganizedByDraggingAndDropping')}</li>
                      <li>{t('ShowsHowManyTasksAreLeftToDo')}</li>
                      <li>{t('StoresTasksInMongoDBIfTheUserIsLoggedIn')}</li>
                    </ul>
                    <h3>{t('KeyboardUse')}</h3>
                    <ul className="ul">
                      <li>{t('AddTasksByTabbingToTheInputFieldAnd')}</li>
                      <li>{t('RemoveATaskByTabbingToTheRemoveButtonAnd')}</li>
                    </ul>
                  </>
                </Accordion>
                <a href="https://github.com/jenniina/react-sub-site/tree/main/src/components/Todo">
                  Github
                </a>
              </div>
            </div>
          </section>
          <section className="card">
            <div>
              <div className="flex column gap">
                <h2>{t('TodoApp')}</h2>
                <TodoApp />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
