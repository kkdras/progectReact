import axios from "axios";
let apiKey = "8358ee45-26ad-4b63-8e99-4be48da07514"
let instance = axios.create({
    withCredentials: 'true',
    baseURL:`https://social-network.samuraijs.com/api/1.0/`,
    headers:{
        "API-KEY":apiKey
    },
})

export let axiosRequest = {
    header: {

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
    }
}