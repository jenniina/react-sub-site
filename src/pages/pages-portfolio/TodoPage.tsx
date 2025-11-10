import styles from '../../components/Todo/css/todo.module.css'
import { ELanguages } from '../../types'
import Accordion from '../../components/Accordion/Accordion'
import { useTheme } from '../../hooks/useTheme'
import { useLanguageContext } from '../../contexts/LanguageContext'
import TodoApp from '../../components/Todo/TodoApp'

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
  const { t } = useLanguageContext()

  const lightMode = useTheme()
  return (
    <>
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>
          {t("TodoApp")} | {t("GetOrganizedOneTaskAtATime")}
        </title>
        <meta name="description" content={t("TodoAppIntro")} />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/todo`}
        />
        <meta
          property="og:title"
          content={`${t("TodoApp")} | react.jenniina.fi`}
        />
        <meta property="og:description" content={t("TodoAppIntro")} />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/todo`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div className={`todo ${type} ${lightMode ? styles.light : ''}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium flex column gap">
                <Accordion
                  language={language}
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
                <TodoApp language={language} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
