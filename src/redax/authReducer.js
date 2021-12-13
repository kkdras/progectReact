import {axiosRequest} from "../dal/api";

let CONNECT = "CONNECT"
let CAPTCHA ="auth/CAPTCHA"


let initialState = {
    userId: null,
    email: null,
    login: null,
    isLog: false,
    urlCaptcha: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECT:
            return  {
                ...state,
                ...action.data,
                isLog: action.data.isLog,
            }
        case CAPTCHA:
            return {
                ...state,
                urlCaptcha:action.payload
            }
        default:
            return state

    }

}
export let toLoginAC = (userId,login,email,isLog) => ({type: CONNECT, data:{userId, login, email, isLog,}})
export let setCaptcha = (urlCaptcha) => ({type:CAPTCHA,payload: urlCaptcha})

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

let getCaptcha = () => {
    return async dispacth => {
        let response = await axiosRequest.auth.getCaptcha()
        dispacth(setCaptcha(response.data.url))
    }
}

export let loginCreator = (email,password,rememberMe,captcha) => {
    return async dispatch => {
        debugger
        let response = await axiosRequest.header.login(email,password,rememberMe,captcha)
        if (response.resultCode === 0) {
            dispatch(requestCreator())
            debugger
        }
        else{
            debugger
            if(response.resultCode === 10){
                dispatch(getCaptcha())
            }
        }
    }
}

export let logoutCreator = () => {
    return dispatch => {
        axiosRequest.header.logout()
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(toLoginAC(null, null, null,false))
                    }
                }
            )
    }
}



