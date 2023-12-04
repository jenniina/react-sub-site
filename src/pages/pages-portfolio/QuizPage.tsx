import { Provider } from 'react-redux'
import store from '../../components/Quiz/store'
import { Outlet } from 'react-router-dom'
import './css/quiz.css'

export default function QuizPage() {
  return (
    <Provider store={store}>
      <div>
        <Outlet />
      </div>
    </Provider>
  )
}
