import {TasksStateType, TodoListsType} from "../App";
import {AddTodoListAC, todolistsReducers} from "./todolist-reducers";
import {tasksReducers} from "./tasks-reducers";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListsType> = []

    const action = AddTodoListAC('new todolist')

    const endTasksState = tasksReducers(startTasksState, action)
    const endTodolistsState = todolistsReducers(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
