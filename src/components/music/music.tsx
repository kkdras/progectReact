import React, {FC, useState} from "react";


export let Music: FC = () => {
    let currentTarget = <ChildMusic key={10}/>
    let date = Date.now()

    while (Date.now() - date < 1000){}
    return (
        <div key={100}>
            {currentTarget}
        </div>
    );
}

let ChildMusic: FC = () => {
    let [state,setState] = useState(1)

    return <div key={1} style={{color: "orange", letterSpacing: "2px"}}>
        <Button key={2} calBack={() => setState((prev) => prev + 1)}/>
        <br key={3}/>
        <Preview key={4} number={state}/>
        <span style={{border: "1p solid red"}}> + ауе</span>
    </div>
}
type ForButton = {
    calBack: () => void
}

let Button: FC<ForButton> = ({calBack}) => {
    return <button onClick={calBack} style={{border:"2px solid orange"}}>Выполнить действие</button>
}
type PreviewType = {
    number: number
}
let Preview:
   FC<PreviewType> = ({number}) => {
    let currenTarget = <span style={{border: "1p solid red"}}>{number} + ауе</span>
    console.log(currenTarget)
    return currenTarget
}
