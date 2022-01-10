import s from "./../profile.module.css";
import React, {ChangeEvent, FC} from "react";
import Loading from "../../users/loading";
import Status from "./post/status/status";
import {AboutForm, AboutMe} from "./profileForm/profileForm";
import {useTypesSelector} from "../../../types/hooks";
import {
    ProfileActions,
    setPhotoProfile,
    updateStatusProfile
} from "../../../redax/profileReducer";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
type InfoPropsType = {
    createActionAddPost: (text:string) => ReturnType<typeof ProfileActions.createActionAddPost>
    setPhotoProfile: typeof setPhotoProfile
    updateStatusProfile: typeof updateStatusProfile
    toggleEditMode: () => ReturnType<typeof ProfileActions.toggleEditMode>
    putProfileObject: any
    isOwn: boolean
}

let Info:FC<InfoPropsType> = (props) => {
    let status = useTypesSelector(state => state.profilePage.status)
    let edit = useTypesSelector(state => state.profilePage.editMode)
    let dispatch = useDispatch()
    let addPost = (data:any) => {
        dispatch(props.createActionAddPost(data.post))
    }
    let userProfile = useTypesSelector(state => state.profilePage.userProfile)
    let putPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length){
            dispatch(props.setPhotoProfile(e.target.files[0]))
        }
    }
    if (!userProfile){
        return (<Loading loading={true} />)
    }else {
        return (
            <div className={s.infoWrapper}>
                <div className={s.profile__banner}>
                    <img src={userProfile.photos.large || "https://persons.life/wp-content/uploads/2021/01/dmitry-nagiev-400x400.jpg"} alt=""/>
                    {props.isOwn || <input type={"file"} onChange={putPhoto}/>}
                </div>
                <div className={s.infoText}>
                    <Status status={status} updateStatusProfile={props.updateStatusProfile}/>
                </div>
                <div className={s.addPost}>
                    <InfoForm addPost={(data:any)=>addPost(data)}/>
                    {edit ||<AboutMe {...userProfile}/>}
                    {!props.isOwn && !edit && <button onClick={() => dispatch(props.toggleEditMode())}>Отредактировать мои данные</button>}
                    {!props.isOwn && edit && <AboutForm putProfileObject={props.putProfileObject}/>}
                </div>
            </div>
        )
    }
}

type InfoFormType = {
    addPost: (data:any) => void
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

export default Info;



