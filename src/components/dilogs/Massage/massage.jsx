import s from "../dialogs.module.css"

function Massage(props) {
    return (
        <div className={s.message}>
            {props.m}
        </div>
    )
}
export default Massage;