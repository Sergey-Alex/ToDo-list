import axios from "axios";
import {TodoListDomainType} from "../reducers/todolist-reducers";
import  { AxiosResponse } from 'axios'


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fb758589-2463-42a0-929e-f4166fe20e45'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodoListGetType = {
    id: string
    title: string
    addedDate: string
    order: number

}

export type _TodoListCreateType = {
    resultCode: number
    messages: string[]
    data: { item: TodoListGetType }
}

export type _TodoListDeleteUpdateType = {
    resultCode: number
    messages: string[]
    data: {}
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later

}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]

}

export type CreateTask = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate:string
    deadline: string
}
//исправить дублирование
export type UpdateTaskType = {
    title:string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type UpdateModelTaskType = {
    title?:string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodoListGetType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListGetType }>>('todo-lists', {title: title})
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`,
            {title: title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
    },
    deleteTask(todoListsId:string, taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListsId}/tasks/${taskId}`)
    },
    createTasks(todoListId: string, title:string){
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`,{title})
    },
    updateTasks(todolistId: string, taskId: string, params: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, params)
    },
}