import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListAC, todolistID1, todolistID2} from "./todolist-reducers";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsApi,
    UpdateModelTaskType,
    UpdateTaskType
} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootState, AppThunk} from "./store";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
// export type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
// export type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>


export type ActionTaskType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    // | ReturnType<typeof changeTaskStatusAC>
    // | ReturnType<typeof changeTaskTitleAC>
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
        // case "CHANGE-TASK-STATUS":
        //     return {
        //         ...state, [action.todoListID]: state[action.todoListID]
        //             .map(t => action.taskID === t.id ? {...t, status: TaskStatuses.Completed} : t)
        //     }
        // case "CHANGE-TASK-TITLE":
        //     return {
        //         ...state,
        //         [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
        //             ...t,
        //             title: action.newTitle
        //         } : t)
        //     }
        case 'UPDATE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
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
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateModelTaskType) => ({type: 'UPDATE_TASK', todolistId, taskId, model}as const)
// export const changeTaskStatusAC = (taskID: string, todoListID: string, isDone: boolean) => ({
//     type: "CHANGE-TASK-STATUS",
//     taskID,
//     todoListID,
//     isDone
// }) as const
// export const changeTaskTitleAC = (taskID: string, todoListID: string, newTitle: string) => ({
//     type: "CHANGE-TASK-TITLE",
//     taskID,
//     todoListID,
//     newTitle
// }) as const
export const setTaskAC = (task: Array<TaskType>, todolistId: string) => ({type: 'SET-TASK', task, todolistId}) as const


export const fetchTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsApi.getTasks(todolistId).then((res) => {
        const task = res.data.items
        dispatch(setTaskAC(task, todolistId))
    })
}

type CreateTaskTCArgs = { todolistId: string, title: string }
export const createTaskTC = ({todolistId, title}: CreateTaskTCArgs): AppThunk => (dispatch) => {
    todolistsApi.createTasks(todolistId, title).then(res => {
        const task = res.data.data.item
        dispatch(addTaskAC(task))
    })
}
export type DeleteTaskTCArgs = { todolistId: string, taskId: string }
export const deleteTaskTC = ({todolistId, taskId}: DeleteTaskTCArgs): AppThunk => (dispatch) => {
    todolistsApi.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
}

export type UpdateTaskArgs  = {
    taskId: string,
    todolistId: string,
    taskParams: UpdateModelTaskType

}
export const UpdateTaskTC = ({taskId, todolistId, taskParams}:UpdateTaskArgs): AppThunk => (dispatch, getState: () => AppRootState) => {
    const allTaskFromState = getState().task
    const task = allTaskFromState[todolistId].find(t=> t.id === taskId)

    if (!task) {
        return
    }
    // {...task, ...taskParams}
    const apiModel: UpdateTaskType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...taskParams
    }
    todolistsApi.updateTasks(todolistId, taskId, apiModel).then(res=> {
        dispatch(updateTaskAC(todolistId, taskId, apiModel))
    })


}