import s from "./dialogs.module.css"
import Massage from "./massage/massage";
import Companion from "./companion/companion";
import profileStyle from "./../profile/profile.module.css";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../utils/forms/textarea";
import {maxLengthCreator, required} from "../utils/validations/main";

let maxLength = maxLengthCreator(10)
function Dialogs(props) {
    return (

        <div className={s.dialogs}>

            <div className={s.dialogsWrapper}>
                {
                    props.user.map(item => <Companion name={item.name} id={item.id} />)
                }
            </div>

            <div className={s.messageWrapper}>

                <div className={profileStyle.addPost}>
                    <DialogReduxForm onSubmit={(post) => props.sendMassageCreator(post.myMassage)}/>
                </div>
                {
                    props.massage.map(item => <Massage m={item.massage} id={item.id}/>)
                }
            </div>
        </div>
    )
}
let DialogForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field validate={[required,maxLength]} placegolder={"Введи свое сообщение"} component={Textarea} name={"myMassage"} className={profileStyle.textarea}/>
            <button>submit</button>
        </form>
    )
}
let DialogReduxForm = reduxForm({form:"dialog"})(DialogForm)
export default Dialogs;
