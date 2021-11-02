const ADD_POST = "ADD_POST";
const UPDATE_LETTER = "UPDATE_LETTER";

let initialState = {
    posts: [
        {
            id: 1,
            massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?',
            like: 1,
            dislike: 100
        },
        {
            id: 2,
            massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?',
            like: 1111,
            dislike: 100
        },
    ],
    textarea: 'рыба текст',
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LETTER:

            return  {
                ...state,
                textarea: action.text,
            }

        case ADD_POST:
            let massage = state.textarea;
            return  {
                ...state,
                posts: [...state.posts,{id: 3, massage: massage, like: 66, dislike: 10}],
                textarea: "",
            }
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
        text: text,
    }
}