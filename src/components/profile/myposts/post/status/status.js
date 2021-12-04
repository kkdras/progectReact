import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

// class Status extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isRender: false,
//             status: this.props.status,
//         }
//     }
//
//     activate = () => {
//         this.setState({isRender: true})
//     }
//     deactivate = () => {
//         this.setState({isRender: false})
//         this.props.updateStatusProfile(this.state.status)
//     }
//     onStatusChange = (e) => {
//         this.setState({status: e.currentTarget.value})
//     }
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevProps.status !== this.props.status){
//             this.setState({status: this.props.status})
//         }
//     }
//
//     render() {
//         if (!this.state.isRender) {
//             return<div onDoubleClick={this.activate}>{this.props.status || "Нет статуса"}</div>
//         }
//         if (this.state.isRender){
//             return <input onChange={this.onStatusChange} value={this.state.status} autoFocus={true} onBlur={this.deactivate} type="text"/>
//         }
//     }
// }

let Status = (props) => {
    let [isRender,changeRender] = useState(false)
    let [status,changeStatus] = useState(props.status)
    let dispatch = useDispatch()
    let toggleRender = (boolean) => {
        changeRender(boolean);
        if (!boolean) dispatch(props.updateStatusProfile(status));
    }
    let onStatusChange = (e) => {
        changeStatus(e.currentTarget.value);
    }
    useEffect(() => {changeStatus(props.status)},[props.status])
    if (!isRender) {
        return<div onDoubleClick={() => toggleRender(true)}>{props.status || "Нет статуса"}</div>
    }
    if (isRender){
        return <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={() => toggleRender(false)} type="text"/>
    }

}

export default Status
