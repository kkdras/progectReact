import React, {FC, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useTypesSelector} from "../../app/hooks";
import {updateProfileStatus} from "../../redax/profileReducer";
import {LinearProgress, TextField} from '@mui/material';

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


export let Status: FC = () => {
   let dispatch = useDispatch()
   let status = useTypesSelector(state => state.profilePage.status)
   let pending = useTypesSelector(state => state.profilePage.pendingStatus)
   //управляемый элемент
   let [inputValue, setInputValue] = useState<string>(status || "")
   //был ли изменен статус нужно чтобы предотвратить лишний rerender
   let textFieldItem = useRef(null)

   useEffect(() => {
      if(inputValue !== status) setInputValue(status || "")
   }, [status])

   let submitStatus = () => {
      dispatch(updateProfileStatus(inputValue))
   }

   let onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   }

   return <>
      {pending && <LinearProgress sx={{
         mb:2
      }}/>}
      <TextField
         disabled={pending}
         inputRef={textFieldItem}
         onBlur={() => submitStatus()}
         value={inputValue}
         onChange={onStatusChange}
         fullWidth
         label="Your status"
         onKeyDown={(event) => {
            if (event.keyCode === 13){
               submitStatus()
               //@ts-ignore
               event.target.blur();
            }
         }}
      />
   </>
}