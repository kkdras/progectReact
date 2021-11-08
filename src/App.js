import './App.css';
import Aside from "./components/aside/aside";
import music from "./components/music";
import s from "./Page.module.css";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/dilogs/dialogsContainer";
import UsersContainer from "./components/users/usersContainer";
import ProfileContainer from "./components/profile/profileContainer";
import {HeaderContainerConnect} from "./components/header/headerContainer";

function App(props) {
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

                            <Route path={"/dilogs"} render={() => <DialogsContainer />}/>
                            <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
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
