import {combineReducers, createStore} from "redux";
import {tasksReducers} from "./tasks-reducers";
import {todolistsReducers} from "./todolist-reducers";
import {TodoListsType} from "../AppWithRedux";
import {TasksStateType} from "../AppWithRedux";

const rootReducer = combineReducers({
    todolists: todolistsReducers,
    task: tasksReducers
})
// type AppRootState = {
//     todolists: Array<TodoListsType>,
//     taskd: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>

 export const store  = createStore(rootReducer)

// @ts-ignore
window.store = store