import React, {useEffect} from "react";
import {getStatusProfile, getUserProfile} from "../../redax/profileReducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import { useTypesSelector} from "../../types/hooks";
import s from "../../Page.module.css";
import sp from "./profile.module.css";
import {InfoContainer} from "./myposts/infoContainer";
import PostContainer from "./myposts/post/postContainer";


let ProfileContainer = () => {
    let myId = useTypesSelector(state => state.auth.userId)
    let {userId} = useParams<any>()
    let dispatch = useDispatch()
    useWithAuthRedirect()
    useEffect(() => {
        let GeneralUserId = userId || myId
        dispatch(getStatusProfile(GeneralUserId))
        dispatch(getUserProfile(GeneralUserId))
    }, [myId, userId])
    return (
        <div className={`${s.page__profile} ${sp.profile}`}>
            <InfoContainer isOwn={!!userId}/>
            <PostContainer />
        </div>
    )
}

export default ProfileContainer