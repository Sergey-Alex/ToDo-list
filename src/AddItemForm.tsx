import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import classes from './TodoList.module.css'
import {AddCircle} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [itemTitle, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (itemTitle.trim() !== "") {
            props.addItem(itemTitle.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.keyCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <TextField value={itemTitle}
                       label = {'Enter value'}
                       variant={"outlined"}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? "error" : ""}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addItem}  color={"primary"}><AddCircle/></IconButton>
            {/*{error && <div className={classes.errorMessage}>{error}</div>}*/}
        </div>
    );
};

export default AddItemForm;
