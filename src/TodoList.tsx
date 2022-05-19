import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueTypes} from "./App";
import classes from './TodoList.module.css'

type TaskType = {
    title: string
    id: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (id: string) => void
    changeFilterValue: (value: FilterValueTypes) => void
    addTasks: (value: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

const TodoList = (props: PropsType) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setInputValue(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            props.addTasks(inputValue)
            setInputValue('')
        } else {
           setError(' Не введен текст ')
        }

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const filterValueHandler = (felterValue: FilterValueTypes) => {
        props.changeFilterValue(felterValue)
    }

    const onChangeHandler = (id: string, isDone: boolean) => {
        props.changeStatus(id, isDone)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue}
                       onChange={changeEventHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? classes.error : ''}
                />
                <button onClick={addTaskHandler}>✅</button>
                {error && <div className={classes.errorMessage}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={(e) => onChangeHandler(t.id, e.currentTarget.checked)}/>
                        <span> {t.title} </span>
                        <button onClick={() => props.removeTasks(t.id)}> ❌</button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={() => filterValueHandler('all')}>All</button>
                <button onClick={() => filterValueHandler('active')}>Active</button>
                <button onClick={() => filterValueHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;