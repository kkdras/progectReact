import s from "./dialogs.module.css"
import Message from "./massage/massage";
import Companion from "./companion/companion";
import profileStyle from "./../profile/profile.module.css";
import React, {FC} from "react";
import {useForm} from "react-hook-form";
import {sendMassageCreator, sendMessage} from "../../redax/dialogsReducer";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import {useTypesSelector} from "../../types/hooks";
import {useDispatch} from "react-redux";


type DialogsType = {
    sendMassageCreator: (payload:string) => sendMessage
}

let Dialogs:FC<DialogsType> = ({sendMassageCreator}) => {
    useWithAuthRedirect()
    let message = useTypesSelector(state => state.dialogsPage.message)
    let user = useTypesSelector(state => state.dialogsPage.user)
    let dispatch = useDispatch()
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

interface DialogForm {
    submitForm: (data: any) => void
}

let DialogForm:FC<DialogForm> = ({submitForm}) => {
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
