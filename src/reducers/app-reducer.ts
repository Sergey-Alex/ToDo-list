import {AppThunk} from "./store";
import {todolistsApi} from "../api/todolists-api";
import {SetTodoListAC} from "./todolist-reducers";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initState = {
    status: 'failed' as RequestStatusType
}
export type InitialStateTypeApp = typeof initState
export type ActionTypeApp = ReturnType<typeof setAppStatusAC>

export const appReducer = (state: InitialStateTypeApp = initState, action: ActionTypeApp): InitialStateTypeApp => {
    switch (action.type) {
        case 'APP/SET-STATUS' :
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const

export const fetchTodoListTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(SetTodoListAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
