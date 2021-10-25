import s from "./dialogs.module.css"
import Massage from "./massage/massage";
import Companion from "./companion/companion";
import profileStyle from "./../profile/profile.module.css";
import React from "react";
import {sendMassageCreator,updateNewMassageCreator} from "../../redax/dialogsReducer";

function Dialogs(props) {
    let newMassageText = props.newMassageText;

    const sendMassageClick = () => {
        props.dispatch(sendMassageCreator());
    }

    const updateMassageLetter = (e) => {
        let massage = e.target.value
        props.dispatch(updateNewMassageCreator(massage));
    }
    
    
    return (

        <div className={s.dialogs}>

            <div className={s.dialogsWrapper}>
                {
                    props.dilogs.user.map(item => <Companion name={item.name} id={item.id} />)
                }
            </div>

            <div className={s.messageWrapper}>

                <div className={profileStyle.addPost}>
                    <textarea placeholder={"Напиши свое сообщение"} className={profileStyle.texarea} onChange={updateMassageLetter} value={newMassageText}/>
                    <button onClick={sendMassageClick} className={profileStyle.add}>Add post</button>
                </div>

                {
                    props.dilogs.massage.map(item => <Massage m={item.massage} id={item.id}/>)
                }
            </div>
        </div>
    )
}

export default Dialogs;