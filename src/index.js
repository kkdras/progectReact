import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import state, {addPost,updateLetter,updateRender} from "./redax/state";
import ReactDOM from "react-dom";
import App from "./App";

let funcRender = (state,addPost,updateLetter) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} updateLetter={updateLetter}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
funcRender(state,addPost,updateLetter);

updateRender(funcRender);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
