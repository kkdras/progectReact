import {axiosRequest, ResultCode, ResultCodeLoginCreator} from "../dal/api"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserPhoto, userProfileType} from "../types/types";

interface IURLCaptcha{
   urlCaptcha: null | string
}

interface IInitialState{
   userId: number | null
   email: string | null
   login: string | null
   isLog: boolean | null
   photos: IUserPhoto["photos"] | null
}

let initialState: IInitialState & IURLCaptcha = {
   userId: null,
   email: null,
   login: null,
   isLog: null,
   urlCaptcha: null,
   photos: null
}


let authSlice = createSlice({
      name: "auth",
      initialState,
      reducers: {
         setUserInfo(state, action: PayloadAction<Omit<IInitialState, "photos">>) {
            return {
               ...state,
               ...action.payload
            }
         },
         setUserPhotos(state, action: PayloadAction<IInitialState['photos']>){
            state.photos = action.payload
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
export let {setUserInfo, setCaptcha, setUserPhotos} = authSlice.actions


//requestCreator
export let getUserInfo = createAsyncThunk(
   "auth/",
   async (_, {dispatch}) => {
      let response = await axiosRequest.auth.getLogUser()
      if (response.resultCode === ResultCode.Success) {
         let {id, email, login} = response.data;
         let myPhoto: null | IInitialState["photos"]  = null
         try{
            let tmp = await axiosRequest.profile.getUserProfile(id).then(r => r.data)
            myPhoto = tmp.photos
         }catch (e){
         }finally {
            dispatch(setUserPhotos(myPhoto))
         }

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
      let response = await axiosRequest.auth.login(arg.email, arg.password, arg.rememberMe, arg.captcha)
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
      let response = await axiosRequest.auth.logout()
      if (response.resultCode === ResultCode.Success) {
         dispatch(setUserInfo({userId: null, login: null, email: null, isLog: false}))
      }
   }
)