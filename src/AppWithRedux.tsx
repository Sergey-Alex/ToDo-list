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
    RemoveTodolistAC,
    todolistsReducers
} from "./reducers/todolist-reducers";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducers} from "./reducers/tasks-reducers";

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

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, dispatchToTodoListReducer] = useReducer(todolistsReducers, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducers, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todoListId: string, id: string) {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasksReducer(action)
    }

    function addTask(todoListId: string, titleValue: string) {
        const action = addTaskAC(titleValue, todoListId)
        dispatchToTasksReducer(action)
    }

    const changeTaskTitle = (todoListId: string, title: string, tId: string) => {
        const action = changeTaskTitleAC(tId, todoListId, title)
        dispatchToTasksReducer(action)
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        const action = ChangeTodolistTitleAC(todoListId, title)
        dispatchToTodoListReducer(action)
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        const action = changeTaskStatusAC(taskId, todoListId, isDone)
        dispatchToTasksReducer(action)
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const action = ChangeTodolistFilterAC(todoListId, value)
        dispatchToTodoListReducer(action)
    }

    const removeTodoList = (todolistsId: string) => {
        const action = RemoveTodolistAC(todolistsId)
        dispatchToTodoListReducer(action)
        dispatchToTasksReducer(action)
    }

    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodoListReducer(action)


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
