import React, {useEffect} from "react";
import {getProfileStatus, getUserProfile} from "../../redax/profileReducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import {useTypesSelector} from "../../app/hooks";
import s from "../../Page.module.css";
import sp from "./profile.module.css";
import {Info} from "./aboutMe/info";

export let ProfileContainer = () => {
    let myId = useTypesSelector(state => state.auth.userId)
    let {userId} = useParams<any>()
    let dispatch = useDispatch()
    useWithAuthRedirect()
    useEffect(() => {
        let GeneralUserId = userId || myId
        dispatch(getProfileStatus(GeneralUserId))
        dispatch(getUserProfile(GeneralUserId))
    }, [myId, userId])
    return (
        <div className={`${s.page__profile} ${sp.profile}`}>
            <Info isOwn={!userId}/>
        </div>
    )
}