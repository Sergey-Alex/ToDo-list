import {v1} from "uuid";
import {TodoListGetType, todolistsApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType} from "./store";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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
            const newTodoList: TodoListDomainType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                order: 0,
                addedDate: ''
            }
            return [...todolists, newTodoList]
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
export const AddTodoListAC = (title: string): AddTodoListAT => ({
    type: "ADD-TODOLIST",
    title,
    todolistId: v1()
}) as const
export const RemoveTodolistAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', id}) as const
export const ChangeTodolistFilterAC = (id: string, newValueFilter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    newValueFilter
}) as const
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
}) as const
export const SetTodoListAC = (todolist: Array<TodoListGetType>) => ({type: 'SET-TODOLIST', todolist} as const)

export const fetchTodolistTC = () => (dispatch: Dispatch<AppActionsType>) => {
    todolistsApi.getTodolists().then(res => {
        dispatch(SetTodoListAC(res.data))
    })
}