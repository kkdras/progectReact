import {axiosRequest, friendUnion} from "../dal/api";
import {IUserOfList} from "../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../app/hooks";



interface IUsersInitialState {
   usersID: number[],
   users: {[key: number]: IUserOfList}
   currentPage: number
   totalUsersCount: number
   usersPerPage: number
   isLoading: boolean
   term: string,
   friend: friendUnion
}

let initialState: IUsersInitialState = {
   usersID: [],
   users: {},
   currentPage: 1,
   totalUsersCount: 0,
   usersPerPage: 5,
   isLoading: false,
   term: "",
   friend: "",
}

interface IFollowInPrAct { isFetching: boolean, userId: number }

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
      setFriend(state, action: PayloadAction<"true" | "false" | "">) {
         state.friend = action.payload
      },
      setUsersOnPage(state, action: PayloadAction<number>) {
         state.usersPerPage = action.payload
      },
      toggleLoading(state) {
         state.isLoading = !state.isLoading
      },
      setUsers(state, action: PayloadAction<IUserOfList[]>){
         action.payload.forEach(item => {
            state.users[item.id] = item
         })
         state.usersID = action.payload.map(item => item.id)

      },
      setTotalUsersCount(state, action: PayloadAction<number>) {
         state.totalUsersCount = action.payload
      },
      followInProgress(state, action: PayloadAction<IFollowInPrAct>) {
         state.users[action.payload.userId].pendingFollow = action.payload.isFetching
      },
      unfollow(state,action:PayloadAction<number>){
         state.users[action.payload].followed = false
      },
      follow(state,action:PayloadAction<number>){
         state.users[action.payload].followed = true
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

export interface ISearchFilters {
   term: string,
   friend: friendUnion,
   usersPerPage: number
   currentPage?: number
}

export let applyFilters = createAsyncThunk<void, ISearchFilters,
   {
      dispatch: AppDispatch
      state: RootState
   }>(
   "users/applyFilters",
    (a: ISearchFilters, {dispatch,getState}) => {
      let {term,friend,usersPerPage} = getState().usersPage
      if(term !== a.term) dispatch(setTerm(a.term))
      if(friend !== a.friend) dispatch(setFriend(a.friend))
      if(usersPerPage !== a.usersPerPage) dispatch(setUsersOnPage(+a.usersPerPage || 1))

      if(a.currentPage !== undefined) dispatch(setCurrentPage(+a.currentPage || 1))
      else {
         if (
            term !== a.term ||
            friend !== a.friend ||
            usersPerPage !== a.usersPerPage
         ) dispatch(setCurrentPage(1))
      }
   }
)


//getUsersCreator
export let getUsers = createAsyncThunk<Promise<any>, void,
   {
      dispatch: AppDispatch
      state: RootState
   }>(
   "users/getUsers",
   async (_, {dispatch, getState}) => {
      let {term, friend, currentPage, usersPerPage} = getState().usersPage
      dispatch(toggleLoading())
      let data = await axiosRequest.users.getUsers(currentPage, usersPerPage, term, friend)
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
      let data = await axiosRequest.users.getUsers(arg.pageNumber, arg.count, term, friend)
      dispatch(toggleLoading())
      dispatch(setUsers(data.items))
   }
)
//unfollowedCreator
export let unfollowUser = createAsyncThunk(
   "users/unfollowUser",
   async (itemId: number, {dispatch}) => {
      dispatch(followInProgress({isFetching:true, userId:itemId}))
      let data = await axiosRequest.users.unfollowUser(itemId)
      if (data.resultCode === 0) {
         dispatch(unfollow(itemId))
      }
      dispatch(followInProgress({isFetching:false, userId:itemId}))
   }
)

export let followUser = createAsyncThunk(
   "users/followUser",
   async (userId: number, {dispatch}) => {
      dispatch(followInProgress({isFetching:true, userId}))
      let data = await axiosRequest.users.followUser(userId)
      if (data.resultCode === 0) {
         dispatch(follow(userId))
      }
      dispatch(followInProgress({isFetching:false, userId}))
   }
)

export let usersPerPageSelector = (state: RootState) => state.usersPage.usersPerPage
export let currentPageSelector = (state: RootState) => state.usersPage.currentPage
export let friendSelector = (state: RootState) => state.usersPage.friend
export let termSelector = (state: RootState) => state.usersPage.term
