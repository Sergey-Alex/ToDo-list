import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {ActionTaskType, tasksReducers} from "./tasks-reducers";
import {ActionTodolistType, todolistsReducers} from "./todolist-reducers";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {ActionTypeApp, appReducer} from "./app-reducer";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    todolists: todolistsReducers,
    task: tasksReducers,
    app: appReducer
})


export type AppRootState = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

//все типы экшенов всего App
export type AppActionsType = ActionTaskType | ActionTodolistType | ActionTypeApp
export type TypedDispatch = ThunkDispatch<AppRootState, any, AppActionsType>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

// @ts-ignore
window.store = store