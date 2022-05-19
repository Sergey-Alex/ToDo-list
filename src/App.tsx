import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type FilterValueTypes = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'REST API', isDone: false},
        {id: 5, title: 'Graph QL', isDone: true},
    ])
    const [filter, setFilter] = useState<FilterValueTypes>('all')

    let taskForTodoList = tasks

    if (filter === 'active') taskForTodoList = tasks.filter(t => t.isDone === true)
    if (filter === 'completed') taskForTodoList = tasks.filter(t => t.isDone === false)

    const removeTasks = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const changeFilterValue = (value: FilterValueTypes) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                tasks={taskForTodoList}
                title='What to learn'
                removeTasks={removeTasks}
                changeFilterValue = {changeFilterValue}
            />
        </div>
    );
}

export default App;
