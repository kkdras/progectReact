const ADD_POST = "ADD_POST";
const UPDATE_LETTER = "UPDATE_LETTER";
export let store = {
    _state: {
        profile: {
            posts: [
                {
                    id: 1,
                    massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?',
                    like: 1,
                    dislike: 100
                },
                {
                    id: 1,
                    massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?',
                    like: 1111,
                    dislike: 100
                },
            ],
            textarea: 'рыба текст',
        },
        dilogs: {
            massage: [
                {id: 1, massage: "Hi, how you are you?"},
                {id: 2, massage: "Good"},
            ],
            user: [
                {id: 1, name: "Polina"},
                {id: 2, name: "Lina#"},
                {id: 3, name: "Anastasy"},
                {id: 4, name: "Julya"},
                {id: 5, name: "Sofy"},
                {id: 6, name: "Anton"},
                {id: 7, name: "Maxim"},
            ],
        },
    },
    _funcRender(one, two, three) {
    },
    updateRender(observer) {
        this._funcRender = observer
    },
    get state() {
        return this._state
    },
    dispatch(action){
        if(action.type === ADD_POST){
            let newPost = {
                id: 3,
                massage: this._state.profile.textarea,
                like: 0,
            }
            this._state.profile.posts.push(newPost);
            this._state.profile.textarea = '';
            this._funcRender(this);
        }else if(action.type === UPDATE_LETTER){
            this._state.profile.textarea = action.text;
            this._funcRender(this);
        }
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

