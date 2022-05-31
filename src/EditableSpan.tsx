import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    classes?: string
    updateTitle: (title: string) => void

}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [itemTitle, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.updateTitle(itemTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ? <input value={itemTitle} autoFocus onBlur={offEditMode} onChange={onChangeHandler}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;
