import {axiosRequest} from "../dal/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const SET_PHOTO = "profile/SET_PHOTO"


let initialState = {
    posts: [
        {
            id: 1,
            massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?',
            like: 1,
            dislike: 100
        },
        {
            id: 2,
            massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?',
            like: 1111,
            dislike: 100
        },
    ],
    userProfile: null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return  {
                ...state,
                posts: [...state.posts,{id: 3, massage: action.text, like: 66, dislike: 10}],
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile,
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PHOTO:
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photos}
            }
        default:
            return state

    }

}
export let createActionAddPost = (text) => ({type: ADD_POST, text})

export let setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile})

export let setStatusProfile = (status) => ({type: SET_STATUS, status})
//action creator для добавления фото в state
export let setUserPhoto = (photos) => ({type:SET_PHOTO,photos})

export let getUserProfile = (userId) => {
    return async dispatch => {
        let response = await axiosRequest.profile.getUserProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}

export let getStatusProfile = (userId) => {
    return async dispatch => {
        let response = await axiosRequest.profile.getStatus(userId)
        dispatch (setStatusProfile(response.data))
    }
}

export let updateStatusProfile = (status) => {
    return async dispatch => {
        let response = await axiosRequest.profile.setStatus(status)
        if (response.data.resultCode === 0){
            dispatch (setStatusProfile(status))
        }
    }
}

export let setPhotoProfile = (photo) => {

    return async dispatch => {
        let response = await axiosRequest.profile.setPhoto(photo)
        if(response.data.resultCode === 0){
            dispatch(setUserPhoto(response.data.data.photos))
        }
    }
}