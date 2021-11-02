const UPDATE_NEW_MASSAGE = "UPDATE_NEW_MASSAGE";
const SEND_MASSAGE = "SEND_MASSAGE";

let initialState = {
    massage: [
        {id: 1, massage: "Hi, how you are you?"},
        {id: 2, massage: "Good"},
    ],
    user: [
        {id: 1, name: "Polina"},
        {id: 2, name: "Lina#"},
        {id: 3, name: "Anastasia"},
        {id: 4, name: "Yuliya"},
        {id: 5, name: "Sonya"},
        {id: 6, name: "Anton"},
        {id: 7, name: "Maxim"},
    ],
    newMassageText: "",
}

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MASSAGE:

            return  {
                ...state,
                newMassageText: action.massage,
            }

        case SEND_MASSAGE:

            return  {
                ...state,
                massage: [...state.massage, {id: 3, massage: state.newMassageText}],
                newMassageText: '',
            }

        default:
            return state
    }
}

export let sendMassageCreator = () => {
    return {
        type: SEND_MASSAGE,
    }
}

export let updateNewMassageCreator = (text) => {
    return {
        type: UPDATE_NEW_MASSAGE,
        massage: text,
    }
}