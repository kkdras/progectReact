import {ActionType, GeneralThunkType} from "./redax-store";
import {ChatApi} from "../dal/chat-api";
import {Dispatch} from "redux";

export type massageObject = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type statusType = "pending" | "ready" | "error"
export type dialogPageType = {
    message: Array<massageObject>
    status: statusType
}

let initialState: dialogPageType = {
    status: "pending",
    message: [],
}


type GeneralActionType = ActionType<typeof dialogsActions>

export const dialogsReducer = (state = initialState, action: GeneralActionType): dialogPageType => {
    switch (action.type) {
        case "SEND_MASSAGE":
            return {...state/*, message: [...state.message, {id: 3, message: action.payload}]*/}
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
    responseMessage: (data: Array<massageObject>) =>
        ({type: "RESPONSE_MASSAGE_ARRAY", data} as const),
    cleanOldMessage: () => ({type: "CLEAN_OLD_MESSAGES"} as const),
    changeStatus: (status: statusType) => ({type: "dr/CHANGE_STATUS", status} as const),
}


let _newMessageHandler: ((data: Array<massageObject>) => void) | null = null
let newMessageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: Array<massageObject>) => {
            dispatch(dialogsActions.responseMessage(messages))
        }
    }
    return _newMessageHandler
}

let _newStatusHandler: ((status: statusType) => void) | null = null
let newStatusHandler = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status: statusType) => {
            dispatch(dialogsActions.changeStatus(status))
        }
    }
    return _newStatusHandler
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




