import s from "../../Page.module.css";
import sp from "./profile.module.css";
import Post from "./myposts/post/post";
function Profile(props) {
    return (
        <div className={`${s.page__profile} ${sp.profile}`}>
            <div className={sp.profile__banner}>
                <img src="https://cdn.dribbble.com/users/3132/screenshots/2138242/media/e07b0e9a6413cd834957dfd89a4a5958.jpg?compress=1&resize=400x300" alt="" />
            </div>
            <div className={sp.profile__content}>
                {
                    props.posts.map(item => <Post massage={item.massage} like={item.like} dis={item.dislike} id={item.id} />)
                }
            </div>

        </div>
    )
}
export default Profile;