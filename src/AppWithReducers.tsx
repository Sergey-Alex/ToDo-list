import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, todolistID1, todolistID2,
    todolistsReducers
} from "./reducers/todolist-reducers";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducers} from "./reducers/tasks-reducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./reducers/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.task)


    function removeTask(todoListId: string, id: string) {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }

    function addTask(todoListId: string, titleValue: string) {
        const action = addTaskAC(titleValue, todoListId)
        dispatch(action)
    }

    const changeTaskTitle = (todoListId: string, title: string, tId: string) => {
        const action = changeTaskTitleAC(tId, todoListId, title)
        dispatch(action)
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        const action = ChangeTodolistTitleAC(todoListId, title)
        dispatch(action)
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        const action = changeTaskStatusAC(taskId, todoListId, isDone)
        dispatch(action)
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const action = ChangeTodolistFilterAC(todoListId, value)
        dispatch(action)
    }

    const removeTodoList = (todolistsId: string) => {
        const action = RemoveTodolistAC(todolistsId)
        dispatch(action)
    }

    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }

    const todoListImage = todolists.map(t => {

        let tasksForTodolist = tasks[t.id]
        if (t.filter === "active") {
            tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
        }
        if (t.filter === "completed") {
            tasksForTodolist = tasks[t.id].filter(t => t.isDone);
        }

        return (
            <Grid key={t.id} item>
                <Paper style={{padding: '10px'}}>
                    <Todolist
                        todolistId={t.id}

                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={t.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>

            </Grid>

        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.length ? todoListImage : <span> Create first note </span>}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;
