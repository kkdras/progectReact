import s from "./Post.module.css"
function Post(props){
    return (
        <div className={s.post}>
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