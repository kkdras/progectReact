import React from "react";

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRender: false,
            status: this.props.status,
        }
    }

    activate = () => {
        this.setState({isRender: true})
    }
    deactivate = () => {
        this.setState({isRender: false})
        this.props.updateStatusProfile(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({status: e.currentTarget.value})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status){
            this.setState({status: this.props.status})
        }
    }

    render() {
        if (!this.state.isRender) {
            return<div onDoubleClick={this.activate}>{this.props.status || "Нет статуса"}</div>
        }
        if (this.state.isRender){
            return <input onChange={this.onStatusChange} value={this.state.status} autoFocus={true} onBlur={this.deactivate} type="text"/>
        }
    }
}

export default Status
