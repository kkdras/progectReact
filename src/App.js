import './App.css';
import Aside from "./components/aside/aside";
import {Music} from "./components/music/music";
import s from "./Page.module.css";
import {BrowserRouter, Route} from "react-router-dom";
import ProfileContainer from "./components/profile/profileContainer";
import {HeaderContainerConnect} from "./components/header/headerContainer";
import Login from "./components/login/login";
import {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApplication} from "./redax/appReducer";
import Loading from "./components/users/loading";
import React from "react";
import {Suspense} from "react";
let DialogsContainer = React.lazy(() => import("./components/dilogs/dialogsContainer"));
let UsersContainer = React.lazy(() => import("./components/users/usersContainer"));

class App extends Component {
    componentDidMount() {
        this.props.initializeApplication()
    }
    render() {
        if(!this.props.initialized){
            return <Loading loading={true}/>
        }
        return (
            <BrowserRouter>
                <div className="App">
                    <HeaderContainerConnect/>
                    <main className={s.page}>
                        <div className={`${s.page__container} _container`}>
                            <div className={s.page__asidewrapper}>
                                <Aside/>
                            </div>
                            <div className={s.page__dilwrapper}>
                                <Suspense fallback={<div>загрузка</div>}>
                                    <Route path={"/dilogs"} render={() => <DialogsContainer/>}/>
                                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                                    <Route path={"/users"} render={() => <UsersContainer/>}/>
                                    <Route path={"/login"} render={() => <Login/>}/>
                                    <Route path={"/music"} component={() => <Music/>}/>
                                </Suspense>
                            </div>
                        </div>
                    </main>
                    <footer className="footer"></footer>
                </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = state => ({initialized: state.application.initialized})

export default compose(
    connect(mapStateToProps,{initializeApplication})
)(App)
