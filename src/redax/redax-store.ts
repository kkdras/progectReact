import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {userReducer} from "./usersReducer";
import {authReducer, GeneralActionsType} from "./authReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: userReducer,
    auth: authReducer,
    application: appReducer,
})

export type RootState = ReturnType<typeof reducers>

const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type ActionType<T extends {[key:string]: (...arg: Array<any>) => any}> = ReturnType<PropertiesTypes<T>>

export type GeneralThunkType<A extends Action, ReturnT = Promise<void>> = ThunkAction<ReturnT, RootState, unknown, A>

