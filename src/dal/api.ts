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
export enum ResultCodeLoginCreator {
    NeedCaptcha = 10
}
export enum ResultCode {
    Success = 0,
    Error = 1,
}

type AuthLoginType = {
    resultCode: ResultCode
    messages: Array<string>
    data: {
        id:number
        email: string
        login: string
    }
}
type AuthMeType = {
    resultCode: ResultCodeLoginCreator | ResultCode
    messages: Array<string>
    data: {userId: number}
}
export type FollowUnFollowType = {
    resultCode: ResultCode
    messages: Array<string>
    data: {}
}

type GetUserType = {
    items: Array<usersType>
    totalCount: number
    error: null | string
}

type SetPhotoType = {
    resultCode: ResultCode
    messages: Array<string>
    data: {
        photos: photosType
    }
}

export let axiosRequest = {
    header: {
        getLogUser(){
            return instance.get<AuthLoginType>(`auth/me`).then(response => response.data)
        },
        login(email: string,password:string,rememberMe:boolean,captcha: null | string = null){
            return instance.post<AuthMeType>(`auth/login`,{email,password,rememberMe,captcha})
                .then(response => response.data)
        },
        logout(){
            return instance.delete<AuthMeType>(`auth/login`)
                .then(response => response.data)
        }
    },
    user:{
        getUsers(currentPage: number,count: number){
            return instance.get<GetUserType>(`users?page=${currentPage}&count=${count}`)
                .then(response => response.data)
        },
        deleteFollow(id: number){
            return instance.delete<FollowUnFollowType>(`follow/${id}`).then(response => response.data)
        },
        follow(id:number){
            return instance.post<FollowUnFollowType>(`follow/${id}`).then(response => response.data)
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
            return instance.put<FollowUnFollowType>(`profile/status`,{status: string})
        },
        setPhoto(photo: any){
            let formData = new FormData()
            formData.append("image",photo)
            return instance.put<SetPhotoType>("/profile/photo",formData,{
                headers:{'Content-Type': 'multipart/form-data'}
            })
        },
        setDescription(data: object){
           return  instance.put<FollowUnFollowType>("profile",data)
        }
    },
    auth:{
        getCaptcha(){
            return instance.get("/security/get-captcha-url")
        }
    }
}

