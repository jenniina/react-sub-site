import React from 'react'

import { ITask } from './Interfaces'

export default function Todo({ todo, toggleTodo }: {
    todo: ITask;
    toggleTodo: (arg0: string) => void;
}) {



    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                {todo.name}
            </label>
        </li>
    )
}
