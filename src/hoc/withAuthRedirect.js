import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
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