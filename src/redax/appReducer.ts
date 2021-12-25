import {requestCreator} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redax-store";


type InitialStateType = {
    initialized: boolean
}

let initialState:InitialStateType = {
    initialized:false,
}

enum ActionsType {
    INITIALIZED_FINISHED= "INITIALIZED_FINISHED"
}

type GeneralActionsType = InitializedSuccess

export const appReducer = (state = initialState, action: GeneralActionsType):InitialStateType => {
    switch (action.type) {
        case ActionsType.INITIALIZED_FINISHED:
            return  {
                ...state,
                initialized: true,
            }
        default:
            return state

    }
}



type InitializedSuccess = {
    type: ActionsType.INITIALIZED_FINISHED
}
export let initializeAC = ():InitializedSuccess => ({type:ActionsType.INITIALIZED_FINISHED})

export let initializeApplication = (): ThunkAction<void, RootState, unknown, GeneralActionsType>=> {
    return (dispatch) => {
        dispatch(requestCreator())
            .then(() => dispatch(initializeAC()))
    }
}
