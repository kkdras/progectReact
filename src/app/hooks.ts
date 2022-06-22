import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {store} from "./redax-store";

export let useTypesSelector:TypedUseSelectorHook<RootState> = useSelector

export let usePrivateContent = () => {
   let isLog = useTypesSelector(state => state.auth.isLog)
   return !isLog
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()