import s from "../profile.module.css";
import React, {FC} from "react";
import Loading from "../../users/loading";
import {AboutForm} from "./aboutMeForm";
import {useTypesSelector} from "../../../app/hooks";

import {useForm} from "react-hook-form";
import {ProfileTop} from "./profileTop";
import {AboutMe} from "./aboutMe";


type InfoPropsType = {
    isOwn: boolean
}
type addPostPropsType = {
    post: string
}


export let Info:FC<InfoPropsType> = (props) => {
    let edit = useTypesSelector(state => state.profilePage.editMode)
    let userProfile = useTypesSelector(state => state.profilePage.userProfile)
    let imageDefault = "https://persons.life/wp-content/uploads/2021/01/dmitry-nagiev-400x400.jpg"



    if (!userProfile){
        return (<Loading loading={true} />)
    }else {
        return (
            <div className={s.infoWrapper}>
                <ProfileTop
                   src={userProfile.photos.large || imageDefault}
                   isOwn={props.isOwn}
                />
                <div className={s.addPost}>
                    {/*<InfoForm addPost={(data:any) => addPost(data)}/>*/}
                    {edit ||<AboutMe isOwn={props.isOwn} {...userProfile}/>}
                    {props.isOwn && edit && <AboutForm />}
                </div>
            </div>
        )
    }
}

type InfoFormType = {
    addPost: (data: addPostPropsType) => void
}

let InfoForm:FC<InfoFormType> = ({addPost}) => {
    let {handleSubmit,register,formState:{errors}} = useForm()
    return(
        <form onSubmit={handleSubmit(addPost)}>
            <input {...register("post", {maxLength: {
                    value: 20,
                    message:"Пожалуйста поменьше букв"
                }})} placeholder={"Введите свое сообщение"} className={s.texarea} />
            {errors.message && <p>{errors.message.post}</p>}
            <button className={s.add}>submit</button>
        </form>
    )
}


