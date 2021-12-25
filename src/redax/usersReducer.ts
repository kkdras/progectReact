import {axiosRequest} from "../dal/api";
import {usersType} from "../types/types";
import {RootState} from "./redax-store";
import {ThunkAction} from "redux-thunk";

type initialState = {
    users: Array<usersType>
    currentPage: number
    totalPage:number
    count: number
    isLoading: boolean
    followingProgress: Array<number>
}

let initialState:initialState = {
    users:[],
    currentPage: 1,
    totalPage: 0,
    count: 5,
    isLoading: false,
    followingProgress: [],//array юзеров которые ждут ответа от сервера на подписку
}

enum ActionType {
    FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    SET_USERS = "SET_USERS",
    SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
    TOTAL_PAGE = "TOTAL_PAGE",
    LOADING = "LOADING",
    FOLLOWINGINPROGRESS = "FOLLOWINGINPROGRESS"
}
type GeneralActionType = followed |
    unFollowed |
    setUsers |
    setCurrentPage |
    setTotalUsersCount |
    toggleLoading |
    followingProgressAC

export const userReducer = (state = initialState, action: GeneralActionType):initialState => {
    switch (action.type) {
        case ActionType.FOLLOW:
            return {
                ...state,
                users: state.users.map(item => {
                    if(item.id === action.userId){
                        item.followed = true;
                    }
                    return item
                })
            }
        case ActionType.UNFOLLOW:
            return {
                ...state,
                users: state.users.map(item => {
                    if(item.id === action.userId){
                        item.followed = false;
                    }
                    return item
                })
            }
        case ActionType.SET_USERS:
            return {...state, users: [ ...action.users]}
        case ActionType.SET_CURRENT_PAGE:
            return {...state,currentPage: action.currentPage}
        case ActionType.TOTAL_PAGE:
            return {...state,totalPage: action.count}
        case ActionType.LOADING:
            return {...state,isLoading: action.loading}
        case ActionType.FOLLOWINGINPROGRESS:
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



type followed = {
    type: ActionType.FOLLOW
    userId: number
}
export let followed = (userId: number):followed => ({type:ActionType.FOLLOW, userId})

type unFollowed = {
    type: ActionType.UNFOLLOW
    userId: number
}
export let unFollowed = (userId:number):unFollowed => ({type:ActionType.UNFOLLOW, userId})

type setUsers = {
    type: ActionType.SET_USERS
    users: Array<any>
}
export let setUsers = (users: Array<usersType>):setUsers => ({type:ActionType.SET_USERS,users})

type setCurrentPage = {
    type: ActionType.SET_CURRENT_PAGE
    currentPage: number
}
export let setCurrentPage = (current: number):setCurrentPage => ({type: ActionType.SET_CURRENT_PAGE, currentPage: current})

type setTotalUsersCount = {
    type: ActionType.TOTAL_PAGE
    count: number
}
export let setTotalUsersCount = (count:number):setTotalUsersCount => ({type: ActionType.TOTAL_PAGE, count})

type toggleLoading = {
    type: ActionType.LOADING
    loading: boolean
}
export let toggleLoading = (loading: boolean):toggleLoading => ({type: ActionType.LOADING, loading})

type followingProgressAC = {
    type: ActionType.FOLLOWINGINPROGRESS
    isFetching: boolean
    userId: number
}
export let followingProgressAC = (isFetching: boolean,userId: number):followingProgressAC => ({type: ActionType.FOLLOWINGINPROGRESS, isFetching, userId})


export let getUsersCreator = (currentPage: number, count: number):
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionType> => {
    return async (dispatch) => {
        dispatch(toggleLoading(true))
        let data = await axiosRequest.user.getUsers(currentPage,count)
        dispatch(toggleLoading(false));
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}
export let pageChangedCreator = (pageNumber: number,count:number):
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionType> => {
    return async (dispatch) => {
        dispatch(toggleLoading(true))
        dispatch(setCurrentPage(pageNumber))
        let data = await axiosRequest.user.getUsers(pageNumber,count)
        dispatch(toggleLoading(false))
        dispatch(setUsers(data.items))
    }
}

export let unfollowedCreator = (itemId: number):
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionType> => {
    return async (dispatch) => {
        dispatch(followingProgressAC(true,itemId))
        let data = await axiosRequest.user.deleteFollow(itemId)
        if (data.resultCode === 0) {
            dispatch(unFollowed(itemId))
        }
        dispatch(followingProgressAC(false,itemId))
    }
}

export let followedCreator = (itemId: number):
    ThunkAction<Promise<void>, RootState, unknown, GeneralActionType> => {
    return async (dispatch) => {
        dispatch(followingProgressAC(true,itemId))
        let data = await axiosRequest.user.follow(itemId)
        if (data.resultCode === 0) {
            dispatch(followed(itemId))
        }
        dispatch(followingProgressAC(false,itemId))
    }
}