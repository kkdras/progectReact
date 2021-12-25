import Profile from "./profile";
import React, {useEffect} from "react";
import {getStatusProfile, getUserProfile} from "../../redax/profileReducer";
import {useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import { useTypesSelector} from "../../types/hooks";


let ProfileContainer = (props) => {
    let myId = useTypesSelector(state => state.auth.userId)
    let dispatch = useDispatch()
    useWithAuthRedirect()
    useEffect(() => {
        let userId = props.match.params.userId || myId
        dispatch(getStatusProfile(userId))
        dispatch(getUserProfile(userId))
    }, [myId, props.match.params.userId])
    return (
        <Profile isOwn={!!props.match.params.userId} />
    )
}

export default withRouter(ProfileContainer)