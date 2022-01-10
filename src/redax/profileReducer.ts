import {axiosRequest} from "../dal/api";
import {insideObjectType, photosType, userProfileType} from "../types/types";
import {ActionType, GeneralThunkType} from "./redax-store";


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

type GeneralActionType = ActionType<typeof ProfileActions>

export const profileReducer = (state = initialState, action: GeneralActionType):initialStateType => {
    switch (action.type) {
        case "ADD_POST":
            return  {
                ...state,
                posts: [...state.posts,{id: 3, massage: action.text, like: 66, dislike: 10}],
            }
        case "SET_USER_PROFILE":
            return {
                ...state,
                userProfile: action.userProfile,
            }
        case "SET_STATUS":
            return {...state, status: action.status}
        case "profile/SET_PHOTO":
            return {
                ...state,userProfile:{...state.userProfile, photos:action.photos} as userProfileType
            }
        case "profile/TOGGLE_EDIT_MODE":
            return {...state,editMode: !state.editMode}
        case "profile/TOGGLE_DISABLED_BUTTON":
            return {...state, submitButtonDisabled: !state.submitButtonDisabled}
        default:
            return state
    }
}

export let ProfileActions = {
    createActionAddPost: (text: string) =>
        ({type: "ADD_POST", text} as const),
    setUserProfile: (userProfile:userProfileType) =>
        ({type: "SET_USER_PROFILE", userProfile} as const),
    setStatusProfile: (status:string) =>
        ({type: "SET_STATUS", status} as const),
    setUserPhoto: (photos:photosType) =>
        ({type:"profile/SET_PHOTO",photos} as const),
    toggleEditMode: () =>
        ({type:"profile/TOGGLE_EDIT_MODE"} as const),
    toddleSubmitButtonDisabled: () =>
        ({type:"profile/TOGGLE_DISABLED_BUTTON"} as const)
}

//thunk
export let getUserProfile = (userId: number):
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch) => {
        let response = await axiosRequest.profile.getUserProfile(userId)
        dispatch(ProfileActions.setUserProfile(response.data))
    }
}

export let getStatusProfile = (userId: number):
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch) => {
        let response = await axiosRequest.profile.getStatus(userId)
        dispatch (ProfileActions.setStatusProfile(response.data))
    }
}

export let updateStatusProfile = (status: string):
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch ) => {
        let response = await axiosRequest.profile.setStatus(status)
        if (response.data.resultCode === 0){
            dispatch (ProfileActions.setStatusProfile(status))
        }
    }
}


export let setPhotoProfile = (photo:any):
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch) => {
        let response = await axiosRequest.profile.setPhoto(photo)
        if(response.data.resultCode === 0){
            dispatch(ProfileActions.setUserPhoto(response.data.data.photos))
        }
    }
}
/*type dataPutProfileObject = {messages: null} | ResponseType*/

export let putProfileObject = (object: object,id: number):
    GeneralThunkType<GeneralActionType, void> => {
    return async (dispatch) => {
        dispatch(ProfileActions.toddleSubmitButtonDisabled())
        let response = await axiosRequest.profile.setDescription(object)
        if(response.data.resultCode === 0){
            dispatch(getUserProfile(id))
            dispatch(ProfileActions.toggleEditMode())
            dispatch(ProfileActions.toddleSubmitButtonDisabled())
            return {messages: null}
        }else{
            dispatch(ProfileActions.toddleSubmitButtonDisabled())
            return response.data
        }
    }
}