import {axiosRequest} from "../dal/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"

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
    userProfile: null,
    status: ""
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
        default:
            return state

    }

}
export let createActionAddPost = (text) => {
    return {
        type: ADD_POST,
        text,
    }
}

export let setUserProfile = (userProfile) => {
    return{
        type: SET_USER_PROFILE,
        userProfile,
    }
}

export let setStatusProfile = (status) => {
    return{
        type: SET_STATUS,
        status,
    }
}

export let getUserProfile = (userId) => {
    return dispatch => {
        axiosRequest.profile.getUserProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            }
        )
    }
}

export let getStatusProfile = (userId) => {
    return dispatch => {
        axiosRequest.profile.getStatus(userId)
            .then(response => {
                dispatch (setStatusProfile(response.data))
            })
    }
}

export let updateStatusProfile = (status) => {
    return dispatch => {
        axiosRequest.profile.setStatus(status)
            .then(response => {
                if (response.data.resultCode === 0){
                    debugger
                    dispatch (setStatusProfile(status))
                }
            })
    }
}