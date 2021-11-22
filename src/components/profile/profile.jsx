import s from "../../Page.module.css";
import sp from "./profile.module.css";
import InfoContainer from "./myposts/infoContainer";
import MyPostsContainer from "./myposts/myPostsContainer";
import React from "react";
import {Redirect} from "react-router-dom";



function Profile(props) {
    return (
        <div className={`${s.page__profile} ${sp.profile}`}>
            <InfoContainer/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;