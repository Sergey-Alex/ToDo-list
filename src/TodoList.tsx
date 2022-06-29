import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './AppWithRedux';
import classes from './TodoList.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./reducers/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducers";


type PropsType = {
    todolistId: string
    title: string
    changeFilter: (id: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

}

export function Todolist(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.task[props.todolistId])

    let allTodoListTasks = tasks
    let tasksForTodolist = allTodoListTasks
    if (props.filter === "active") {
        tasksForTodolist = allTodoListTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodoListTasks.filter(t => t.isDone);
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
        <AddItemForm addItem={(title: string) => dispatch(addTaskAC(title, props.todolistId ))}/>
        {
            tasks.length === 0 ? <><span>please enter data</span></> : <div>
                {
                    tasksForTodolist.map(t => {
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(t.id, props.todolistId, e.currentTarget.checked));
                        }
                        const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.todolistId))

                        const changeTaskTitle = (title: string) => {
                            dispatch(changeTaskTitleAC(t.id, props.todolistId, title))
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
            <Button variant={props.filter === 'all' ? 'contained' : "text"}
                    className={props.filter === 'all' ? classes.activeFilter : ""}
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