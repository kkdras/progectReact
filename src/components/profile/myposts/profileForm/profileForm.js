import s from "../../profile.module.css";
import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";


export let AboutForm = (props) => {
    const { register,setError, handleSubmit, formState: {errors}} = useForm();
    let isDisabled = useSelector(state => state.profilePage.submitButtonDisabled)
    console.log(errors)
    let id =  useSelector(state => state.auth.userId)
    let dispatch = useDispatch()
    let getName = (string) => {
        let tmp1 = string.split("(")[1]
        tmp1 = tmp1.split(")")[0]
        tmp1 = tmp1.split(">")
        if(tmp1.length === 1) {
            tmp1 = tmp1[0]
        }else {
            tmp1 = tmp1[1]
        }
        let firstLetter = tmp1[0].toLowerCase()
        return firstLetter + tmp1.slice(1,tmp1.length)
    }
    let aboutSubmit = async (data) => {
        let response = await dispatch(props.putProfileObject(data,id))
        if(!response.messages) return
        let obj = []
        response.messages.forEach((item,index,arr) => {
            obj.push({type:"manual",name:getName(item),message: item.split("(")[0]})
        })
        obj.forEach(({ name, type, message }) =>
            setError(name, { type, message })
        );
    }
    return(
        <form onSubmit={handleSubmit(aboutSubmit)}>
            <input type="checkbox" defaultChecked={true}
                   {...register("lookingForAJob")}/>Ищу ли я работу?
            <input type="text" placeholder={"Описание работы которую я ищу"}
                   defaultValue={props.userProfile.lookingForAJobDescription}
                   {...register("lookingForAJobDescription",{
                       required: true
                   })}/>
            {errors.lookingForAJobDescription && <p>{errors.lookingForAJobDescription.message}</p>}
            <input type="text" placeholder={"Мое полное имя или титул"}
                   defaultValue={props.userProfile.fullName}
                   {...register("fullName")}/>
            {errors.fullName && <p>{errors.fullName.message}</p>}
            <input type="text" placeholder={"обо мне"}
                   defaultValue={props.userProfile.aboutMe}
                   {...register("aboutMe")}/>
            {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
            <input type="text" placeholder={"Мой профиль в facebook"}
                   defaultValue={props.userProfile.contacts.facebook}
                   {...register("contacts.facebook")}/>
            {errors.facebook && <p>{errors.facebook.message}</p>}
            <input type="text" placeholder={"Мой профиль в github"}
                   defaultValue={props.userProfile.contacts.github}
                   {...register("contacts.github")}/>
            {errors.github && <p>{errors.github.message}</p>}
            <input type="text" placeholder={"Мой профиль в instagram"}
                   defaultValue={props.userProfile.contacts.instagram}
                   {...register("contacts.instagram")}/>
            {errors.instagram && <p>{errors.instagram.message}</p>}
            <input type="text" placeholder={"Мой профиль в mainLink"}
                   defaultValue={props.userProfile.contacts.mainLink}
                   {...register("contacts.mainLink")}/>
            {errors.mainLink && <p>{errors.mainLink.message}</p>}
            <input type="text" placeholder={"Мой профиль в twitter"}
                   defaultValue={props.userProfile.contacts.twitter}
                   {...register("contacts.twitter")}/>
            {errors.twitter && <p>{errors.twitter.message}</p>}
            <input type="text" placeholder={"Мой профиль в vk"}
                   defaultValue={props.userProfile.contacts.vk}
                   {...register("contacts.vk")}/>
            {errors.vk && <p>{errors.vk.message}</p>}
            <input type="text" placeholder={"Мой профиль в website"}
                   defaultValue={props.userProfile.contacts.website}
                   {...register("contacts.website")}/>
            {errors.website && <p>{errors.website.message}</p>}
            <input type="text" placeholder={"Мой профиль в youtube"}
                   defaultValue={props.userProfile.contacts.youtube}
                   {...register("contacts.youtube")}/>
            {errors.youtube && <p>{errors.youtube.message}</p>}
            <button type={"submit"} disabled={isDisabled} className={s.add}>submit</button>
        </form>
    )
}

export let AboutMe = ({lookingForAJob,lookingForAJobDescription,fullName,contacts,aboutMe}) => {
    return (
        <div>
            <div>
                <span>Обо мне</span>
                <span>{aboutMe}</span>
            </div>
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
                <span>{Object.entries(contacts).map(item => <ContactsItem title={item[0]} value={item[1]} key={item}/>)}</span>
            </div>
        </div>
    )
}
export let ContactsItem = ({title,value}) => {
    return (
        <div>
            <span>{title}--</span>
            <span>{value || "не скажу"}</span>
        </div>
    )
}