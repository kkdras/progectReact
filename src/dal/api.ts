import axios from "axios";
import {ISetUserProfile, IUserOfList, IUserPhoto, userProfileType} from "../types/types";

let apiKey = "2a53a8d7-9713-4730-bda2-40c41c92534f"
let withCredentials: any = "true"
let instance = axios.create({
   withCredentials: withCredentials,
   baseURL:`https://social-network.samuraijs.com/api/1.0/`,
   headers:{
      "API-KEY":apiKey
   },
})

export interface IRespType<D = {}, RC = ResultCode> {
   resultCode: RC
   messages: string[]
   data: D
}

export enum ResultCodeLoginCreator {
   NeedCaptcha = 10
}

export enum ResultCode {
   Success,
   Error,
}

type AuthLoginDataType = {
   id:number
   email: string
   login: string
}

export interface IAuth {
   userId: number
}

type GetUserType = {
   items: IUserOfList[]
   totalCount: number
   error: null | string
}

type SetPhotoDataType = {
   photos: IUserPhoto["photos"]
}
export type friendUnion = "true" | "false" | ""


export let axiosRequest = {
   auth: {
      getLogUser(){
         return instance.get<IRespType<AuthLoginDataType>>(`auth/me`).then(response => response.data)
      },
      login(email: string,password:string,rememberMe:boolean,captcha: null | string = null){

         return instance.post<IRespType<IAuth, ResultCodeLoginCreator | ResultCode>>(`auth/login`,{email,password,rememberMe,captcha})
            .then(response => response.data)
      },
      logout(){
         return instance.delete<IRespType<IAuth, ResultCodeLoginCreator | ResultCode>>(`auth/login`)
            .then(response => response.data)
      },
      getCaptcha(){
         return instance.get<{url:string}>("/security/get-captcha-url")
      }
   },
   users:{
      getUsers(currentPage: number,count: number,term: string, friend: friendUnion){
         let template = `users?page=${currentPage}&count=${count}`
         term && (template += `&term=${term}`)
         friend && (template += `&friend=${friend}`)
         return instance.get<GetUserType>(template) .then(response => response.data)
      },
      unfollowUser(id: number){
         return instance.delete<IRespType>(`follow/${id}`).then(response => response.data)
      },
      followUser(id:number){
         return instance.post<IRespType>(`follow/${id}`).then(response => response.data)
      }
   },
   profile:{
      getUserProfile(userId: number){
         return instance.get<userProfileType>(`profile/` + userId).then(response => {
            return response
         })
      },
      getStatus(userId: number){
         return instance.get<string>(`profile/status/${userId}`)
      },
      setStatus(string: string){
         return instance.put<IRespType>(`profile/status`,{status: string})
      },
      setPhoto(photo: any){
         let formData = new FormData()
         formData.append("image",photo)
         return instance.put<IRespType<SetPhotoDataType>>("/profile/photo",formData,{
            headers:{'Content-Type': 'multipart/form-data'}
         })
      },
      setDescription(setProfileData: ISetUserProfile){
         return instance.put<IRespType>("profile",setProfileData).then(r => r.data)
      }
   }
}

