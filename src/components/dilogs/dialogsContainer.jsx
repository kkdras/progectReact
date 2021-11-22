import React from "react";
import {sendMassageCreator} from "../../redax/dialogsReducer";
import Dialogs from "./dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


const mapStateToProps = (state) => {
    return {
        massage: state.dialogsPage.massage,
        user: state.dialogsPage.user,
    }
}


export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {sendMassageCreator})
)(Dialogs)

