import React, {useCallback, useEffect} from 'react';
import './App.css';

import {Todolist} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    ChangeTodolistFilterAC,
    changeTodoListTitleTC,
    createTodolistTC, fetchTodolistTC,
    FilterValuesType,
    removeTodolistTC,
    TodoListDomainType,
} from "./reducers/todolist-reducers";

import {useSelector} from "react-redux";
import {AppRootState, useTypedDispatch} from "./reducers/store";
import {TaskType} from "./api/todolists-api";
import {RequestStatusType} from "./reducers/app-reducer";
import ErrorSnackBar from "./componentx/ErrorSnackBar/ErrorSnackBar";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useTypedDispatch()
    const todolists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todolists)
    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(changeTodoListTitleTC({id: todoListId, title: title}))
    }, [dispatch])

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todoListId, value))
    }, [dispatch])

    const removeTodoList = useCallback((todolistsId: string) => {
        dispatch(removeTodolistTC(todolistsId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    const todoListImage = todolists.map(t => {

        return (
            <Grid key={t.id} item>
                <Paper style={{padding: '10px'}}>
                    <Todolist
                        entityStatus = {t.entityStatus}
                        todolistId={t.id}
                        title={t.title}
                        changeFilter={changeFilter}
                        filter={t.filter}
                        removeTodoList={removeTodoList}
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
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm entityStatus={status}  addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.length ? todoListImage : <span> Create first note </span>}
                </Grid>
            </Container>
            <ErrorSnackBar/>

        </div>
    );
}

export default AppWithRedux;