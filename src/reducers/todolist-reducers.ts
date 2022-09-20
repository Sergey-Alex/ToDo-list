import {TodoListGetType, todolistsApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

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
    entityStatus: RequestStatusType

}

export type ActionTodolistType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT
    | ReturnType<typeof SetTodoListAC>
    | ReturnType<typeof ChangeTodoListEntityStatus>

export const todolistsReducers = (todolists: Array<TodoListDomainType> = initialState, action: AppActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...todolists]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.newValueFilter} : tl)
        case "CHANGE-TODOLIST-TITLE" :
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'SET-TODOLIST':
            return action.todolist.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return todolists.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return todolists

    }
}
export const AddTodoListAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist}) as const
export const RemoveTodolistAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', id}) as const
export const ChangeTodolistFilterAC = (id: string, newValueFilter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER", id, newValueFilter
}) as const
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE", id, title
}) as const
export const SetTodoListAC = (todolist: Array<TodoListGetType>) => ({type: 'SET-TODOLIST', todolist} as const)
export const ChangeTodoListEntityStatus = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
} as const)

export const fetchTodolistTC = () => {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.getTodolists().then(res => {
            dispatch(SetTodoListAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}
export const createTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(ChangeTodoListEntityStatus(todolistId, 'loading'))
    todolistsApi.deleteTodolist(todolistId).then(res => {
        dispatch(RemoveTodolistAC(todolistId))
        dispatch(setAppStatusAC('succeeded'))
    }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}
export type changeTodolistTypeArg = { id: string, title: string }

export const changeTodoListTitleTC = ({id, title}: changeTodolistTypeArg): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodolist(id, title).then(res => {
        if (res.data.resultCode === 0){
            dispatch(ChangeTodolistTitleAC(id, title))
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setAppStatusAC('succeeded'))
    }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}