let funcRender = (one,two,three) => {
}

export let updateRender = (observer) => {
    funcRender = observer
}

let state = {
    profile: {
        posts: [
            {id: 1, massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?', like: 1, dislike: 100},
            {id: 1, massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?', like: 1111, dislike: 100},
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
}

export let addPost = () => {
    let newPost = {
        id: 3,
        massage: state.profile.textarea,
        like: 0,
    }
    state.profile.posts.push(newPost);
    state.profile.textarea = '';
    funcRender(state,addPost,updateLetter);
}

export let updateLetter = (text) => {
    state.profile.textarea = text;
    console.log(state)
    funcRender(state,addPost,updateLetter);
}

export default state;
