import {connect,} from "react-redux";
/*const mapStateToProps = (state) => {
    return {
        textarea: state.profilePage.textarea,
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
    }
}

const InfoContainer = connect(mapStateToProps, {setPhotoProfile,updateStatusProfile,createActionAddPost})(<Info />)

export default InfoContainer;*/

import {
    createActionAddPost,
    setPhotoProfile,
    updateStatusProfile
} from "../../../redax/profileReducer";
import Info from "./info";


export let InfoContainer = (props) => {
    debugger
    return <Info isOwn={props.isOwn}
                 createActionAddPost={createActionAddPost}
                 setPhotoProfile={setPhotoProfile}
                 updateStatusProfile={updateStatusProfile}/>
}