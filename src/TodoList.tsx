import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import classes from './TodoList.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
            <IconButton onClick={() => props.removeTodoList(props.todolistId)}><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        {
            props.tasks.length === 0 ? <><span>please enter data</span></> : <div>
                    {
                        props.tasks.map(t => {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                            }
                            const onRemoveHandler = () => props.removeTask(props.todolistId, t.id)

                            const changeTaskTitle = (title: string) => {
                                props.changeTaskTitle(props.todolistId,  title, t.id)
                            }

                            return <div key={t.id} className={t.isDone ? classes.isDone : ""}>
                                <Checkbox
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <EditableSpan
                                    updateTitle={changeTaskTitle}
                                    title={t.title}/>
                                <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
                            </div>
                        })
                    }
                </div>}
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : "text"} className={props.filter === 'all' ? classes.activeFilter : ""}
                    onClick={() => changeFilterHandler(props.todolistId, 'all')}>All
            </Button>
            <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : "text"}
                    onClick={() => changeFilterHandler(props.todolistId, 'active')}>Active
            </Button>
            <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : "text"}
                    onClick={() => changeFilterHandler(props.todolistId, 'completed')}>Completed
            </Button>
        </div>
    </div>
}
