import s from "./dialogs.module.css"
import {FC} from "react";

type messagePropsType = {
    message: string
}

export let Message:FC<messagePropsType> = ({message}) => {
    return (
        <div className={s.message}>{message}</div>
    )
}
