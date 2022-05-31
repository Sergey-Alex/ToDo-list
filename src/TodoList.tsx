import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import classes from './TodoList.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (id: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTaskTitle: (todoListId: string, title: string, tId: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const changeFilterHandler = (id: string, fV: FilterValuesType) => {
        props.changeFilter(id, fV)
    }
    const changeTodoListTitle = (title: string) => [
        props.changeTodoListTitle(title, props.todolistId)
    ]

    return <div>
        <h3>
            <EditableSpan title={props.title} updateTitle={changeTodoListTitle}/>
            <button onClick={() => props.removeTodoList(props.todolistId)}>❌</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        {
            props.tasks.length === 0 ? <><span>please enter data</span></> : <ul>
                    {
                        props.tasks.map(t => {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                            }
                            const onRemoveHandler = () => props.removeTask(props.todolistId, t.id)

                            const changeTaskTitle = (title: string) => {
                                props.changeTaskTitle(t.id, title, props.todolistId)
                            }

                            return <li key={t.id} className={t.isDone ? classes.isDone : ""}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <EditableSpan
                                    updateTitle={changeTaskTitle}
                                    title={t.title}/>
                                <button onClick={onRemoveHandler}>❌</button>
                            </li>
                        })
                    }
                </ul>}
        <div>
            <button className={props.filter === 'all' ? classes.activeFilter : ""}
                    onClick={() => changeFilterHandler(props.todolistId, 'all')}>All
            </button>
            <button className={props.filter === 'active' ? classes.activeFilter : ""}
                    onClick={() => changeFilterHandler(props.todolistId, 'active')}>Active
            </button>
            <button className={props.filter === 'completed' ? classes.activeFilter : ""}
                    onClick={() => changeFilterHandler(props.todolistId, 'completed')}>Completed
            </button>
        </div>
    </div>
}
