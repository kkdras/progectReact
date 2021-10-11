import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import Aside from "./components/aside/aside";
import Dilogs from "./components/dilogs/Dilogs";
import Profile from "./components/profile/profile";
import music from "./components/music";
import s from "./Page.module.css";
import {BrowserRouter, Route} from "react-router-dom";

function App() {
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
                            <Route exact path={"/dilogs"} component={Dilogs}/>
                            <Route path={"/profile"} component={Profile}/>
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
