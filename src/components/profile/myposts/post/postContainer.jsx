import sp from "../../profile.module.css";
import Post from "./post";

function PostContainer(props){
    return (
        <div className={sp.profile__content}>
            {
                props.posts.map(item => <Post massage={item.massage} like={item.like} dis={item.dislike} id={item.id} />)
            }
        </div>
    )
}
export default PostContainer;