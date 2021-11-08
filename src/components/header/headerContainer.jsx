import Header from "./header";
import {connect} from "react-redux";
import {toLoginAC} from "../../redax/authReducer";
import * as axios from "axios";
import React from "react";

class HeaderContainer extends React.Component{
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{withCredentials: 'true'}).then(response => {
                //debugger
                if(response.data.resultCode === 0){
                    let {id,email,login} = response.data.data;
                    this.props.toLoginAC(id,login,email);
                }
                // debugger
            }
        )
    }

    render() {
        return <Header isLog={this.props.isLog}/>
    }
}
let mapDispatchToProps = (state) => ({isLog:state.auth.isLog,})
export let HeaderContainerConnect = connect(mapDispatchToProps,{toLoginAC})(HeaderContainer)
