import {ActionTypeApp, setAppErrorStatusAC, setAppStatusAC} from "../reducers/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorStatusAC(data.messages[0]))
    } else {
        dispatch(setAppErrorStatusAC('some err'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrUtilsDispatchType) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorStatusAC(error.message))
}

export type ErrUtilsDispatchType = Dispatch<ActionTypeApp>
