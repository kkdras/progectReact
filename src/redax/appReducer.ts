

import {getUserInfo} from "./authReducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

/*
type InitialStateType = {
   initialized: boolean
}

let initialState: InitialStateType = {
   initialized: false
}

export let initializeApplication = createAsyncThunk(
   "app/initialize",
   async (_, {dispatch}) => {
      await dispatch(getUserInfo())
   }
)

let appSlice = createSlice({
   name: "app",
   initialState,
   reducers: {},
   extraReducers: (builder => {
      builder.addCase(initializeApplication.fulfilled, ((state, action) => {
         state.initialized = true
      }))
   })
})
export default appSlice.reducer

*/

/*
enum ActionsType {
    INITIALIZED_FINISHED= "INITIALIZED_FINISHED"
}

export const appReducer = (state = initialState, action: GeneralActionsType):InitialStateType => {
    switch (action.type) {
        case ActionsType.INITIALIZED_FINISHED:
            return  {
                ...state,
                initialized: true
            }
        default:
            return state

    }
}

type GeneralActionsType = InitializedSuccess


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
*/
