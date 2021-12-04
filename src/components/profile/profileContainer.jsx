import Profile from "./profile";
import React, {useEffect} from "react";
import {getStatusProfile, getUserProfile} from "../../redax/profileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


/*class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId || this.props.myId
        this.props.getStatusProfile(userId)
        this.props.getUserProfile(useId)
    }
    render(){
        return (
            <Profile />
        )
    }
}*/

let ProfileContainer = (props) => {
    useEffect(() => {
        let userId = props.match.params.userId || props.myId
        props.getStatusProfile(userId)
        props.getUserProfile(userId)
    }, [props.myId, props.match.params.userId])
    return (
        <Profile isOwn={!!props.match.params.userId} />
    )
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