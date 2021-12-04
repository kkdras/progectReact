import {createActionAddPost, profileReducer} from "./profileReducer";

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
    ]
}


test('test profile reducer', () => {
    let action = createActionAddPost("какой то текст")
    let newState = profileReducer(initialState,action)
    expect(newState.posts.length).toBe(3)
});
