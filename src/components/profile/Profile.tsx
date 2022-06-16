import React, {useEffect} from "react";
import {getProfileStatus, getUserProfile} from "../../redax/profileReducer";
import {useDispatch} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import {useTypesSelector} from "../../app/hooks";
import {Info} from "./aboutMe/info";

function testMyId(id: number | null): asserts id is number {
    if (typeof id !== "number") throw new Error("Ошибка доступа")
}
export let Profile = () => {
    let myId = useTypesSelector(state => state.auth.userId)
    let { userId } = useParams<string>()
    let dispatch = useDispatch()
    testMyId(myId)

    useEffect(() => {
        dispatch(getProfileStatus(Number(userId)))
        dispatch(getUserProfile(Number(userId)))
    }, [userId])
    return (
        <Info isOwn={myId === Number(userId)} />
    )
}

export let ProfileRedirect = () => {
    let myId = useTypesSelector(state => state.auth.userId)
    return <Navigate to={"/profile/" + myId} replace={true} />
}