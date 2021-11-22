import Profile from "./profile";
import React from "react";
import {getStatusProfile, getUserProfile} from "../../redax/profileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId || this.props.myId
        this.props.getStatusProfile(userId)
        this.props.getUserProfile(userId)
    }
    render(){
        return (
            <Profile />
        )
    }
}
let mapStateToProps = state => {
    return {
        myId: state.auth.userId,
        authorized: state.auth.isLog
    }
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps,{getUserProfile,getStatusProfile}),
)(ProfileContainer)