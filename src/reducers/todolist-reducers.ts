import {v1} from "uuid";
import {TodoListGetType, todolistsApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    newValueFilter: FilterValuesType
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export const todolistID1 = v1();
export const todolistID2 = v1();

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

const initialState: Array<TodoListDomainType> = []
export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListGetType & {
    filter: FilterValuesType
}

export type ActionTodolistType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT
    | ReturnType<typeof SetTodoListAC>

export const todolistsReducers = (todolists: Array<TodoListDomainType> = initialState, action: AppActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all'}, ...todolists]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.newValueFilter} : tl)
        case "CHANGE-TODOLIST-TITLE" :
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'SET-TODOLIST':
            return action.todolist.map(t => ({...t, filter: 'all'}))
        default:
            return todolists

    }
}
export const AddTodoListAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist}) as const
export const RemoveTodolistAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', id}) as const
export const ChangeTodolistFilterAC = (id: string, newValueFilter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER", id, newValueFilter}) as const
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE", id, title}) as const
export const SetTodoListAC = (todolist: Array<TodoListGetType>) => ({type: 'SET-TODOLIST', todolist} as const)

export const fetchTodolistTC = () => (dispatch: Dispatch<AppActionsType>) => {
    todolistsApi.getTodolists().then(res => {
        dispatch(SetTodoListAC(res.data))
    })
}

export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistsApi.createTodolist(title).then(res => {
        dispatch(AddTodoListAC(res.data.data.item))
    })
}

export const removeTodolistTC = (todolistId:string): AppThunk => (dispatch)=>{
    todolistsApi.deleteTodolist(todolistId).then(res =>{
        dispatch(RemoveTodolistAC(todolistId))
    })
}
export type changeTodolistTypeArg = {id: string, title: string}

export const changeTodoListTitleTC = ({id, title}: changeTodolistTypeArg): AppThunk => (dispatch)=>{
    todolistsApi.updateTodolist(id, title).then(res => {
        dispatch(ChangeTodolistTitleAC(id, title))
    })
}