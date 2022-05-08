import s from "./dialogs.module.css"
import {NavLink} from "react-router-dom";
import {FC} from "react";

type companionPropsType = {
    name: string
    id: number
}

export let Companion:FC<companionPropsType> = (props) => {
    return (
        <div className={s.dialogsUser}>
            <NavLink to={`dilogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}