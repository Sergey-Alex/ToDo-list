import {TasksStateType} from "../AppWithRedux";

import {AddTodoListAT, RemoveTodoListAT, SetTodoListAC} from "./todolist-reducers";
import {
    TaskType,
    todolistsApi,
    UpdateModelTaskType,
    UpdateTaskType
} from "../api/todolists-api";
import {AppActionsType, AppRootState, AppThunk} from "./store";
import {setAppErrorStatusAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>


export type ActionTaskType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | AddTodoListAT
    | RemoveTodoListAT
    | ReturnType<typeof SetTodoListAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof updateTaskAC>

const initialState: TasksStateType = {}

export const tasksReducers = (state: TasksStateType = initialState, action: AppActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return stateCopy
        case 'REMOVE-TODOLIST':
            const copySt = {...state}
            delete copySt[action.id]
            return copySt
        case 'SET-TODOLIST': {
            const copyState = {...state}
            action.todolist.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.task
            return stateCopy
        }
        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todoListID: string) => ({type: 'REMOVE-TASK', taskId, todoListID}) as const
export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task}) as const
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateModelTaskType) => ({
    type: 'UPDATE_TASK',
    todolistId,
    taskId,
    model
} as const)
export const setTaskAC = (task: Array<TaskType>, todolistId: string) => ({type: 'SET-TASK', task, todolistId}) as const

export const fetchTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTasks(todolistId)
        .then((res) => {
            const task = res.data.items
            dispatch(setTaskAC(task, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

type CreateTaskTCArgs = { todolistId: string, title: string }

export const createTaskTC = ({todolistId, title}: CreateTaskTCArgs): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTasks(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
               handleServerAppError(res.data, dispatch)
            }

        })
        .catch((error) => {
           handleServerNetworkError(error, dispatch)
        })
}
export type DeleteTaskTCArgs = { todolistId: string, taskId: string }
export const deleteTaskTC = ({todolistId, taskId}: DeleteTaskTCArgs): AppThunk => (dispatch) => {
    todolistsApi.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
}

export type UpdateTaskArgs = {
    taskId: string,
    todolistId: string,
    taskParams: UpdateModelTaskType

}
export const UpdateTaskTC = ({
                                 taskId,
                                 todolistId,
                                 taskParams
                             }: UpdateTaskArgs): AppThunk => (dispatch, getState: () => AppRootState) => {
    const allTaskFromState = getState().task
    const task = allTaskFromState[todolistId].find(t => t.id === taskId)

    if (!task) {
        return
    }
    const apiModel: UpdateTaskType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...taskParams
    }
    todolistsApi.updateTasks(todolistId, taskId, apiModel)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, apiModel))
            } else {
                handleServerAppError(res.data, dispatch)

            }
        }).catch((error) => {
            handleServerNetworkError(error , dispatch)
    })


}