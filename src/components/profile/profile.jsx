import s from "../../Page.module.css";
import sp from "./profile.module.css";
import {InfoContainer} from "./myposts/infoContainer";
import MyPostsContainer from "./myposts/myPostsContainer";
import React from "react";


function Profile(props) {
    return (
        <div className={`${s.page__profile} ${sp.profile}`}>
            <InfoContainer isOwn={props.isOwn}/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;