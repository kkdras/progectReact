import { axiosRequest, IRespType, ResultCode } from "../dal/api";
import {ISetUserProfile, IUserPhoto, userProfileType} from "../types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {setUserPhotos} from "./authReducer";
import {isBoolean} from "util";


type initialStateType = {
   userProfile: userProfileType | null
   editMode: boolean
   submitButtonDisabled: boolean
   status: null | string
   pendingStatus: boolean
}

let initialState: initialStateType = {
   userProfile: null,
   editMode: false,
   submitButtonDisabled: false,
   status: null,
   pendingStatus: false
}

let profileSlice = createSlice({
   name: "profile",
   initialState,
   reducers: {
      togglePendingStatus(state) {
         state.pendingStatus = !state.pendingStatus
      },
      setStatusProfile(state, action: PayloadAction<string>) {
         state.status = action.payload
      },
      setUserPhoto(state, action: PayloadAction<IUserPhoto['photos']>) {
         if (state.userProfile && state.userProfile.photos) {
            state.userProfile.photos = action.payload
         }
      },
      toggleSubmitButton(state) {
         state.submitButtonDisabled = !state.submitButtonDisabled
      },
      toggleEditMode(state, action: PayloadAction<boolean | undefined>) {
         if(isBoolean(action.payload)){
            state.editMode = action.payload
            return

         }
         state.editMode = !state.editMode
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getUserProfile.fulfilled, ((state, action) => {
            console.log(action)
            state.userProfile = action.payload
         }))
         .addCase(putProfileObject.pending, (state => {
            state.submitButtonDisabled = !state.submitButtonDisabled
         }))
         .addCase(putProfileObject.fulfilled, (state => {
            state.submitButtonDisabled = !state.submitButtonDisabled
         }
         ))
         .addCase(putProfileObject.rejected, (state => {
            state.submitButtonDisabled = !state.submitButtonDisabled
         }
         ))
   }
})
export default profileSlice.reducer

export let {
   togglePendingStatus,
   setStatusProfile,
   setUserPhoto,
   toggleSubmitButton,
   toggleEditMode
} = profileSlice.actions

export let getUserProfile = createAsyncThunk(
   "profile/getProfile",
   async (userId: number) => {
      return await axiosRequest.profile.getUserProfile(userId)
         .then(r => r.data)
   }
)


//getStatusProfile
export let getProfileStatus = createAsyncThunk(
   "profile/getProfileStatus",
   async (userId: number, { dispatch }) => {
      dispatch(togglePendingStatus())
      let response
      try {
         response = await axiosRequest.profile.getStatus(userId)
      } catch (e) {
         response = { data: "Some error happen" }
      }
      //debugger
      dispatch(setStatusProfile(response.data))
      dispatch(togglePendingStatus())
   }
)
//updateStatusProfile
export let updateProfileStatus = createAsyncThunk(
   "profile/updateProfileStatus",
   async (status: string, { dispatch }) => {
      dispatch(togglePendingStatus())
      let response = await axiosRequest.profile.setStatus(status)
      if (response.data.resultCode === 0) {
         dispatch(setStatusProfile(status))
         dispatch(togglePendingStatus())
      }
   }
)

export let setProfilePhoto = createAsyncThunk(
   "profile/setProfilePhoto",
   async (photo: any, { dispatch }) => {
      let response = await axiosRequest.profile.setPhoto(photo)
      if (response.data.resultCode === 0) {
         dispatch(setUserPhoto(response.data.data.photos))
         dispatch(setUserPhotos(response.data.data.photos))
      }
   }
)

export let putProfileObject = createAsyncThunk<
   IRespType,
   ISetUserProfile,
   { rejectValue: IRespType }
>("profile/putProfileObject",
   async (setProfile, { dispatch, rejectWithValue }) => {
      let response = await axiosRequest.profile.setDescription(setProfile)
      if (response.resultCode === 1) return rejectWithValue(response)

      dispatch(getUserProfile(setProfile.userId))
      dispatch(toggleEditMode())

      return { messages: [], data: {}, resultCode: ResultCode.Success } as IRespType
   }
)

