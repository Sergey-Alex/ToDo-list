import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

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

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const todolistsReducers = (todolists: Array<TodoListsType>, action:ActionType ): Array<TodoListsType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListsType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
            }
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.newValueFilter} : tl)
        case "CHANGE-TODOLIST-TITLE" :
            return  todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return  todolists

    }
}
export const AddTodoListAC = (title: string) : AddTodoListAT => ({type:"ADD-TODOLIST", title, todolistId: v1()})
export const RemoveTodolistAC = (id: string): RemoveTodoListAT  =>({type: 'REMOVE-TODOLIST', id })
export const ChangeTodolistFilterAC = (id:string, newValueFilter:FilterValuesType) : ChangeTodoListFilterAT => ({type: "CHANGE-TODOLIST-FILTER", id, newValueFilter})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleAT => ({type:"CHANGE-TODOLIST-TITLE", id, title})