import React, {ChangeEvent, useCallback} from "react";
import {deleteTaskTC, UpdateTaskTC} from "./reducers/tasks-reducers";
import classes from "./TodoList.module.css";
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {useTypedDispatch} from "./reducers/store";

type TaskPropsType = {
    todolistId: string
    t: TaskType
}
export const Tasks = React.memo((props: TaskPropsType) => {
    const dispatch = useTypedDispatch()
    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(UpdateTaskTC({taskId: props.t.id, todolistId: props.todolistId, taskParams: {status: e.currentTarget.checked? TaskStatuses.Completed: TaskStatuses.New}}))
    }, [props.t.id, props.todolistId])

    const onRemoveHandler = useCallback(() => dispatch(deleteTaskTC({
        todolistId: props.todolistId,
        taskId: props.t.id
    })), [props.t.id, props.todolistId])

    const onChangeTaskTitle = useCallback((title: string) => {
        dispatch(UpdateTaskTC({taskId: props.t.id, todolistId: props.todolistId, taskParams: {title}}))
    }, [props.t.id, props.todolistId])

    return <div key={props.t.id} className={props.t.status === TaskStatuses.Completed ? classes.isDone : ""}>
        <Checkbox
            onChange={onChangeTaskStatus}

            checked={props.t.status === TaskStatuses.Completed}/>
        <EditableSpan
            updateTitle={onChangeTaskTitle}
            title={props.t.title}/>
        <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
    </div>
})