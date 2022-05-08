import {axiosRequest} from "../dal/api";
import {usersType} from "../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../app/redax-store";
import {Dispatch} from "react";


export type initialState = {
   users: Array<usersType>
   currentPage: number
   totalUsersCount: number
   userOfPage: number
   isLoading: boolean
   followingProgress: Array<number>
   term: string,
   friend: string
}

let initialState: initialState = {
   users: [],
   currentPage: 1,
   totalUsersCount: 0,
   userOfPage: 5,
   isLoading: false,
   followingProgress: [],//array юзеров которые ждут ответа от сервера на подписку
   term: "",
   friend: "",
}

type followInProgressType = { isFetching: boolean, userId: number }

let usersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload
      },
      setTerm(state, action: PayloadAction<string>) {
         state.term = action.payload
      },
      setFriend(state, action: PayloadAction<string>) {
         state.friend = action.payload
      },
      setUsersOnPage(state, action: PayloadAction<number>) {
         state.userOfPage = action.payload
      },
      toggleLoading(state) {
         state.isLoading = !state.isLoading
      },
      setUsers(state, action: PayloadAction<Array<usersType>>){
         state.users = action.payload
      },
      setTotalUsersCount(state, action: PayloadAction<number>) {
         state.totalUsersCount = action.payload
      },
      followInProgress(state, action: PayloadAction<followInProgressType>) {
         state.followingProgress = action.payload.isFetching
            ? [...state.followingProgress, action.payload.userId]
            : state.followingProgress.filter(id => id != action.payload.userId)
      },
      unfollow(state,action:PayloadAction<number>){
         state.users = state.users.map(item => {
            if(item.id === action.payload){
               item.followed = false;
            }
            return item
         })
      },
      follow(state,action:PayloadAction<number>){
         state.users = state.users.map(item => {
            if(item.id === action.payload){
               item.followed = true;
            }
            return item
         })
      }
   }
})

export default usersSlice.reducer

export let {
   setCurrentPage,
   setTerm,
   setFriend,
   setUsersOnPage,
   toggleLoading,
   setUsers,
   setTotalUsersCount,
   followInProgress,
   unfollow,
   follow
} = usersSlice.actions

type applyFilters = {
   term: string,
   friend: string,
   currentPage: number,
   userOfPage: number
}

export let applyFilters = createAsyncThunk(
   "users/applyFilters",
   async (ars: applyFilters, {dispatch}) => {
      dispatch(setCurrentPage(ars.currentPage))
      dispatch(setTerm(ars.term))
      dispatch(setFriend(ars.friend))
      dispatch(setUsersOnPage(ars.userOfPage))
   }
)

type ThunkApiType = {
   getState: () => RootState,
   dispatch: Dispatch<any>
}


//getUsersCreator
export let getUsers = createAsyncThunk<Promise<any>, void,
   {
      dispatch: AppDispatch
      state: RootState
   }>(
   "users/getUsers",
   async (_, {dispatch, getState}) => {
      let {term, friend, currentPage, userOfPage} = getState().usersPage
      dispatch(toggleLoading())
      let data = await axiosRequest.user.getUsers(currentPage, userOfPage, term, friend)
      dispatch(toggleLoading())
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
   }
)


type changePageArgsType = { pageNumber: number, count: number }
export let changePageNumber = createAsyncThunk<Promise<any>, changePageArgsType,
   {
      dispatch: AppDispatch
      state: RootState
   }>(
   "users/changePage",
   async (arg, {dispatch, getState}) => {
      let {term, friend} = getState().usersPage
      dispatch(toggleLoading())
      dispatch(setCurrentPage(arg.pageNumber))
      let data = await axiosRequest.user.getUsers(arg.pageNumber, arg.count, term, friend)
      dispatch(toggleLoading())
      dispatch(setUsers(data.items))
   }
)
//unfollowedCreator
export let unfollowUser = createAsyncThunk(
   "users/unfollowUser",
   async (itemId: number, {dispatch}) => {
      dispatch(followInProgress({isFetching:true, userId:itemId}))
      let data = await axiosRequest.user.deleteFollow(itemId)
      if (data.resultCode === 0) {
         dispatch(unfollow(itemId))
      }
      dispatch(followInProgress({isFetching:false, userId:itemId}))
   }
)

export let followUser = createAsyncThunk(
   "users/followUser",
   async (userId:number, {dispatch}) => {
      dispatch(followInProgress({isFetching:true, userId}))
      let data = await axiosRequest.user.follow(userId)
      if (data.resultCode === 0) {
         dispatch(follow(userId))
      }
      dispatch(followInProgress({isFetching:false, userId}))
   }
)

/*type GeneralActionType = ActionType<typeof usersActions>

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
            return {...state,totalUsersCount: action.count}
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
        case "users/SET_TOTAL_USER_OF_PAGE":
            return {...state, userOfPage: action.number}
        default:
            return state
    }

}

export let usersActions = {
    setTotalUserOfPage: (number: number) => ({type: "users/SET_TOTAL_USER_OF_PAGE", number} as const),
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

export let applyFilters = (term: string,friend: string, currentPage: number, userOfPage: number): GeneralThunkType<GeneralActionType> => {
    return async (dispatch,getState) => {
        dispatch(usersActions.setCurrentPage(currentPage))
        dispatch(usersActions.changeTermAC(term))
        dispatch(usersActions.changeFriendAC(friend))
        dispatch(usersActions.setTotalUserOfPage(userOfPage))
    }
}

export let getUsersCreator = ():
    GeneralThunkType<GeneralActionType> => {
    return async (dispatch,getState) => {
        let {term, friend, currentPage, userOfPage} = getState().usersPage
        dispatch(usersActions.toggleLoading(true))
        let data = await axiosRequest.user.getUsers(currentPage,userOfPage,term,friend)
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
}*/
