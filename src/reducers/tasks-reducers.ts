import {FilterValuesType, TasksStateType, TodoListsType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolist-reducers";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>


export type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskTitle | ChangeTaskStatus | AddTodoListAT |RemoveTodoListAT

export const tasksReducers = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => action.taskID === t.id ? {...t, isDone: action.isDone} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        case "ADD-TODOLIST":
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return  stateCopy
        case 'REMOVE-TODOLIST':
            const copySt = {...state}
            delete copySt[action.id]
            return copySt
        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todoListID: string) => ({type: 'REMOVE-TASK', taskId, todoListID}) as const
export const addTaskAC = (title: string, todoListID: string) => ({type: "ADD-TASK", title, todoListID}) as const
export const changeTaskStatusAC = (taskID: string, todoListID: string, isDone: boolean) => ({
    type: "CHANGE-TASK-STATUS",
    taskID,
    todoListID,
    isDone
}) as const
export const changeTaskTitleAC = (taskID: string, todoListID: string, newTitle: string) => ({
    type: "CHANGE-TASK-TITLE",
    taskID,
    todoListID,
    newTitle
}) as const