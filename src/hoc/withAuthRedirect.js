import {connect, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import React from "react";

export let withAuthRedirect = (Component) => {
    class ComponentWrapper extends React.Component {
        render() {
            if(!this.props.isLog) {
                return <Redirect to='/login'/>
            }
            return <Component {...this.props}/>
        }
    }
    let mapStateToProps = (state) => {
        return {
            isLog: state.auth.isLog
        }
    }
    return connect(mapStateToProps, null)(ComponentWrapper)
}

export let useWithAuthRedirect = () => {
    let isLog = useSelector(state => state.auth.isLog)
    let history = useHistory()
    if(!isLog) {
        history.push("/login")
    }
}