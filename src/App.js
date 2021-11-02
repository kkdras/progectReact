import logo from './logo.svg';
import './App.css';
import Header from "./components/header/header";
import Aside from "./components/aside/aside";
import Profile from "./components/profile/profile";
import music from "./components/music";
import s from "./Page.module.css";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/dilogs/dialogsContainer";
import UsersContainer from "./components/users/usersContainer";

function App(props) {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <main className={s.page}>
                    <div className={`${s.page__container} _container`}>
                        <div className={s.page__asidewrapper}>
                            <Aside/>
                        </div>
                        <div className={s.page__dilwrapper}>

                            <Route exact path={"/dilogs"} render={() => <DialogsContainer />}/>
                            <Route path={"/profile"} render={() => <Profile/>}/>
                            <Route path={"/users"} render={() => <UsersContainer/>}/>
                            <Route path={"/music"} component={music}/>
                        </div>
                    </div>
                </main>
                <footer className="footer"></footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
