import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";

export type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, setTodolists] = useState<Array<todoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})

    }

    function addTask(todoListId: string, titleValue: string) {
        let newTask = {id: v1(), title: titleValue, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskTitle = (todoListId: string, title: string, tId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === tId ? {...t, title: title} : t)})
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    const removeTodoList = (todolistsId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistsId))
        delete tasks[todolistsId]
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: todoListsType = {
            id: newTodoListId,
            title: title,
            filter: 'all',
        }
        setTodolists([...todolists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
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
            <Grid  key={t.id} item>
                <Paper style ={{padding:'10px'}}>
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

export default App;
