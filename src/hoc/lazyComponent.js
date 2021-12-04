import React from "react";
import {Suspense} from "react";
export let lazyLoader = (Component) => {
    return (props) => {
        return (<Suspense fallback={<div>загрузка</div>}>
                <Component {...props}/>
        </Suspense>)
    }

}