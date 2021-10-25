const UPDATE_NEW_MASSAGE = "UPDATE_NEW_MASSAGE";
const SEND_MASSAGE = "SEND_MASSAGE";

export const dialogsReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NEW_MASSAGE:
            //debugger
            state.newMassageText = action.massage;
            return state
        case SEND_MASSAGE:
            //debugger
            state.massage.push({id: 3, massage: state.newMassageText})
            state.newMassageText = '';
            return state
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
        massage:text,
    }
}