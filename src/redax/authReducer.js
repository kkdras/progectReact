import {axiosRequest} from "../dal/api";
import {stopSubmit} from "redux-form";

let CONNECT = "CONNECT"

let initialState = {
    userId: null,
    email: null,
    login: null,
    isLog: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECT:
            return  {
                ...state,
                ...action.data,
                isLog: action.data.isLog,
            }

        default:
            return state

    }

}
export let toLoginAC = (userId,login,email,isLog) => {
    return {
        type: CONNECT,
        data:{
            userId,
            login,
            email,
            isLog,
        }
    }
}

export let requestCreator = () => {
    return dispatch => {
        return axiosRequest.header.getLogUser()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    dispatch(toLoginAC(id, login, email,true))
                }
            }
        )
    }
}

export let loginCreator= (email,password,rememberMe) => {
    return dispatch => {
        axiosRequest.header.login(email,password,rememberMe)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(requestCreator())
                    }else{
                        let massage = data.messages.length > 0 ? data.messages[0] : "Some error"
                        let action = stopSubmit("login", {_error: massage});
                        dispatch(action)
                    }
                }
            )
    }
}

export let logoutCreator = () => {
    return dispatch => {
        console.log("dfsdfd")
        axiosRequest.header.logout()
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(toLoginAC(null, null, null,false))
                    }
                }
            )
    }
}



