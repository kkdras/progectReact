import s from "./../dilogs.module.css"
import {NavLink} from "react-router-dom";

function Companion(props) {
    return (
        <div className={s.dialogsUser}>
            <NavLink to={`dilogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}


export default Companion;