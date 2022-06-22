import profileReducer from "../redax/profileReducer";
import dialogsReducer from "../redax/dialogsReducer";
import usersReducer from "../redax/usersReducer";
import authReducer from "../redax/authReducer";
import {configureStore} from "@reduxjs/toolkit";

export let store = configureStore({
    reducer: {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        usersPage: usersReducer,
        auth: authReducer,
    },
})



