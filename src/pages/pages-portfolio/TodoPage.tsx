import { lazy, Suspense } from 'react'
import Hero from '../../components/Hero/Hero'
import {
  EFeatures,
  EKeyboardAccessible,
  EKeyboardUse,
  ELanguages,
  ELoading,
} from '../../interfaces'
// import TodoApp from '../../components/Todo/TodoApp'
import { ETodoApp } from '../../components/Todo/interfaces'
import {
  EAddTasksByTabbingToTheInputFieldAnd,
  ERemoveATaskByTabbingToTheRemoveButtonAnd,
  ERemoveTaskEitherIndividuallyOrClearAllCompletedTasksAtOnce,
  EShowsHowManyTasksAreLeftToDo,
  EStoresTasksInMongoDBIfTheUserIsLoggedIn,
  ETasksCanBeEdited,
  ETasksCanBeReorganizedByDraggingAndDropping,
} from '../../interfaces/todo'
import Accordion from '../../components/Accordion/Accordion'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'

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
  return (
    <div className={`todo ${type}`}>
      <Hero language={language} address='todo' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium flex column gap'>
              <Accordion
                language={language}
                text={EClickHereToSeeFeatures[language]}
                className='features'
              >
                <h2>{EFeatures[language]}</h2>
                <ul className='ul'>
                  <li>{EKeyboardAccessible[language]}</li>
                  <li>
                    {
                      ERemoveTaskEitherIndividuallyOrClearAllCompletedTasksAtOnce[
                        language
                      ]
                    }
                  </li>
                  <li>{ETasksCanBeEdited[language]}</li>
                  <li>{ETasksCanBeReorganizedByDraggingAndDropping[language]}</li>
                  <li>{EShowsHowManyTasksAreLeftToDo[language]}</li>
                  <li>{EStoresTasksInMongoDBIfTheUserIsLoggedIn[language]}</li>
                </ul>
                <h3>{EKeyboardUse[language]}</h3>
                <ul className='ul'>
                  <li>{EAddTasksByTabbingToTheInputFieldAnd[language]}</li>
                  <li>{ERemoveATaskByTabbingToTheRemoveButtonAnd[language]}</li>
                </ul>
              </Accordion>
              <a href='https://github.com/jenniina/react-sub-site/tree/main/src/components/Todo'>
                Github
              </a>
            </div>
          </div>
        </section>
        <section className='card'>
          <div>
            <div className='medium'>
              <h2>{ETodoApp[language]}</h2>
              <Suspense
                fallback={
                  <div className='flex center margin0auto'>{ELoading[language]}...</div>
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
