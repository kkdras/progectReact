import {axiosRequest, ResultCode, ResultCodeLoginCreator} from "../dal/api"
import {ActionType, GeneralThunkType} from "./redax-store"

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

export type GeneralActionsType = ActionType<typeof actions>

export const authReducer = (state = initialState, action: GeneralActionsType): initialInterface  => {
    switch (action.type) {
        case "CONNECT":
            return  {
                ...state,
                ...action.data
            }
        case "auth/CAPTCHA":
            return {
                ...state,
                urlCaptcha:action.payload
            }
        default:
            return state
    }

}

let actions = {
    toLoginAC: (userId: number | null, login: string | null, email: string | null, isLog: boolean) =>
        ({type: "CONNECT", data: {userId, login, email, isLog}} as const),
    setCaptcha: (urlCaptcha: string) => ({type: "auth/CAPTCHA", payload: urlCaptcha} as const)
}


export let requestCreator = ():GeneralThunkType<GeneralActionsType> => {
    return async (dispatch) => {
        let response = await axiosRequest.header.getLogUser()
        if (response.resultCode === ResultCode.Success) {
            let {id, email, login} = response.data;
            dispatch(actions.toLoginAC(id, login, email,true))
        }
    }
}
// в request creator я возвращал функцию хз что будет если убрать
let getCaptcha = ():GeneralThunkType<GeneralActionsType> => {
    return async (dispatch) => {
        let response = await axiosRequest.auth.getCaptcha()
        dispatch(actions.setCaptcha(response.data.url))
    }
}

export let loginCreator = (email: string, password: string, rememberMe: boolean, captcha: string):
    GeneralThunkType<GeneralActionsType> => {
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
    GeneralThunkType<GeneralActionsType> => {
    return async (dispatch: Function) => {
        let response = await axiosRequest.header.logout()
        if (response.resultCode === ResultCode.Success) {
            dispatch(actions.toLoginAC(null, null, null,false))
        }
    }
}



