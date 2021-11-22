import s from "./../profile.module.css";
import React from "react";
import Loading from "../../users/loading";
import Status from "./post/status/status";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../utils/forms/textarea";
import {maxLengthCreator, required} from "../../utils/validations/main";

let maxLength = maxLengthCreator(20)

function Info(props) {

    let addPost = (data) => {
        props.createActionAddPost(data.massage)
        console.log(data)
    }
    if (!props.userProfile){
        return (<Loading loading={true} />)
    }else {
        return (
            <div className={s.infoWrapper}>
                <div className={s.profile__banner}>
                    <img src={props.userProfile.photos.large} alt=""/>
                </div>
                <div className={s.infoText}>
                    <Status status={props.status} updateStatusProfile={props.updateStatusProfile}/>
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