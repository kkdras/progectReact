import s from "./dialogs.module.css"
import Message from "./massage/massage";
import Companion from "./companion/companion";
import profileStyle from "./../profile/profile.module.css";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {sendMassageCreator} from "../../redax/dialogsReducer";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import {createSelector} from "reselect";

let messageSelector = createSelector(
    (state) => state.dialogsPage.message,
    (massages) => massages.filter(item => true)
)

let Dialogs = ({sendMassageCreator}) => {
    let message = useSelector((state) => state.dialogsPage.message.filter(item => true))
    let user = useSelector(state => state.dialogsPage.user)
    let dispatch = useDispatch()
    useWithAuthRedirect()
    console.log("render")
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsWrapper}>
                {
                    user.map(item => <Companion name={item.name} id={item.id} />)
                }
            </div>
            <div className={s.messageWrapper}>
                <div className={profileStyle.addPost}>
                    <DialogForm submitForm={(data) => dispatch(sendMassageCreator(data.message))}/>
                </div>
                {
                    message.map(item => <Message message={item.message}/>)
                }
            </div>
        </div>
    )
}
let DialogForm = ({submitForm}) => {
    let {handleSubmit,register,formState:{errors}} = useForm()
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <input placeholder={"Введи свое сообщение"} {...register("message", {maxLength: {
                value: 20,
                    message:"Пожалуйста поменьше букв"
                }})} className={profileStyle.textarea}/>
            {errors.message && <p>{errors.message.message}</p>}
            <button>submit</button>
        </form>
    )
}
export let DialogsContainer = () => {
    return <Dialogs sendMassageCreator={sendMassageCreator}/>
}
