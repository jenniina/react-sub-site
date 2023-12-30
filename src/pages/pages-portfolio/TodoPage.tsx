import Hero from '../../components/Hero/Hero'
import {
  EFeatures,
  EKeyboardAccessible,
  EKeyboardUse,
  ELanguages,
} from '../../interfaces'
import TodoApp from '../../components/Todo/TodoApp'
import { ETodoApp } from '../../components/Todo/interfaces'
import {
  EAddTasksByTabbingToTheInputFieldAnd,
  ERemoveATaskByTabbingToTheRemoveButtonAnd,
  ERemoveTaskEitherIndividuallyOrClearAllCompletedTasksAtOnce,
  EShowsHowManyTasksAreLeftToDo,
  EStoresTasksInMongoDBIfTheUserIsLoggedIn,
} from '../../interfaces/todo'

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
            <div className='medium'>
              <h2>{EFeatures[language]}</h2>
              <ul className='ul'>
                <li>{EKeyboardAccessible[language]}</li>
                <li>
                  {ERemoveTaskEitherIndividuallyOrClearAllCompletedTasksAtOnce[language]}
                </li>
                <li>{EShowsHowManyTasksAreLeftToDo[language]}</li>
                <li>{EStoresTasksInMongoDBIfTheUserIsLoggedIn[language]}</li>
              </ul>
              <h3>{EKeyboardUse[language]}</h3>
              <ul className='ul'>
                <li>{EAddTasksByTabbingToTheInputFieldAnd[language]}</li>
                <li>{ERemoveATaskByTabbingToTheRemoveButtonAnd[language]}</li>
              </ul>
            </div>
          </div>
        </section>
        <section className='card'>
          <div>
            <div className='medium'>
              <h2>{ETodoApp[language]}</h2>
              <TodoApp language={language} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
