import {axiosRequest} from "../dal/api";
import {insideObjectType, photosType, userProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redax-store";


type initialStateType = {
    userProfile: userProfileType | null
    editMode: boolean
    submitButtonDisabled: boolean
    posts: Array<insideObjectType>
    status: null | string
}

let initialState:initialStateType = {
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
    userProfile: null,
    editMode:false,
    submitButtonDisabled: false,
    status: null
}

enum profileActions {
    ADD_POST = "ADD_POST",
    SET_USER_PROFILE = "SET_USER_PROFILE",
    SET_STATUS = "SET_STATUS",
    SET_PHOTO = "profile/SET_PHOTO",
    TOGGLE_EDIT_MODE = "profile/TOGGLE_EDIT_MODE",
    TOGGLE_DISABLED_BUTTON = "profile/TOGGLE_DISABLED_BUTTON"
}
type GeneralActionType = createActionAddPostType | setUserProfileType | setStatusProfile |
    setUserPhotoType | toggleEditModeType | toddleSubmitButtonDisabledType

export const profileReducer = (state = initialState, action: GeneralActionType):initialStateType => {
    switch (action.type) {
        case profileActions.ADD_POST:
            return  {
                ...state,
                posts: [...state.posts,{id: 3, massage: action.text, like: 66, dislike: 10}],
            }
        case profileActions.SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile,
            }
        case profileActions.SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case profileActions.SET_PHOTO:
            return {
                ...state,userProfile:{...state.userProfile, photos:action.photos} as userProfileType
            }
        case profileActions.TOGGLE_EDIT_MODE:
            return {...state,editMode: !state.editMode}
        case profileActions.TOGGLE_DISABLED_BUTTON:
            return {...state, submitButtonDisabled: !state.submitButtonDisabled}
        default:
            return state

    }

}


export type createActionAddPostType = {
    type: profileActions.ADD_POST
    text: string
}
export let createActionAddPost: (text: string) => createActionAddPostType
    = (text: string) => ({type: profileActions.ADD_POST, text})


type setUserProfileType = {
    type: profileActions.SET_USER_PROFILE
    userProfile: userProfileType
}
export let setUserProfile = (userProfile:userProfileType):setUserProfileType =>
    ({type: profileActions.SET_USER_PROFILE, userProfile})


type setStatusProfile = {
    type: profileActions.SET_STATUS
    status: string
}
export let setStatusProfile = (status:string):setStatusProfile => ({type: profileActions.SET_STATUS, status})


type setUserPhotoType = {
    type: profileActions.SET_PHOTO
    photos: photosType
}
export let setUserPhoto = (photos:photosType):setUserPhotoType => ({type:profileActions.SET_PHOTO,photos})


export interface toggleEditModeType {
    type: profileActions.TOGGLE_EDIT_MODE
}
export let toggleEditMode = ():toggleEditModeType => ({type:profileActions.TOGGLE_EDIT_MODE})


interface toddleSubmitButtonDisabledType {
    type: profileActions.TOGGLE_DISABLED_BUTTON
}
let toddleSubmitButtonDisabled = ():toddleSubmitButtonDisabledType => ({type:profileActions.TOGGLE_DISABLED_BUTTON})


//thunk
export let getUserProfile = (userId: number):
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionType> => {
    return async (dispatch) => {
        let response = await axiosRequest.profile.getUserProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}

export let getStatusProfile = (userId: number):
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionType>=> {
    return async (dispatch) => {
        let response = await axiosRequest.profile.getStatus(userId)
        dispatch (setStatusProfile(response.data))
    }
}

export let updateStatusProfile = (status: string):
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionType>=> {
    return async (dispatch ) => {
        let response = await axiosRequest.profile.setStatus(status)
        if (response.data.resultCode === 0){
            dispatch (setStatusProfile(status))
        }
    }
}


export let setPhotoProfile = (photo:any):
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionType>=> {
    return async (dispatch) => {
        let response = await axiosRequest.profile.setPhoto(photo)
        if(response.data.resultCode === 0){
            dispatch(setUserPhoto(response.data.data.photos))
        }
    }
}


export let putProfileObject = (object: object,id: number):
    ThunkAction<void, RootState, unknown, GeneralActionType>=> {
    return async (dispatch) => {
        dispatch(toddleSubmitButtonDisabled())
        let response = await axiosRequest.profile.setDescription(object)
        if(response.data.resultCode === 0){
            dispatch(getUserProfile(id))
            dispatch(toggleEditMode())
            dispatch(toddleSubmitButtonDisabled())
            return {messages: null}
        }else{
            dispatch(toddleSubmitButtonDisabled())
            return response.data
        }
    }
}