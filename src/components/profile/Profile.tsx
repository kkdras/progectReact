import React, {useEffect} from "react";
import {getProfileStatus, getUserProfile} from "../../redax/profileReducer";
import {useDispatch} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import {useTypesSelector} from "../../app/hooks";
import {Info} from "./aboutMe/info";
import {Box, Typography} from "@mui/material";

function testMyId(id: number | null): asserts id is number {
    if (typeof id !== "number") throw new Error("Ошибка доступа")
}

export let Profile = () => {
    let myId = useTypesSelector(state => state.auth.userId)
    let isInitialize = useTypesSelector(state => state.auth.isLog)
    let { userId } = useParams<string>()
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileStatus(Number(userId)))
        dispatch(getUserProfile(Number(userId)))
    }, [userId])



    if (isInitialize === false){
        return <Navigate to={"/login"} replace={true} />
    }
    testMyId(myId)
    return (
        <Info isOwn={myId === Number(userId)} />
    )
}

export let ProfileRedirect = () => {
    let myId = useTypesSelector(state => state.auth.userId)
    return <Navigate to={myId ? `/profile/${myId}` : "/login"} replace={true} />
}

export let NotFound = () => {
    return <Box sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <Typography variant={"h4"}>
            404 Not Found
        </Typography>
    </Box>
}

export let Discklamer = () => {
    return <Box sx={{
        width: "100%",
        height: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <Typography variant={"h4"}>
            Чтобы увидеть содержимое страницы необходимо войти в аккаунт
        </Typography>
    </Box>
}