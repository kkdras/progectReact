import React, {Suspense, useEffect} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import './App.css';
import Aside from "./components/aside/aside";
import s from "./Page.module.css";
import {ProfileContainer} from "./components/profile/profileContainer";
import {HeaderContainer} from "./components/header/headerContainer";
import Login from "./components/login/login";
import Loading from "./components/users/loading";
import {Dialogs} from "./components/dilogs/dialogs"
import {useTypesSelector} from "./app/hooks";
import {getUserInfo} from "./redax/authReducer";
import {Users} from "./components/users/Users";


export let App = ({ }) => {
   let isInitialize = useTypesSelector(state => state.auth.isLog)
   let dispatch = useDispatch()
   useEffect(() => {
      dispatch(getUserInfo())
   }, [])
   if (isInitialize === null) {
      return <Loading loading={true} />
   }
   return (
      <BrowserRouter>
         <div className="App">
            <HeaderContainer />
            <main className={s.page}>
               <div className={`${s.page__container} _container`}>
                  <div className={s.page__asideWrapper}>
                     <Aside />
                  </div>
                  <div className={s.page__wrapper}>
                     <Suspense fallback={<div>загрузка</div>}>
                        <Switch>
                           <Redirect exact from="/" to="/profile" />
                           <Route path={"/dialogs"} render={() => <Dialogs />} />
                           <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                           <Route path={"/users"} render={() => <Users />} />
                           <Route path={"/login"} render={() => <Login />} />
                           <Route path={"/!*"} component={() => <div>404 not found</div>} />
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
