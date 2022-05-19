import React from 'react';
import {FilterValueTypes} from "./App";

type TaskType = {
    title: string
    id: number
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (id: number) => void
    changeFilterValue: (value: FilterValueTypes) => void
}

const TodoList = (props: PropsType) => {



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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