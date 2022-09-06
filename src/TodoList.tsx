import React, {useCallback, useEffect} from 'react';
import classes from './TodoList.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, useTypedDispatch} from "./reducers/store";
import {addTaskAC, createTaskTC, fetchTaskTC} from "./reducers/tasks-reducers";
import {Tasks} from "./Tasks";
import {TaskStatuses, TaskType, todolistsApi} from './api/todolists-api';
import {AddTodoListAC, fetchTodolistTC, FilterValuesType, SetTodoListAC} from "./reducers/todolist-reducers";


type PropsType = {
    todolistId: string
    title: string
    changeFilter: (id: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useTypedDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.task[props.todolistId])


    let allTodoListTasks = tasks
    let tasksForTodolist = allTodoListTasks
    if (props.filter === "active") {
        tasksForTodolist = allTodoListTasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodoListTasks.filter(t => t.status === TaskStatuses.Completed);
    }

    useEffect(() => {
        dispatch(fetchTaskTC(props.todolistId))
    },[])


    const changeFilterHandler = useCallback((id: string, fV: FilterValuesType) => {
        props.changeFilter(id, fV)
    }, [props.changeFilter])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todolistId)
    }, [props.changeTodoListTitle, props.todolistId])


    return <div>
        <h3>
            <EditableSpan title={props.title} updateTitle={changeTodoListTitle}/>
            <IconButton onClick={() => props.removeTodoList(props.todolistId)}><Delete/></IconButton>
        </h3>
        <AddItemForm
            addItem={useCallback((title: string) => dispatch(createTaskTC({title: title,todolistId:  props.todolistId})), [props.todolistId])}/>
        {
            tasks.length === 0 ? <><span>please enter data</span></> : <div>
                {
                    tasksForTodolist.map(t => {
                        return <Tasks t={t} todolistId={props.todolistId} key={t.id}/>
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
})

