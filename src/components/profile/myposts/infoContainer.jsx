import {createActionAddPost, createActionLetterChange} from "../../../redax/profileReducer";
import Info from "./info";
import {connect} from "react-redux";


// function InfoContainer(props) {
//     let state = props.store.getState()
//
//     let addPostCreate = () => {
//         props.store.dispatch(createActionAddPost())
//     }
//
//     let letterChangeCreate = (text) => {
//         let action = createActionLetterChange(text)
//         props.store.dispatch(action);
//     }
//
//     return (
//         <Info textarea={state.profileReducer.textarea} letterChangeContainer={letterChangeCreate} addPostContainer={addPostCreate}/>
//     )
// }

const mapStateToProps = (state) => {
    return {
        textarea: state.profilePage.textarea,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addPostContainer() {
            dispatch(createActionAddPost())
        },
        letterChangeContainer(text) {
            let action = createActionLetterChange(text)
            dispatch(action);
        }

    }
}

const InfoContainer = connect(mapStateToProps, mapDispatchToProps)(Info)

export default InfoContainer;
