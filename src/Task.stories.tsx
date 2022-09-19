import {action} from "@storybook/addon-actions";
import {Tasks} from "./Tasks";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";



export default {
    title: 'TaskComponent',
    component: Tasks
}

const callback = action('button "\add\" was pressed ')


export const TaskBaseExample = () => {
    return <Provider store={store}>
        <Tasks t={{id: v1(), title: "HTML&CSS",
            status: TaskStatuses.Completed,
            startDate: '',
            completed: false,
            addedDate: '',
            deadline: '',
            order: 0,
            todoListId: 'todolistID1',
            description: 'xcvcxzx',
            priority: TaskPriorities.Low
        } } todolistId={'222'}/>

    </Provider>
}
