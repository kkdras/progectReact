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
    let userData = [
        {id: 1, name: "Polina"},
        {id: 2, name: "Lina#"},
        {id: 3, name: "Anastasy"},
        {id: 4, name: "Julya"},
        {id: 5, name: "Sofy"},
    ];
    let massageData = [
        {id: 1, massage: "Hi, how you are you?"},
        {id: 1, massage: "Good"},
    ]
    let posts = [
        {id: 1, massage: 'Рос гей реэстр', like: 1, dislike: 100},
        {id: 1, massage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, ut?', like: 1111, dislike: 100},
    ]
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
                            <Route exact path={"/dilogs"} render={ () => <Dilogs userData={userData} massageData={massageData} /> } />
                            <Route path={"/profile"} render={() => <Profile posts={posts} /> }/>
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
