import Message from "./massage";
import profileStyle from "./../profile/profile.module.css";
import React, {FC, useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {cleanState, startListeningMessage, stopListeningMessage} from "../../redax/dialogsReducer";
import {useTypesSelector} from "../../app/hooks";
import {useDispatch} from "react-redux";
import {ChatApi} from "../../dal/chat-api";
import {Box, Button, TextField} from "@mui/material";

let submitForm: (data: { message: string }) => void = (data) => {
   if (!data.message) return
   ChatApi.sendMessage(data.message)
}

export let Dialogs: FC = () => {
   let messages = useTypesSelector(state => state.dialogsPage.message)
   let status = useTypesSelector(state => state.dialogsPage.status)
   let [isScroll, setScroll] = useState(false)
   let prevScroll = useRef<number>(0)
   let chat = useRef<HTMLElement>(null)

   let dispatch = useDispatch()
   useEffect(() => {
      dispatch(startListeningMessage())
      return () => {
         dispatch(stopListeningMessage())
         dispatch(cleanState())
      }
   }, [])


   useEffect(() => {
      let handler = (event: any) => {
         if (prevScroll.current > event.target.scrollTop ) {
            setScroll(true)
         }
         prevScroll.current = event.target.scrollTop
      }
      chat.current?.addEventListener("scroll", handler)

      return () => {
         chat.current?.removeEventListener("scroll", handler)
      }
   }, [])

   useEffect(() => {
      let tmp = chat.current
      if (!isScroll && tmp && tmp.scrollHeight !== tmp.offsetHeight + tmp.scrollTop) {
         prevScroll.current = tmp.scrollTop
         tmp.scrollBy({
            top: tmp.scrollHeight - tmp.offsetHeight - tmp.scrollTop,
            left: 100,
            behavior: 'smooth'
         });

      }
   }, [messages])

   return (
      <Box sx={{
         display: "flex",
         flexDirection: "column",
         minHeight: "calc(100vh - 70px)",
         "@media (min-height: 500px)": {
            maxHeight: "calc(100vh - 70px)"
         },
         backgroundColor: "#ffffff",
         padding: {
            sm: "0 10px",
         },
      }}>
         <Box
            ref={chat}
            sx={{
               flex: "1 1 auto",
               overflowY: "auto",
               "@media (max-height: 500px)": {
                  flexGrow: 0,
                  flexShrink: 1,
                  flexBasis: "339px"
               },
               padding: "10px 0",
               display: "flex",
               flexDirection: "column"
            }}>
            <Box sx={{flex: "1 1 auto"}}/>
            {
               messages.map(item => <Message key={item.id} item={item}/>)
            }
         </Box>
         <DialogForm ready={!(status === "ready")} submitForm={submitForm}/>
      </Box>
   )
}

interface DialogForm {
   submitForm: (data: { message: string }) => void
   ready: boolean
}

let DialogForm: FC<DialogForm> = ({submitForm, ready}) => {
   let {handleSubmit, register, reset, formState: {errors}} = useForm<{ message: string }>()
   return (
      <Box sx={{
         flex: "0 0 70px",
         backgroundColor: "#706f6f",
         display: "flex",
         alignItems: "center",
         margin: "0 -10px"

      }} component={"form"} onSubmit={handleSubmit((data: { message: string }) => {
         if (data.message === "") return
         submitForm(data)
         reset()
      })}>

         <TextField

            size={"small"}
            error={!!errors.message}
            helperText={!!errors.message && errors.message.message}
            sx={{
               flex: "1 1 auto",
               marginLeft: "10px",
            }}
            placeholder={"Введи свое сообщение"}
            {...register("message", {
               maxLength: {
                  value: 50,
                  message: "Пожалуйста поменьше букв"
               }
            })} className={profileStyle.textarea}
         />
         <Button type={"submit"} sx={{
            margin: "0 10px"
         }} variant={"contained"} disabled={ready}>send</Button>
      </Box>
   )
}

