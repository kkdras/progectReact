import s from "./dilogs.module.css"
import Massage from "./Massage/massage";
import Companion from "./Сompanion/companion";

function Dilogs(props) {

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsWrapper}>
                {
                    props.dilogs.user.map(item => <Companion name={item.name} id={item.id} />)
                }
            </div>

            <div className={s.messageWrapper}>
                {
                    props.dilogs.massage.map(item => <Massage m={item.massage} id={item.id}/>)
                }
            </div>
        </div>
    )
}

export default Dilogs;