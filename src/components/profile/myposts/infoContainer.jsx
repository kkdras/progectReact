import {createActionAddPost, createActionLetterChange} from "../../../redax/profileReducer";
import Info from "./info";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        textarea: state.profilePage.textarea,
        userProfile: state.profilePage.userProfile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPostContainer() {
            dispatch(createActionAddPost())
        },
        letterChangeContainer(text) {
            let action = createActionLetterChange(text)
            dispatch(action);
        }
    }
}

const InfoContainer = connect(mapStateToProps, mapDispatchToProps)(Info)

export default InfoContainer;
