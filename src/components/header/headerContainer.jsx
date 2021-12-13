import Header from "./header";
import {useSelector} from "react-redux";
import React from "react";
import {logoutCreator} from "../../redax/authReducer";

export let HeaderContainer = ({}) => {
    let isLog = useSelector(state => state.auth.isLog)
    return <Header logoutCreator={logoutCreator} isLog={isLog}/>
}