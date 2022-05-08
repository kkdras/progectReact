import {ChatApi} from "../dal/chat-api";
import {Dispatch} from "redux";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type messageObject = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type statusType = "pending" | "ready" | "error"
export type dialogPageType = {
    message: Array<messageObject>
    status: statusType
}

let initialState: dialogPageType = {
    status: "pending",
    message: [],
}

let dialogSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
       responseMessage(state,action:PayloadAction<Array<messageObject>>){
          state.message = [...state.message, ...action.payload]
       },
       changeStatus(state,action: PayloadAction<statusType>){
          state.status = action.payload
       }
    }
})
export default dialogSlice.reducer

let _newMessageHandler: ((data: Array<messageObject>) => void) | null = null
let newMessageHandler = (dispatch: Dispatch) => {
   if (_newMessageHandler === null) {
      _newMessageHandler = (messages: Array<messageObject>) => {
         dispatch(dialogSlice.actions.responseMessage(messages))
      }
   }
   return _newMessageHandler
}

let _newStatusHandler: ((status: statusType) => void) | null = null
let newStatusHandler = (dispatch: Dispatch) => {
   if (_newStatusHandler === null) {
      _newStatusHandler = (status: statusType) => {
         dispatch(dialogSlice.actions.changeStatus(status))
      }
   }
   return _newStatusHandler
}

export let startListeningMessage = createAsyncThunk(
   "dialogs/startListenMessage",
   async (_:undefined, {dispatch}) => {
      ChatApi.start()
      ChatApi.subscribe("message-received", newMessageHandler(dispatch))
      ChatApi.subscribe("status-changed", newStatusHandler(dispatch))
   }
)

export let stopListeningMessage = createAsyncThunk(
   "dialogs/stopListenMessage",
   async (_:undefined, {dispatch}) => {
      ChatApi.start()
      ChatApi.subscribe("message-received", newMessageHandler(dispatch))
      ChatApi.subscribe("status-changed", newStatusHandler(dispatch))
   }
)


/*
type GeneralActionType = ActionType<typeof dialogsActions>

export const dialogsReducer = (state = initialState, action: GeneralActionType): dialogPageType => {
    switch (action.type) {
        case "SEND_MASSAGE":
            return {...state/!*, message: [...state.message, {id: 3, message: action.payload}]*!/}
        case "RESPONSE_MASSAGE_ARRAY":
            return {...state, message: [...state.message, ...action.data]}
        case "CLEAN_OLD_MESSAGES":
            let {message, ...rest} = state
            return {...rest, message: []}
        case "dr/CHANGE_STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

export let dialogsActions = {
    sendMassageCreator: (payload: string) =>
        ({type: "SEND_MASSAGE", payload} as const),
    responseMessage: (data: Array<messageObject>) =>
        ({type: "RESPONSE_MASSAGE_ARRAY", data} as const),
    cleanOldMessage: () => ({type: "CLEAN_OLD_MESSAGES"} as const),
    changeStatus: (status: statusType) => ({type: "dr/CHANGE_STATUS", status} as const),
}

export let startListeningMessage = ():
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch) => {
        ChatApi.start()
        ChatApi.subscribe("message-received", newMessageHandler(dispatch))
        ChatApi.subscribe("status-changed", newStatusHandler(dispatch))
    }
}

export let stopListeningMessage = ():
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch) => {
        ChatApi.unsubscribe("message-received", newMessageHandler(dispatch))
        ChatApi.unsubscribe("status-changed", newStatusHandler(dispatch))
    }
}
*/


