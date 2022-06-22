import {axiosRequest, IAuth, IRespType, ResultCode, ResultCodeLoginCreator} from "../dal/api"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserPhoto} from "../types/types";
import {removeFormData} from "../dal/sessionStorageAPI";
import {RootState} from "../app/hooks";


interface IURLCaptcha {
   urlCaptcha: null | string
}

interface IInitialState {
   userId: number | null
   email: string | null
   login: string | null
   isLog: boolean | null
   photos: IUserPhoto["photos"] | null
   error: boolean
   pending: boolean
}

let getError = (): boolean => {
   let tmp = sessionStorage.getItem("error")
   if (tmp === null) return false
   return JSON.parse(tmp)
}


let getInitialState = ():IInitialState & IURLCaptcha => {
   return  {
      userId: null,
      email: null,
      login: null,
      isLog: null,
      urlCaptcha: sessionStorage.getItem("captcha"),
      photos: null,
      error: getError(),
      pending: false
   }
}


let authSlice = createSlice({
      name: "auth",
      initialState: getInitialState,
      reducers: {
         setUserInfo(state, action:
            PayloadAction<Omit<IInitialState, "photos" | "error" | "pending">>) {
            return {
               ...state,
               ...action.payload
            }
         },
         setId(state, action: PayloadAction<{ id: number }>) {
            state.userId = action.payload.id
         },
         setUserPhotos(state, action: PayloadAction<IInitialState['photos']>) {
            state.photos = action.payload
         },
         setCaptcha(state, action: PayloadAction<string>) {
            state.urlCaptcha = action.payload
         },
         setError(state, action: PayloadAction<boolean>) {
            state.error = action.payload
         },
         setPending(state, action: PayloadAction<boolean>) {
            state.pending = action.payload
         }
      },
      extraReducers: () => {

      }
   }
)
export default authSlice.reducer
export let {
   setUserInfo,
   setCaptcha,
   setUserPhotos,
   setId,
   setError,
   setPending
} = authSlice.actions


export let getLogUserInfo = createAsyncThunk(
   "auth/",
   async (_, {dispatch}) => {
      try {
         let response = await axiosRequest.auth.getLogUser()

         if (response.resultCode === ResultCode.Error) throw new Error("вынужденная ошибка")
         let {id, email, login} = response.data;

         try {
            let tmp = await axiosRequest.profile.getUserProfile(id).then(r => r.data)
            dispatch(setUserPhotos(tmp.photos))
         } catch (e) {
            console.log("Не удалось педварительно загрузить фотографии")
         }

         dispatch(setUserInfo({userId: id, login, email, isLog: true}))
      } catch (e) {

         dispatch(setUserInfo({userId: null, email: null, login: null, isLog: false}))
      }
   }
)

export let getCaptcha = createAsyncThunk(
   "auth/captcha",
   async (_: undefined, {dispatch}) => {
      try {
         let response = await axiosRequest.auth.getCaptcha()
         sessionStorage.setItem("captcha", response.data.url)
         dispatch(setCaptcha(response.data.url))
      } catch (e) {
         console.log("Не удалось получить капчу")
      }

   }
)

export interface ILoginAction {
   email: string,
   password: string,
   rememberMe: boolean,
   captcha: string
}

export let logIn = createAsyncThunk<IRespType<IAuth, ResultCodeLoginCreator | ResultCode>
   , ILoginAction, { state: RootState }>(
   "auth/login",
   async (arg: ILoginAction, {dispatch, rejectWithValue, getState}) => {
      let state = getState()
      dispatch(setPending(true))

      let response = await axiosRequest.auth.login(arg.email, arg.password, arg.rememberMe, arg.captcha)

      if (response.resultCode === ResultCode.Success) {
         dispatch(setId({id: response.data.userId}))
         await dispatch(getLogUserInfo())

         if (state.auth.urlCaptcha) {
            dispatch(setCaptcha(""))
            sessionStorage.setItem("captcha", "")
         }
         if (state.auth.error) setError(false)
         removeFormData()
      } else {
         if (response.resultCode === ResultCodeLoginCreator.NeedCaptcha) {
            await dispatch(getCaptcha())
         }

         if (response.resultCode === ResultCodeLoginCreator.NeedCaptcha &&
            state.auth.urlCaptcha || response.resultCode === ResultCode.Error) {
            dispatch(setError(true))
            sessionStorage.setItem("error", "true")
         }
      }
      dispatch(setPending(false))
      return response
   }
)

export let logout = createAsyncThunk(
   "auth/logout",
   async (_: undefined, {dispatch}) => {
      let response = await axiosRequest.auth.logout()
      if (response.resultCode === ResultCode.Success) {
         dispatch(setUserInfo({userId: null, login: null, email: null, isLog: false}))
      }
   }
)