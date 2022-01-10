import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import {Suspense} from "react";

import './App.css';
import Aside from "./components/aside/aside";
import {Music} from "./components/music/music";
import s from "./Page.module.css";
import ProfileContainer from "./components/profile/profileContainer";
import {HeaderContainer} from "./components/header/headerContainer";
import Login from "./components/login/login";
import {initializeApplication} from "./redax/appReducer";
import Loading from "./components/users/loading";
import {Dialogs} from "./components/dilogs/dialogs"
import {Users} from "./components/users/users"
//let DialogsContainer = React.lazy(() => import("./components/dilogs/dialogs"));
//let UsersContainer = React.lazy(() => import("./components/users/users"));


export let App = ({}) => {
    let initialized = useSelector(state => state.application.initialized)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeApplication())
    },[])
    if(!initialized){
        return <Loading loading={true}/>
    }
    return (
        <BrowserRouter>
            <div className="App">
                <HeaderContainer/>
                <main className={s.page}>
                    <div className={`${s.page__container} _container`}>
                        <div className={s.page__asidewrapper}>
                            <Aside/>
                        </div>
                        <div className={s.page__dilwrapper}>
                            <Suspense fallback={<div>загрузка</div>}>
                                <Switch>
                                    <Redirect exact from="/" to="/profile" />
                                    <Route path={"/dialogs"} render={() => <Dialogs/>}/>
                                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                                    <Route path={"/users"} render={() => <Users/>}/>
                                    <Route path={"/login"} render={() => <Login/>}/>
                                    <Route path={"/music"} component={() => <Music/>}/>
                                    <Route path={"/!*"} component={() => <div>404 not found</div>}/>
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                </main>
                <footer className="footer"></footer>
            </div>
        </BrowserRouter>
    );
}
