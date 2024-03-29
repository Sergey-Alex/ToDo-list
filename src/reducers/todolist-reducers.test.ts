// import {v1} from "uuid";
// import {FilterValuesType, TodoListsType} from "../AppWithRedux";
// import {
//     AddTodoListAC,
//     ChangeTodolistFilterAC,
//     ChangeTodoListFilterAT, ChangeTodolistTitleAC,
//     RemoveTodolistAC,
//     todolistsReducers
// } from "./todolist-reducers";
//
// let todolistId1: string
// let todolistId2 : string
// let startState: Array<TodoListsType>
//
// beforeEach(() => {
//     todolistId1 = v1();
//     todolistId2 = v1();
//
//      startState = [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ]
// })
//
// test('correct todolist should be removed', () => {
//     const endState = todolistsReducers(startState, RemoveTodolistAC(todolistId2))
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId1);
// });
//
// test('correct todolist should be added', () => {
//
//     let newTodolistTitle = "New Todolist";
//
//     const endState = todolistsReducers(startState, AddTodoListAC(newTodolistTitle))
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodolistTitle);
// });
//
// test('correct filter of todolist should be changed', () => {
//
//     let newFilter: FilterValuesType = "completed";
//     const action: ChangeTodoListFilterAT = ChangeTodolistFilterAC(todolistId2, newFilter)
//     const endState = todolistsReducers(startState, action);
//
//     expect(endState[0].filter).toBe("all");
//     expect(endState[1].filter).toBe(newFilter);
// });
//
//
// test('correct todolist should change its name', () => {
//
//     let newTodolistTitle = "New Todolist";
//
//     const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)
//
//     const endState = todolistsReducers(startState, action);
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
export default {}