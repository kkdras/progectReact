import PostContainer from "./post/postContainer";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(PostContainer)
export default MyPostsContainer;