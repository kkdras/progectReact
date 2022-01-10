import axios from "axios";
import {photosType, userProfileType, usersType} from "../types/types";
let apiKey = "2a53a8d7-9713-4730-bda2-40c41c92534f"
let withCredentials: any = "true"
let instance = axios.create({
    withCredentials: withCredentials,
    baseURL:`https://social-network.samuraijs.com/api/1.0/`,
    headers:{
        "API-KEY":apiKey
    },
})

export type ResponseType<D = {}, RC = ResultCode> = {
    resultCode: RC
    messages: Array<string>
    data: D
}

export enum ResultCodeLoginCreator {
    NeedCaptcha = 10
}

export enum ResultCode {
    Success = 0,
    Error = 1,
}

type AuthLoginDataType = {
    id:number
    email: string
    login: string
}

type AuthMeDataType = {
    userId: number
}

type GetUserType = {
    items: Array<usersType>
    totalCount: number
    error: null | string
}

type SetPhotoDataType = {
    photos: photosType
}

export let axiosRequest = {
    header: {
        getLogUser(){
            return instance.get<ResponseType<AuthLoginDataType>>(`auth/me`).then(response => response.data)
        },
        login(email: string,password:string,rememberMe:boolean,captcha: null | string = null){
            return instance.post<ResponseType<AuthMeDataType,ResultCodeLoginCreator | ResultCode>>(`auth/login`,{email,password,rememberMe,captcha})
                .then(response => response.data)
        },
        logout(){
            return instance.delete<ResponseType<AuthMeDataType,ResultCodeLoginCreator | ResultCode>>(`auth/login`)
                .then(response => response.data)
        }
    },
    user:{
        getUsers(currentPage: number,count: number,term: string, friend: string){
            return instance.get<GetUserType>(`users?page=${currentPage}&count=${count}` + `&term=${term === "" ? "" : term}`
             + `&friend=${friend ===  "true" || friend === "false" ? friend : ""}`)
                .then(response => response.data)
        },
        deleteFollow(id: number){
            return instance.delete<ResponseType>(`follow/${id}`).then(response => response.data)
        },
        follow(id:number){
            return instance.post<ResponseType>(`follow/${id}`).then(response => response.data)
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
            return instance.put<ResponseType>(`profile/status`,{status: string})
        },
        setPhoto(photo: any){
            let formData = new FormData()
            formData.append("image",photo)
            return instance.put<ResponseType<SetPhotoDataType>>("/profile/photo",formData,{
                headers:{'Content-Type': 'multipart/form-data'}
            })
        },
        setDescription(data: object){
           return  instance.put<ResponseType>("profile",data)
        }
    },
    auth:{
        getCaptcha(){
            return instance.get<{url:string}>("/security/get-captcha-url")
        }
    }
}

