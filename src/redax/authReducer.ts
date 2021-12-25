import {axiosRequest, ResultCode, ResultCodeLoginCreator} from "../dal/api"
import {RootState} from "./redax-store";
import {ThunkAction} from "redux-thunk";

enum ActionTypes {
    CONNECT = "CONNECT",
    CAPTCHA = "auth/CAPTCHA"
}

type initialInterface = {
    userId: null | number
    email: null | string
    login: null | string
    isLog: boolean
    urlCaptcha: null | string
}

let initialState: initialInterface = {
    userId: null,
    email: null,
    login: null,
    isLog: false,
    urlCaptcha: null
}

type GeneralActionsType = logoutActionCreator | setCaptchaType

export const authReducer = (state = initialState, action: GeneralActionsType): initialInterface  => {
    switch (action.type) {
        case ActionTypes.CONNECT:
            return  {
                ...state,
                ...action.data
            }
        case ActionTypes.CAPTCHA:
            return {
                ...state,
                urlCaptcha:action.payload
            }
        default:
            return state

    }

}
//isLog нужно исправить
//===================

type logoutActionCreator = {
    type: typeof ActionTypes.CONNECT,
    data: {
        userId: number | null
        login: string | null
        email: string | null
        isLog: boolean
    }
}
export let toLoginAC = (userId: number | null,login: string | null,email: string | null,isLog: boolean):logoutActionCreator =>
    ({type: ActionTypes.CONNECT, data:{userId, login, email, isLog}})


type setCaptchaType = {
    type: ActionTypes.CAPTCHA
    payload: string
}
export let setCaptcha = (urlCaptcha: string):setCaptchaType => ({type:ActionTypes.CAPTCHA,payload: urlCaptcha})

//=================

export let requestCreator = ():ThunkAction<any, RootState, unknown, GeneralActionsType> => {
    return async (dispatch) => {
        let response = await axiosRequest.header.getLogUser()
        if (response.resultCode === 0) {
            let {id, email, login} = response.data;
            dispatch(toLoginAC(id, login, email,true))
        }
    }
}
// в request creator я возвращал функцию хз что будет если убрать
let getCaptcha = ():ThunkAction<Promise<void>, RootState, unknown, GeneralActionsType> => {
    return async (dispatch) => {
        let response = await axiosRequest.auth.getCaptcha()
        dispatch(setCaptcha(response.data.url))
    }
}

export let loginCreator = (email: string,password: string,rememberMe: boolean,captcha: string):
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionsType> => {
    return async (dispatch) => {
        let response = await axiosRequest.header.login(email,password,rememberMe,captcha)
        if (response.resultCode === ResultCode.Success) {
            dispatch(requestCreator())

        }else{
            if(response.resultCode === ResultCodeLoginCreator.NeedCaptcha){
                dispatch(getCaptcha())
            }
        }
    }
}

export let logoutCreator = ():
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionsType> => {
    return async (dispatch: Function) => {
        let response = await axiosRequest.header.logout()
        if (response.resultCode === 0) {
            dispatch(toLoginAC(null, null, null,false))
        }
    }
}



