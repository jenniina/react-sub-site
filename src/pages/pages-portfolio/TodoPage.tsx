import Hero from '../../components/Hero/Hero'
import { ELanguages } from '../../interfaces'
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
  return (
    <div
      className={`${heading
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/[^a-zA-Z]/g, '')} ${type}`}
    >
      <Hero heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium'>
              <h2>Features</h2>
              <ul className='ul'>
                <li>Keyboard accessible</li>
                <li>
                  Remove task either individually or clear all completed tasks at once
                </li>
                <li>Shows how many tasks are left to do</li>
                <li>Stores tasks in MongoDB if the user is logged in</li>
              </ul>
              <h3>Keyboard Use</h3>
              <ul className='ul'>
                <li>
                  Add tasks by tabbing to the input field and pressing either Enter or by
                  tabbing to the Add Task button and pressing Space
                </li>
                <li>
                  Remove a task by tabbing to the remove-button and pressing Space, or
                  remove all completed tasks by pressing Space on the Clear Completed
                  Tasks button
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className='card'>
          <div>
            <div className='medium'>
              <h2>Todo App</h2>
              <TodoApp language={language} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
