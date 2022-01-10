import s from "./dialogs.module.css"
import {Message} from "./massage/massage";
import {Companion} from "./companion/companion";
import profileStyle from "./../profile/profile.module.css";
import React, {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {startListeningMessage, stopListeningMessage} from "../../redax/dialogsReducer";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import {useTypesSelector} from "../../types/hooks";
import {useDispatch} from "react-redux";
import {ChatApi} from "../../dal/chat-api";


export let Dialogs:FC = () => {
    useWithAuthRedirect()
    let message = useTypesSelector(state => state.dialogsPage.message)
    let status = useTypesSelector(state => state.dialogsPage.status)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(startListeningMessage())
        return () => {
            dispatch(stopListeningMessage())
        }
    },[])
    let submitForm:(data: {message:string}) => void = (data) => {
        if(!data.message) return
        ChatApi.sendMessage(data.message)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.messageWrapper}>
                <div className={profileStyle.addPost}>
                    <DialogForm ready={!(status === "ready")} submitForm={submitForm}/>
                </div>
                {
                    message.map(item => <Message message={item.message}/>)
                }
            </div>
        </div>
    )
}

interface DialogForm {
    submitForm: (data: {message:string}) => void
    ready: boolean
}

let DialogForm:FC<DialogForm> = ({submitForm,ready}) => {
    let {handleSubmit,register,formState:{errors}} = useForm()
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <input placeholder={"Введи свое сообщение"} {...register("message", {maxLength: {
                    value: 20,
                    message:"Пожалуйста поменьше букв"
                }})} className={profileStyle.textarea}/>
            {errors.message && <p>{errors.message.message}</p>}
            <button disabled={ready}>send</button>
        </form>
    )
}

