import React from "react";
import {sendMassageCreator, updateNewMassageCreator} from "../../redax/dialogsReducer";
import Dialogs from "./dialogs";
import {connect} from "react-redux";


// function DialogsContainer(props) {
//     let state = props.store.getState()
//
//
//     const sendMassageClickCreator = () => {
//         props.store.dispatch(sendMassageCreator());
//     }
//
//     const updateNewMassageBody = (massage) => {
//         let action = updateNewMassageCreator(massage)
//         props.store.dispatch(action);
//     }
//
//     //debugger
//     return (
//         <Dialogs newMassageText={state.dialogsReducer.newMassageText} massage={state.dialogsReducer.massage} user={state.dialogsReducer.user} updateNewMassageBody={updateNewMassageBody} sendMassageClickCreator={sendMassageClickCreator}/>
//     )
// }

const mapStateToProps = (state) => {
    return {
        newMassageText: state.dialogsPage.newMassageText,
        massage: state.dialogsPage.massage,
        user: state.dialogsPage.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMassageClickCreator() {
            dispatch(sendMassageCreator());
        },
        updateNewMassageBody(massage) {
            let action = updateNewMassageCreator(massage)
            dispatch(action);
        }
    }
}


const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)

export default DialogsContainer;
