import s from "./../profile.module.css";
import React from "react";
import Loading from "../../users/loading";
import Status from "./post/status/status";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../utils/forms/textarea";
import {maxLengthCreator, required} from "../../utils/validations/main";
import {useDispatch, useSelector} from "react-redux";

let maxLength = maxLengthCreator(20)

function Info(props) {
    let userProfile = useSelector(state => state.profilePage.userProfile)
    let status =  useSelector(state => state.profilePage.status)


    let dispatch = useDispatch()
    let addPost = (data) => {
        dispatch(props.createActionAddPost(data.massage))
        console.log(data)
    }
    let putPhoto = (e) => {
        if(e.target.files.length){
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
                    <InfoReduxForm onSubmit={addPost} addPast={addPost}/>
                </div>
            </div>
        )
    }
}

let InfoForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field validate={[required,maxLength]} placeholder={"Введите свое сообщение"} name={'massage'} className={s.texarea} component={Textarea}/>
            <button className={s.add}>submit</button>
        </form>
    )
}
let InfoReduxForm = reduxForm({form:"info"})(InfoForm)

export default Info;