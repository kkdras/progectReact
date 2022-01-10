import sp from "../../profile.module.css";
import Post from "./post";
import React, {FC} from "react";
import {useTypesSelector} from "../../../../types/hooks";

let PostContainer: FC = () => {
    let posts = useTypesSelector(state => state.profilePage.posts)
    return (
        <div className={sp.profile__content}>
            {
                posts.map(item => <Post massage={item.massage} like={item.like} dis={item.dislike} id={item.id} />)
            }
        </div>
    )
}
export default PostContainer;