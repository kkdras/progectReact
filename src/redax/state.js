import {funcRender} from "../render";

let state = {
    posts: [
        {id: 1, massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?', like: 1, dislike: 100},
        {id: 1, massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?', like: 1111, dislike: 100},
    ],
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
}

export let addPost = (text) => {
    let newPost = {
        id: 3,
        massage: text,
        like: 0,
    }
    state.posts.push(newPost);
    funcRender(state,addPost);
}

export default state;
