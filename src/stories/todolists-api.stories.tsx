// import {useEffect, useState} from "react";
// import {CreateTask, todolistsApi} from "../api/todolists-api";
//
// export default {
//     title: 'API'
// }
//
//
// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': 'fb758589-2463-42a0-929e-f4166fe20e45'
//     }
// }
//
// export const GetTodoList = () => {
//
//     const [state, setState] = useState<any>({name: 'Sergey'});
//
//     useEffect(() => {
//         todolistsApi.getTodolists().then(res => {
//             setState(res.data)
//         })
//     }, []);
//
//     return <div>{JSON.stringify(state)}</div>
//
// }
//
// export const CreateTodoList = () => {
//     const [state, setState] = useState<any>('');
//
//     const createTodoListHandler = (title: string) => {
//         todolistsApi.createTodolist(title)
//             .then(res => {
//                 setState(res.data)
//                 setState('')
//             })
//     }
//
//
//     return <div>
//         <input placeholder='todolist name' value={state} onChange={event => setState(event.currentTarget.value)}/>
//         <button onClick={() => createTodoListHandler(state)}>create todolist</button>
//     </div>
//
// }
//
// export const DeleteTodoList = () => {
//     const [state, setState] = useState<any>({name: 'Sergey'});
//     const [value, setValue] = useState<string>('')
//
//     const deleteTodList = () => {
//         todolistsApi.deleteTodolist(value)
//             .then(res => {
//                 setState(res.data)
//             })
//     }
//     return <div>
//         <input placeholder='enter todolist id' value={value} onChange={e => setValue(e.currentTarget.value)}/>
//         <button onClick={deleteTodList}>delete todolist</button>
//     </div>
//
// }
//
// export const UpdateTodoList = () => {
//     const [state, setState] = useState<any>({name: 'Sergey'});
//     useEffect(() => {
//         todolistsApi.updateTodolist('03cf1ad7-43fb-48a2-8ffb-a88d22558ab8', 'wwww-todolist')
//             .then(res => {
//                 setState(res.data)
//             })
//     }, []);
// }
//
// export const GetTasks = () => {
//     const [state, setState] = useState<any>(null);
//     const [value, setValue] = useState('');
//
//     const getTasks = () => {
//         todolistsApi.getTasks(value)
//             .then(res => {
//                 setState(res.data)
//             })
//     }
//
//     return <div>{JSON.stringify(state)}
//         <input placeholder='enter todolist id' value={value} onChange={event => setValue(event.currentTarget.value)}/>
//         <button onClick={getTasks}>get tasks</button>
//     </div>
// }
//
// export const DeleteTasksAAA = () => {
//     const [state, setState] = useState<any>(null);
//     const [taskId, setTaskId] = useState<string>('');
//     const [todolistId, setTodoListId] = useState<string>('');
//
//     const deleteTasksHandler = () => {
//         todolistsApi.deleteTask(todolistId, taskId)
//             .then(res => {
//                 setState(res.data)
//             })
//
//         return <div>
//             <input placeholder='enter todolist id' value={todolistId} onChange={(event) => {
//                 setTodoListId(event.currentTarget.value)
//             }}/>
//             <input placeholder='enter task id' value={taskId} onChange={(event) => {
//                 setTaskId(event.currentTarget.value)
//             }}/>
//             <button onClick={deleteTasksHandler}>deleteTasks</button>
//         </div>
//     }
// }
//
// export const createTask = () => {
//     const [state, setState] = useState<any>('');
//     const [taskTitle, setTaskTitle] = useState('');
//     const [todolistTitle, setTodoListTitle] = useState('');
//
//     const creatTaskForeTodoListHandler = (todolistTitle: string, taskTitle: string) => {
//         todolistsApi.createTasks(todolistTitle, taskTitle)
//             .then(res => {
//                 setState(res.data)
//             })
//     }
//
//     return <div>
//         <input placeholder='todolist id' value={todolistTitle}
//                onChange={event => setTodoListTitle(event.currentTarget.value)}/>
//         <input placeholder='task name' value={taskTitle} onChange={event => setTaskTitle(event.currentTarget.value)}/>
//         <button onClick={(event) => creatTaskForeTodoListHandler(todolistTitle, taskTitle)}>create task</button>
//     </div>
// }
//
//
// export const UpdateTask = () => {
//     const [state, setState] = useState<any>({name: 'Sergey'});
//     const [taskId, setTaskId] = useState('');
//     const [todolistId, setTodoListId] = useState('');
//     const [taskTitle, setTaskTitle] = useState('');
//
//     const updateTask = () => {
//         todolistsApi.updateTasks(todolistId, taskId, taskTitle)
//             .then(res => {
//                 setState(res.data)
//             })
//     }
//
//     return <div>
//         <input placeholder='enter todolist id' value={todolistId} onChange={event => setTodoListId(event.currentTarget.value)}/>
//         <input placeholder='enter task id' value={taskId} onChange={event => setTaskId(event.currentTarget.value)}/>
//         <input placeholder='new title' value={taskTitle} onChange={event => setTaskTitle(event.currentTarget.value)}/>
//         <button onClick={updateTask}>update task</button>
//     </div>
// }

export default {}