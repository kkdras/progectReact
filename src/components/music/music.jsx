import style from "./musicStyles.module.css"
import {useContext, useEffect , useReducer, useState} from "react";
import React from "react";
//let MusicContext = React.createContext("mydindindon")

function useReducer1(reducer, initialState) {
    const [state, setState] = useState(initialState);

    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }

    return [state, dispatch];
}

let initialState = {
    count: 0
}
let reducer = (state,action) => {
    if(action.type === "tick"){
        return {count: state.count + 1}
    }
}

export let Music = () => {
    let [state,dispatch] = useReducer1(reducer,initialState);

    useEffect(() => {
        const id = setInterval(() => {
            console.log('You clicked on: ' + state.count);
            dispatch({ type: "tick" });

        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div>
            <p>You clicked {state.count} times</p>
        </div>
    );
}

