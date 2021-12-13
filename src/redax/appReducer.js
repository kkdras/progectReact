import {requestCreator} from "./authReducer";

let INITIALIZED_FINISHED= "INITIALIZED_FINISHED"

let initialState = {
    initialized:false,
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_FINISHED:
            return  {
                ...state,
                initialized: true,
            }
        case "fake":
            return {
                ...state
            }
        default:
            return state

    }

}
export let initializeAC = () => ({type:INITIALIZED_FINISHED})

export let initializeApplication = () => {
    return dispatch => {
        dispatch(requestCreator())
            .then(() => dispatch(initializeAC()))
    }
}
