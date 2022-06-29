import {combineReducers, legacy_createStore} from "redux";
import {tasksReducers} from "./tasks-reducers";
import {todolistsReducers} from "./todolist-reducers";
import {TodoListsType} from "../AppWithRedux";
import {TasksStateType} from "../AppWithRedux";

const rootReducer = combineReducers({
    todolists: todolistsReducers,
    task: tasksReducers
})


export type AppRootState = ReturnType<typeof rootReducer>

 export const store  = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store