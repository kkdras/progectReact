let FOLLOW = "FOLLOW";
let UNFOLLOW = "UNFOLLOW";
let SET_USERS = "SET USERS"


let initialState = {
    users:[],
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(item => {
                    if(item.id === action.userId){
                        item.followed = true;
                    }
                    return item
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(item => {
                    if(item.id === action.userId){
                        item.followed = false;
                    }
                    return item
                })
            }
        case SET_USERS:
            debugger
            return {...state, users: [...state.users, ...action.users]}

        default:
            return state
    }

}
export let followAC = (userId) => {
    return {
        type:FOLLOW,
        userId,
    }
}

export let unfollowAC = (userId) => {
    return {
        type:UNFOLLOW,
        userId,
    }
}

export let setUsers = (users) => {
    return {
        type:SET_USERS,
        users: users,
    }
}
