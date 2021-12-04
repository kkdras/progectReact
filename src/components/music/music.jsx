import style from "./musicStyles.module.css"
import {useContext, useRef, useState} from "react";
import React from "react";
let MusicContext = React.createContext("mydindindon")
export let Music = () => {
    let state = useRef("определенная строка")
    let [tmp,setTmp] = useState()
    return (
        <MusicContext.Provider value={state}>
            <MusicWrapper/>
            <input type="text" value={tmp} onChange={event => setTmp(event.target.value)}/>
        </MusicContext.Provider>
    )
}

let MusicWrapper = (props) => {
    console.log("случайный рендер")
    let value = useContext(MusicContext)
    let [state,setState] = useState("Я внутренний контейнер")
    let onsubmit = (e) => {
        e.preventDefault()
        value.current = state
    }
    return (<>
            <div style={{color: "red"}}>{value.current}</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis consequatur ducimus est eum hic ipsum iste odit quam repellendus!</div>
            <input value={state} onChange={e => {
                setState(e.target.value)
                console.log("render fro input")
            }} className={style.button__style} type="text"/>
            <button type={"submit"} onClick={onsubmit}>отправить</button>
        </>
    )
}