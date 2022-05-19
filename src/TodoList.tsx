import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueTypes} from "./App";

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
}

const TodoList = (props: PropsType) => {
    const [inputValue, setInputValue] = useState('')

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.addTasks(inputValue)
        setInputValue('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const filterValueHandler = (felterValue: FilterValueTypes) => {
        props.changeFilterValue(felterValue)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue}
                       onChange={changeEventHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>✅</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span> {t.title} </span>
                        <button onClick={() => props.removeTasks(t.id)}> ❌</button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={()=>filterValueHandler('all')}>All</button>
                <button onClick={()=>filterValueHandler('active')}>Active</button>
                <button onClick={()=>filterValueHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;