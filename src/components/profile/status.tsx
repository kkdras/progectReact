import React, {FC, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useTypesSelector} from "../../app/hooks";
import {updateProfileStatus} from "../../redax/profileReducer";
import {LinearProgress, TextField} from '@mui/material';

export let Status: FC<{isOwn: boolean}> = ({isOwn}) => {
   let dispatch = useDispatch()
   let status = useTypesSelector(state => state.profilePage.status)
   let pending = useTypesSelector(state => state.profilePage.pendingStatus)

   let [inputValue, setInputValue] = useState<string>(status || "")



   useEffect(() => {
      if(inputValue !== status) setInputValue(status || "")
   }, [status])

   let submitStatus = () => {
      if(status !== inputValue) dispatch(updateProfileStatus(inputValue))
   }

   let onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   }

   return <>
      {pending && <LinearProgress sx={{
         mb:2
      }}/>}
      <TextField
         disabled={isOwn ? pending: true }
         onBlur={() => submitStatus()}
         value={inputValue}
         onChange={onStatusChange}
         fullWidth
         label="Status"
         onKeyDown={(event) => {
            if (event.keyCode === 13){
               submitStatus()
               //@ts-ignore
               event.target.blur()
            }
         }}
      />
   </>
}