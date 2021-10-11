import s from "./../dilogs.module.css"

function Massage(props) {
    return (
        <div className={s.message}>
            {props.m}
        </div>
    )
}
export default Massage;