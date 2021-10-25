import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";

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
                    id: 2,
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
                {id: 3, name: "Anastasia"},
                {id: 4, name: "Yuliya"},
                {id: 5, name: "Sonya"},
                {id: 6, name: "Anton"},
                {id: 7, name: "Maxim"},
            ],
            newMassageText: "",
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
        //debugger
        this._state.profile = profileReducer(this._state.profile, action)
        this._state.dilogs = dialogsReducer(this._state.dilogs, action)

        this._funcRender(this);
    }
}





