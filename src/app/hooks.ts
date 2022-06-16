import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./redax-store";

export let useTypesSelector:TypedUseSelectorHook<RootState> = useSelector
export let useAppDispatch = () => useDispatch<AppDispatch>()

export let usePrivateContent = () => {
   let isLog = useTypesSelector(state => state.auth.isLog)
   return !isLog
}
