import {axiosRequest, ResultCode, ResultCodeLoginCreator} from "../dal/api"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IURLCaptcha{
   urlCaptcha: null | string
}

interface IInitialState{
   userId: number | null
   email: string | null
   login: string | null
   isLog: boolean | null
}

let initialState: IInitialState & IURLCaptcha = {
   userId: null,
   email: null,
   login: null,
   isLog: null,
   urlCaptcha: null
}


let authSlice = createSlice({
      name: "auth",
      initialState,
      reducers: {
         setUserInfo(state, action: PayloadAction<IInitialState>) {
            return {
               ...state,
               ...action.payload
            }
         },
         setCaptcha(state, action: PayloadAction<string>) {
            state.urlCaptcha = action.payload
         }
      },
      extraReducers: () => {

      }
   }
)
export default authSlice.reducer
export let {setUserInfo, setCaptcha} = authSlice.actions


//requestCreator
export let getUserInfo = createAsyncThunk(
   "auth/",
   async (_, {dispatch}) => {
      let response = await axiosRequest.header.getLogUser()
      if (response.resultCode === ResultCode.Success) {
         let {id, email, login} = response.data;
         dispatch(setUserInfo({userId: id, login, email, isLog: true}))
      }else{
         dispatch(setUserInfo({userId: null, email: null, login: null, isLog: false}))
      }
   }
)

export let getCaptcha = createAsyncThunk(
   "auth/captcha",
   async (_:undefined, {dispatch}) => {
      let response = await axiosRequest.auth.getCaptcha()
      dispatch(setCaptcha(response.data.url))
   }
)

type loginAction = {
   email: string,
   password: string,
   rememberMe: boolean,
   captcha: string
}

export let logIn = createAsyncThunk(
   "auth/login",
   async (arg: loginAction, {dispatch}) => {
      let response = await axiosRequest.header.login(arg.email, arg.password, arg.rememberMe, arg.captcha)
      if (response.resultCode === ResultCode.Success) {
         dispatch(getUserInfo())
      } else {
         if (response.resultCode === ResultCodeLoginCreator.NeedCaptcha) {
            dispatch(getCaptcha())
         }
      }
   }
)

export let logout = createAsyncThunk(
   "auth/logout",
   async (_:undefined, {dispatch}) => {
      let response = await axiosRequest.header.logout()
      if (response.resultCode === ResultCode.Success) {
         dispatch(setUserInfo({userId: null, login: null, email: null, isLog: false}))
      }
   }
)

/*export type GeneralActionsType = ActionType<typeof actions>

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
}*/



