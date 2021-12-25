import s from "../../profile.module.css";
import React, {FC} from "react";
import {useForm} from "react-hook-form";
import {getName} from "../../../utils/forms/getName";
import {userProfileType} from "../../../../types/types";
import {useTypesSelector} from "../../../../types/hooks";
import {useDispatch} from "react-redux";


type AboutFormPropsType = {
    putProfileObject: (object: object,id: number) => {
        resultCode?: 1
        messages: ['Something wrong'],
        data?: {}
    }
}


export let AboutForm:FC<AboutFormPropsType> = ({putProfileObject}) => {
    const { register,setError, handleSubmit, formState: {errors}} = useForm();
    let isDisabled = useTypesSelector(state => state.profilePage.submitButtonDisabled)
    let id =  useTypesSelector(state => state.auth.userId)
    let dispatch = useDispatch()
    let userProfile = useTypesSelector(state => state.profilePage.userProfile)
    let aboutSubmit = async (data: any) => {
        if(id){
            let response = await dispatch(putProfileObject(data,id))
            if(!response.messages) return
            let obj:Array<{type:string,name:string,message:string}> = []
            response.messages.forEach((item) => {
                obj.push({type:"manual",name:getName(item),message: item.split("(")[0]})
            })
            obj.forEach(({ name, type, message }) =>
                setError(name, { type, message })
            );
        }
    }
    return(
        <form onSubmit={handleSubmit(aboutSubmit)}>
            <input type="checkbox" defaultChecked={true}
                   {...register("lookingForAJob")}/>Ищу ли я работу?
            <input type="text" placeholder={"Описание работы которую я ищу"}
                   defaultValue={userProfile?.lookingForAJobDescription || undefined}
                   {...register("lookingForAJobDescription",{
                       required: true
                   })}/>
            {errors.lookingForAJobDescription && <p>{errors.lookingForAJobDescription.message}</p>}
            <input type="text" placeholder={"Мое полное имя или титул"}
                   defaultValue={userProfile?.fullName || undefined}
                   {...register("fullName")}/>
            {errors.fullName && <p>{errors.fullName.message}</p>}
            {/*<input type="text" placeholder={"обо мне"}
                   defaultValue={props.aboutMe || undefined}
                   {...register("aboutMe")}/>*/}
            {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
            <input type="text" placeholder={"Мой профиль в facebook"}
                   defaultValue={userProfile?.contacts.facebook|| undefined}
                   {...register("contacts.facebook")}/>
            {errors.facebook && <p>{errors.facebook.message}</p>}
            <input type="text" placeholder={"Мой профиль в github"}
                   defaultValue={userProfile?.contacts.github|| undefined}
                   {...register("contacts.github")}/>
            {errors.github && <p>{errors.github.message}</p>}
            <input type="text" placeholder={"Мой профиль в instagram"}
                   defaultValue={userProfile?.contacts.instagram || undefined}
                   {...register("contacts.instagram")}/>
            {errors.instagram && <p>{errors.instagram.message}</p>}
            <input type="text" placeholder={"Мой профиль в mainLink"}
                   defaultValue={userProfile?.contacts.mainLink || undefined}
                   {...register("contacts.mainLink")}/>
            {errors.mainLink && <p>{errors.mainLink.message}</p>}
            <input type="text" placeholder={"Мой профиль в twitter"}
                   defaultValue={userProfile?.contacts.twitter || undefined}
                   {...register("contacts.twitter")}/>
            {errors.twitter && <p>{errors.twitter.message}</p>}
            <input type="text" placeholder={"Мой профиль в vk"}
                   defaultValue={userProfile?.contacts.vk || undefined}
                   {...register("contacts.vk")}/>
            {errors.vk && <p>{errors.vk.message}</p>}
            <input type="text" placeholder={"Мой профиль в website"}
                   defaultValue={userProfile?.contacts.website || undefined}
                   {...register("contacts.website")}/>
            {errors.website && <p>{errors.website.message}</p>}
            <input type="text" placeholder={"Мой профиль в youtube"}
                   defaultValue={userProfile?.contacts.youtube || undefined}
                   {...register("contacts.youtube")}/>
            {errors.youtube && <p>{errors.youtube.message}</p>}
            <button type={"submit"} disabled={isDisabled} className={s.add}>submit</button>
        </form>
    )
}


export let AboutMe:FC<userProfileType> = ({lookingForAJob,lookingForAJobDescription,fullName,contacts}) => {
    return (
        <div>
            {/*<div>
                <span>Обо мне</span>
                <span>{aboutMe}</span>
            </div>*/}
            <div>
                <span>looking for a job---</span>
                <span>{lookingForAJob ? "Yes" : "No"}</span>
            </div>
            <div>
                <span>looking for a job discription---</span>
                <span>{lookingForAJobDescription}</span>
            </div>
            <div>
                <span>full name---</span>
                <span>{fullName}</span>
            </div>
            <div>
                <span>Contacts---</span>
                <span>{Object.entries(contacts).map((item) => <ContactsItem title={item[0]} value={item[1]}/>)}</span>
            </div>
        </div>
    )
}
interface ContactsType {
    title: string | null
    value: string | null
}
let ContactsItem:FC<ContactsType> = ({title,value}) => {
    return (
        <div>
            {title &&<span>{title}--</span>}
            {value && <span>{value || "не скажу"}</span>}
        </div>
    )
}