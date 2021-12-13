import s from "../dialogs.module.css"

function Message({message}) {
    return (
        <div className={s.message}>{message}</div>
    )
}
export default Message;