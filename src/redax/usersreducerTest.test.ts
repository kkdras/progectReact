import {initialState, userReducer, usersActions} from "./usersReducer";

let state: initialState;

beforeEach(() => {
    state = {
        users: [
            {
                name: "anton",
                id: 0,
                photos: {
                    small: "gda",
                    large: "sfaf",
                },
                followed: false,
                status: "I,m happy"
            },
            {
                name: "Mary J",
                id: 1,
                photos: {
                    small: "gda",
                    large: "sfaf",
                },
                followed: true,
                status: "Life is good"
            }],
        currentPage: 1,
        totalPage: 0,
        count: 5,
        isLoading: false,
        followingProgress: [],//array юзеров которые ждут ответа от сервера на подписку
        term: "",
        friend: "",
    }
})


test("userReducerTestFollow", () => {
    let newState = userReducer(state,usersActions.followed(0))
    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("userReducerTestUnfollow", () => {
    let newState = userReducer(state,usersActions.unFollowed(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeFalsy()
})