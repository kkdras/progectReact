import Header from "./header";
import {connect} from "react-redux";
import React from "react";
import {logoutCreator} from "../../redax/authReducer";


class HeaderContainer extends React.Component{
    render() {
        return <Header logoutCreator={this.props.logoutCreator} isLog={this.props.isLog}/>
    }
}
let mapStateToProps = (state) => ({isLog:state.auth.isLog,})
export let HeaderContainerConnect = connect(mapStateToProps,{logoutCreator})(HeaderContainer)
