import PostContainer from "./post/postContainer";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    }
}




const MyPostsContainer = connect(mapStateToProps,null)(PostContainer)
export default MyPostsContainer;