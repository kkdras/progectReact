import s from "../../Page.module.css";
import sp from "./profile.module.css";
import Post from "./myposts/post/post";
import Info from "./myposts/info";
function Profile(props) {
    return (
        <div className={`${s.page__profile} ${sp.profile}`}>
            <Info/>
            <div className={sp.profile__content}>
                {
                    props.posts.map(item => <Post massage={item.massage} like={item.like} dis={item.dislike} id={item.id} />)
                }
            </div>

        </div>
    )
}
export default Profile;