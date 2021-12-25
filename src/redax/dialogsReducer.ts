type massageObject = {
    id: number
    message: string
}
type userType = {
    id: number
    name: string
}

export type dialogPageType = {
    message: Array<massageObject>
    user: Array<userType>
}

let initialState:dialogPageType = {
    message: [
        {id: 1, message: "Hi, how you are you?"},
        {id: 2, message: "Good"}
    ],
    user: [
        {id: 1, name: "Polina"},
        {id: 2, name: "Lina#"},
        {id: 3, name: "Anastasia"},
        {id: 4, name: "Peter"},
        {id: 5, name: "Sonya"},
        {id: 6, name: "Anton"},
        {id: 7, name: "Maxim"},
    ],
}

////////////////////////////////////////

enum dialogsActionType {
    SEND_MASSAGE = "SEND_MASSAGE"
}

type GeneralActionType = sendMessage

////////////////////////////////////////

export const dialogsReducer = (state = initialState, action:GeneralActionType):dialogPageType =>
{
    switch (action.type) {
        case dialogsActionType.SEND_MASSAGE:
            return  {...state, message: [...state.message, {id: 3, message: action.payload}]}
        default:
            return state
    }
}


export interface sendMessage {
    type: dialogsActionType.SEND_MASSAGE
    payload: string
}

export let sendMassageCreator = (payload: string): sendMessage =>
    ({type: dialogsActionType.SEND_MASSAGE, payload})