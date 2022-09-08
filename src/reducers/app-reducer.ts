import {AppThunk} from "./store";
import {todolistsApi} from "../api/todolists-api";
import {SetTodoListAC} from "./todolist-reducers";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initState = {
    status: 'failed' as RequestStatusType,
    error : 'null'
}
export type InitialStateTypeApp = {
    status: RequestStatusType
    error: null | string
}
export type ActionTypeApp = ReturnType<typeof setAppStatusAC>  | ReturnType<typeof setAppErrorStatusAC>

export const appReducer = (state: InitialStateTypeApp = initState, action: ActionTypeApp): InitialStateTypeApp => {
    switch (action.type) {
        case 'APP/SET-STATUS' :
            return {...state, status: action.status}
        case 'APP/SET-ERROR' :
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorStatusAC = (error: string | null) => ({type: 'APP/SET-ERROR', error}) as const

export const fetchTodoListTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(SetTodoListAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

