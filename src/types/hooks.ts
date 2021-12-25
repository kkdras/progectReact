import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../redax/redax-store";

export const useTypesSelector:TypedUseSelectorHook<RootState> = useSelector
