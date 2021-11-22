import {connect} from "react-redux";
import {createActionAddPost, updateStatusProfile} from "../../../redax/profileReducer";
import Info from "./info";

const mapStateToProps = (state) => {
    return {
        textarea: state.profilePage.textarea,
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
    }
}

const InfoContainer = connect(mapStateToProps, {updateStatusProfile,createActionAddPost})(Info)

export default InfoContainer;

