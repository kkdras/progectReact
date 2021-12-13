import axios from "axios";
let apiKey = "2a53a8d7-9713-4730-bda2-40c41c92534f"
let instance = axios.create({
    withCredentials: 'true',
    baseURL:`https://social-network.samuraijs.com/api/1.0/`,
    headers:{
        "API-KEY":apiKey
    },
})

export let axiosRequest = {
    header: {
        getLogUser(){
            return instance.get(`auth/me`).then(response => response.data)
        },
        login(email,password,rememberMe,captcha = null){
            return instance.post(`auth/login`,{email,password,rememberMe,captcha})
                .then(response => response.data)
        },
        logout(){
            return instance.delete(`auth/login`)
                .then(response => response.data)
        }
    },
    user:{
        getUsers(currentPage,count){
            return instance.get(`users?page=${currentPage}&count=${count}`)
                .then(response => response.data)
        },
        deleteFollow(id){
            return instance.delete(`follow/${id}`).then(response => response.data)
        },
        follow(id){
            return instance.post(`follow/${id}`).then(response => response.data)
        }
    },
    profile:{
        getUserProfile(userId){
            return instance.get(`profile/` + userId).then(response => {
                return response
            })
        },
        getStatus(userId){
            return instance.get(`profile/status/${userId}`)
        },
        setStatus(string){
            return instance.put(`profile/status`,{status: string})
        },
        setPhoto(photo){
            let formData = new FormData()
            formData.append("image",photo)
            return instance.put("/profile/photo",formData,{
                headers:{'Content-Type': 'multipart/form-data'}
            })
        },
        setDiscription(data){
            return instance.put("profile",data)
        }
    },
    auth:{
        getCaptcha(){
            return instance.get("/security/get-captcha-url")
        }
    }
}