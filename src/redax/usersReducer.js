import {axiosRequest} from "../dal/api";

let FOLLOW = "FOLLOW";
let UNFOLLOW = "UNFOLLOW";
let SET_USERS = "SET USERS";
let SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
let TOTAL_PAGE = "TOTAL_PAGE";
let LOADING = "LOADING";
let DISABLED_BUTTON = "DISABLED_BUTTON";

let initialState = {
    users:[],
    currentPage: 1,
    totalPage: 0,
    count: 5,
    isLoading: false,
    followingProgress: [],
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
            return {...state, users: [ ...action.users]}
        case SET_CURRENT_PAGE:
            return {...state,currentPage: action.currentPage}
        case TOTAL_PAGE:
            return {...state,totalPage: action.count}
        case LOADING:
            //debugger
            return {...state,isLoading: action.loading}
        case DISABLED_BUTTON:
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id != action.userId)

            }
        default:
            return state
    }

}
export let followed = (userId) => {
    return {
        type:FOLLOW,
        userId,
    }
}

export let unFollowed = (userId) => {
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

export let setCurrentPage = (current) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: current,
    }
}
export let setTotalUsersCount = (count) => {
    return {
        type: TOTAL_PAGE,
        count,
    }
}
export let toggleLoading = (loading) => {
    return {
        type: LOADING,
        loading,
    }
}
export let followingProgressAC = (isFetching,userId) => {
    return {
        type: DISABLED_BUTTON,
        isFetching,
        userId,
    }
}

export let getUsersCreator = (currentPage, count) => {
    return dispatch => {
        dispatch(toggleLoading(true))
        axiosRequest.user.getUsers(currentPage,count).then(data => {
            dispatch(toggleLoading(false));
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}
export let pageChangedCreator = (pageNumber,count) => {
    return dispatch => {
        dispatch(toggleLoading(true))
        dispatch(setCurrentPage(pageNumber))
        axiosRequest.user.pageChanged(pageNumber,count)
            .then(data => {
                dispatch(toggleLoading(false))
                dispatch(setUsers(data.items))
            })
    }
}
export let unfollowedCreator = (itemId) => {
    return dispatch => {
        dispatch(followingProgressAC(true,itemId))
        axiosRequest.user.deleteFollow(itemId).then(data => {
                if (data.resultCode === 0) {
                    dispatch(unFollowed(itemId))
                }
            dispatch(followingProgressAC(false,itemId))
            }
        )
    }
}

export let followedCreator = (itemId) => {
    return dispatch => {
        dispatch(followingProgressAC(true,itemId))
        axiosRequest.user.follow(itemId).then(data => {
                if (data.resultCode === 0) {
                    dispatch(followed(itemId))
                }
                dispatch(followingProgressAC(false,itemId))
            }
        )
    }
}