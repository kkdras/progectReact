import axios from "axios";
let apiKey = "9cef1f3a-d6dc-4df8-b0f1-cbdab05c42b3"
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
        login(email,password,rememberMe){
            return instance.post(`auth/login`,{email,password,rememberMe})
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
        pageChanged(pageNumber,count){
            return instance.get(`users?page=${pageNumber}&count=${count}`)
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
        }
    }
}