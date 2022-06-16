import {
   StatusObs,
   ChatApi,
   IMessage,
   MessageObs,
   statusType
} from "../dal/chat-api";
import {Dispatch} from "redux";
import {createAsyncThunk, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";


export type dialogPageType = {
   message: Array<IMessage>
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
      responseMessage: {
         reducer(state, action: PayloadAction<IMessage[]>) {
            state.message = [...state.message, ...action.payload]
         },
         prepare(messages: IMessage[]) {
            return {
               payload: messages.map(item => {
                  item.id = nanoid()
                  return item
               })
            }
         }
      },
      changeStatus(state, action: PayloadAction<statusType>) {
         state.status = action.payload
      },
      cleanState(state) {
         state.message = []
      }
   }
})
export default dialogSlice.reducer
export let {cleanState} = dialogSlice.actions


let _messageHandler: MessageObs | null = null
let getMessageHandler = (dispatch: Dispatch): MessageObs => {
   if (_messageHandler === null) {
      _messageHandler = (messages: IMessage[]) => {
         dispatch(dialogSlice.actions.responseMessage(messages))
      }
   }
   return _messageHandler
}

let _statusHandler: StatusObs | null = null
let getStatusHandler = (dispatch: Dispatch): StatusObs => {
   if (_statusHandler === null) {
      _statusHandler = (status: statusType) => {
         dispatch(dialogSlice.actions.changeStatus(status))
      }
   }
   return _statusHandler
}


export let startListeningMessage = createAsyncThunk(
   "dialogs/startListenMessage",
   async (_, {dispatch}) => {
      ChatApi.start()
      ChatApi.subscribe("message-received", getMessageHandler(dispatch))
      ChatApi.subscribe("status-changed", getStatusHandler(dispatch))
   }
)

export let stopListeningMessage = createAsyncThunk(
   "dialogs/stopListenMessage",
   async (_) => {
      ChatApi.stop()
   }
)
