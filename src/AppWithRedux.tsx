import React, {useCallback, useEffect} from 'react';
import './App.css';

import {Todolist} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, fetchTodolistTC, FilterValuesType,
    RemoveTodolistAC, TodoListDomainType,

} from "./reducers/todolist-reducers";

import {useDispatch, useSelector} from "react-redux";
import {AppRootState, useTypedDispatch} from "./reducers/store";
import {TaskType} from "./api/todolists-api";



// export type TodoListsType = {
//     id: string
//     title: string
//    filter: FilterValuesType

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useTypedDispatch()
      const todolists = useSelector<AppRootState, Array<TodoListDomainType>>(state=> state.todolists)

    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, title))
    },[dispatch])

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todoListId, value))
    },[dispatch])

    const removeTodoList = useCallback((todolistsId: string) => {
        dispatch(RemoveTodolistAC(todolistsId))
    },[dispatch])

    const addTodoList =  useCallback( (title: string) => {
        dispatch(AddTodoListAC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistTC())
    },[])

    const todoListImage = todolists.map(t => {

        return (
            <Grid key={t.id} item>
                <Paper style={{padding: '10px'}}>
                    <Todolist
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

export default AppWithRedux;