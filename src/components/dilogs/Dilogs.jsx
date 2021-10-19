import s from "./dilogs.module.css"
import Massage from "./Massage/massage";
import Companion from "./Сompanion/companion";
import profileStyle from "./../profile/profile.module.css";
import React from "react";

function Dilogs(props) {
    let newMassage = React.createRef()
    return (

        <div className={s.dialogs}>

            <div className={s.dialogsWrapper}>
                {
                    props.dilogs.user.map(item => <Companion name={item.name} id={item.id} />)
                }
            </div>

            <div className={s.messageWrapper}>

                <div className={profileStyle.addPost}>
                    <textarea ref={newMassage} className={profileStyle.texarea}></textarea>
                    <button onClick={() => alert(newMassage.current.value)} className={profileStyle.add}>Add post</button>
                </div>

                {
                    props.dilogs.massage.map(item => <Massage m={item.massage} id={item.id}/>)
                }
            </div>
        </div>
    )
}

export default Dilogs;