import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type FilterValueTypes = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'REST API', isDone: false},
        {id: v1(), title: 'Graph QL', isDone: true},
    ])
    const [filter, setFilter] = useState<FilterValueTypes>('all')

    let taskForTodoList = tasks

    if (filter === 'active') taskForTodoList = tasks.filter(t => t.isDone === true)
    if (filter === 'completed') taskForTodoList = tasks.filter(t => t.isDone === false)

    const removeTasks = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const changeFilterValue = (value: FilterValueTypes) => {
        setFilter(value)
    }

    const addTasks = (value: string) => {
        setTasks([{id: v1(), title: value, isDone: false} ,...tasks])
    }

    return (
        <div className="App">
            <TodoList
                tasks={taskForTodoList}
                title='What to learn'
                removeTasks={removeTasks}
                changeFilterValue = {changeFilterValue}
                addTasks = {addTasks}
            />
        </div>
    );
}

export default App;
