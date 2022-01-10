import s from "./Post.module.css"
import {FC} from "react";

type propsType = {
    like: number
    dis: number | undefined
    massage: string
    id: number
}

let Post:FC<propsType> = (props) => {
    return (
        <div  className={s.post}>
            <div className={s.post__post}>
                {props.massage}
                <br/>
                <span>Like - {props.like}</span> <br/>
                <span>Dislike - {props.dis}</span>
            </div>
        </div>
    )
}
export default Post;