import {axiosRequest} from "../dal/api";
import {usersType} from "../types/types";
import {ActionType, GeneralThunkType} from "./redax-store";

export type initialState = {
    users: Array<usersType>
    currentPage: number
    totalPage:number
    count: number
    isLoading: boolean
    followingProgress: Array<number>
    term: string,
    friend: string
}

let initialState:initialState = {
    users:[],
    currentPage: 1,
    totalPage: 0,
    count: 5,
    isLoading: false,
    followingProgress: [],//array юзеров которые ждут ответа от сервера на подписку
    term: "",
    friend: "",
}

type GeneralActionType = ActionType<typeof usersActions>

export const userReducer = (state = initialState, action: GeneralActionType):initialState => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(item => {
                    if(item.id === action.userId){
                        item.followed = true;
                    }
                    return item
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(item => {
                    if(item.id === action.userId){
                        item.followed = false;
                    }
                    return item
                })
            }
        case "SET_USERS":
            return {...state, users: [ ...action.users]}
        case "SET_CURRENT_PAGE":
            return {...state,currentPage: action.currentPage}
        case "TOTAL_PAGE":
            return {...state,totalPage: action.count}
        case "LOADING":
            return {...state,isLoading: action.loading}
        case "FOLLOWINGINPROGRESS":
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id != action.userId)

            }
        case "CHANGE_TERM":
            return {...state, term: action.newTerm}
        case "CHANGE_FRIEND":
            return {...state, friend: action.isFriend}
        default:
            return state
    }

}

export let usersActions = {
    followed: (userId: number) => ({type:"FOLLOW", userId}as const),
    unFollowed: (userId:number) => ({type:"UNFOLLOW", userId}as const),
    setUsers: (users: Array<usersType>) => ({type:"SET_USERS",users}as const),
    setCurrentPage: (current: number) => ({type: "SET_CURRENT_PAGE", currentPage: current}as const),
    setTotalUsersCount: (count:number) => ({type: "TOTAL_PAGE", count}as const),
    toggleLoading: (loading: boolean) => ({type: "LOADING", loading}as const),
    followingProgressAC: (isFetching: boolean,userId: number) => ({type: "FOLLOWINGINPROGRESS", isFetching, userId}as const),
    changeTermAC: (newTerm: string) => ({type:"CHANGE_TERM",newTerm} as const),
    changeFriendAC: (isFriend: string) => ({type:"CHANGE_FRIEND",isFriend} as const)
}

export let applyFilters = (term: string,friend: string, currentPage : number): GeneralThunkType<GeneralActionType> => {
    return async (dispatch) => {
        dispatch(usersActions.setCurrentPage(currentPage))
        dispatch(usersActions.changeTermAC(term))
        dispatch(usersActions.changeFriendAC(friend))
    }
}

export let getUsersCreator = ():
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch,getState) => {
        let {term, friend, currentPage, count} = getState().usersPage
        dispatch(usersActions.toggleLoading(true))
        let data = await axiosRequest.user.getUsers(currentPage,count,term,friend)
        dispatch(usersActions.toggleLoading(false));
        dispatch(usersActions.setUsers(data.items))
        dispatch(usersActions.setTotalUsersCount(data.totalCount))
    }
}
export let pageChangedCreator = (pageNumber: number,count:number):
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch,getState) => {
        let {term,friend} = getState().usersPage
        dispatch(usersActions.toggleLoading(true))
        dispatch(usersActions.setCurrentPage(pageNumber))
        let data = await axiosRequest.user.getUsers(pageNumber,count,term,friend)
        dispatch(usersActions.toggleLoading(false))
        dispatch(usersActions.setUsers(data.items))
    }
}


export let unfollowedCreator = (itemId: number):
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch) => {
        dispatch(usersActions.followingProgressAC(true,itemId))
        let data = await axiosRequest.user.deleteFollow(itemId)
        if (data.resultCode === 0) {
            dispatch(usersActions.unFollowed(itemId))
        }
        dispatch(usersActions.followingProgressAC(false,itemId))
    }
}

export let followedCreator = (userId: number):
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch) => {
        dispatch(usersActions.followingProgressAC(true,userId))
        let data = await axiosRequest.user.follow(userId)
        if (data.resultCode === 0) {
            dispatch(usersActions.followed(userId))
        }
        dispatch(usersActions.followingProgressAC(false,userId))
    }
}