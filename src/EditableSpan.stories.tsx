import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";
import {store} from "./reducers/store";
import {Provider} from "react-redux";


export default {
    title: 'EditableSpan',
    component: EditableSpan
}

const callback = action('updateTitle ')


export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan title='start value' updateTitle={callback}/>

}
