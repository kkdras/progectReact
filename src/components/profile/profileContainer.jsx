import Profile from "./profile";
import React from "react";
import * as axios from "axios";
import {setUserProfile} from "../../redax/profileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component{
    componentDidMount() {
        //debugger
        let userId = this.props.match.params.userId || 2
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data)
                console.log(response)
            }
        )
    }
    render(){
        return (
            <Profile />
        )
    }
}
let mapStateToProps = state => ({
})

let withProfileContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps,{setUserProfile})(withProfileContainer);