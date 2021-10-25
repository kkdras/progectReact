const ADD_POST = "ADD_POST";
const UPDATE_LETTER = "UPDATE_LETTER";

export const profileReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_LETTER:
            //debugger
            state.textarea = action.text;
            return state
        case ADD_POST:
            //debugger
            let massage = state.textarea;
            state.textarea = "";
            state.posts.push({id: 3, massage: massage,like: 66, dislike: 10});
            return state
        default:
            return state

    }

}
export let createActionAddPost = () => {
    return {
        type: ADD_POST,
    }
}

export let createActionLetterChange = (text) => {
    return {
        type: UPDATE_LETTER,
        text:text,
    }
}