import React, {ChangeEvent, useState} from 'react';
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
    const [inputValue, setInputValue]  = useState('')

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.addTasks(inputValue)
        setInputValue('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue} onChange = {changeEventHandler}/>
                <button onClick={addTaskHandler}>✅</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span> {t.title} </span>
                        <button onClick={() => props.removeTasks(t.id)}> ❌ </button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={()=> props.changeFilterValue('all')}>All</button>
                <button onClick={()=> props.changeFilterValue('active')}>Active</button>
                <button onClick={()=> props.changeFilterValue('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;