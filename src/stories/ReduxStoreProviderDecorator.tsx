// import {Provider} from "react-redux";
// import {AppRootState, store} from "../reducers/store";
// import {combineReducers, createStore, legacy_createStore} from "redux";
// import {todolistID1, todolistID2, todolistsReducers} from "../reducers/todolist-reducers";
// import {tasksReducers} from "../reducers/tasks-reducers";
// import {v1} from "uuid";
//
// const rootReducer = combineReducers({
//     todolists: todolistsReducers,
//     task: tasksReducers
// })
//
// const initialGlobalState = {
//     todolists: [
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ],
//     task: {
//         [todolistID1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Rest API", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false},
//         ],
//         [todolistID2]: [
//             {id: v1(), title: "HTML&CSS2", isDone: true},
//             {id: v1(), title: "JS2", isDone: true},
//             {id: v1(), title: "ReactJS2", isDone: false},
//             {id: v1(), title: "Rest API2", isDone: false},
//             {id: v1(), title: "GraphQL2", isDone: false},
//         ]
//     }
// }
//
// export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState)
//
// export const ReduxStoreProviderDecorator = (storyFn: any) => {
//     return <Provider store={storyBookStore}>{storyFn()}</Provider>
// }

export default {}