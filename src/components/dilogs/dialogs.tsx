import Message from "./massage";
import profileStyle from "./../profile/profile.module.css";
import React, {FC, useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {cleanState, startListeningMessage, stopListeningMessage} from "../../redax/dialogsReducer";
import {useTypesSelector} from "../../app/hooks";
import {useDispatch} from "react-redux";
import {ChatApi} from "../../dal/chat-api";
import {Box, Button, TextField} from "@mui/material";
import {Discklamer} from "../profile/Profile";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

let submitForm: (data: { message: string }) => void = (data) => {
   if (!data.message) return
   ChatApi.sendMessage(data.message)
}

export let Dialogs: FC = () => {
   let messages = useTypesSelector(state => state.dialogsPage.message)
   let status = useTypesSelector(state => state.dialogsPage.status)
   let isScroll = useRef<boolean>(true)
   let prevScroll = useRef<number>(0)
   let chat = useRef<HTMLElement>(null)
   let isInitialize = useTypesSelector(state => state.auth.isLog)
   let [isScrollSt,setIsScrollSt] = useState<boolean>(true)

   let dispatch = useDispatch()
   useEffect(() => {
      if(isInitialize) {
         dispatch(startListeningMessage())
         return () => {
            dispatch(stopListeningMessage())
            dispatch(cleanState())
         }
      }
   }, [])


   let scroll = (useRef?: true) => {
      let tmp = chat.current
      let flag = isScroll.current
      if(useRef) flag = true
      if (flag && tmp && tmp.scrollHeight !== tmp.offsetHeight + tmp.scrollTop) {
         prevScroll.current = tmp.scrollTop
         tmp.scrollBy({
            top: tmp.scrollHeight - tmp.offsetHeight - tmp.scrollTop,
            behavior: 'smooth'
         });
      }
   }


   useEffect(() => {
   //подписываемся на событие сролла в контейнере сообщений

      let handler = (event: any) => {
         // defaultValue isScroll.current === false
         let tmp = event.target


         if (prevScroll.current > tmp.scrollTop ) {
         //если проскроллили вверх

            setIsScrollSt(false)

            //отключаем автоскролл
            isScroll.current = false

         }else{
         //если проскролли вниз


             setIsScrollSt(true)

            //еcли доскролили до конца
            if(tmp.scrollHeight === (tmp.scrollTop + tmp.offsetHeight)){
               setIsScrollSt(false)
               //включаем автоскролл
               isScroll.current = true
            }
         }
         prevScroll.current = event.target.scrollTop
      }

      chat.current?.addEventListener("scroll", handler)
      return () => {
         chat.current?.removeEventListener("scroll", handler)
      }
   }, [])

   useEffect(() => {
      // при появлении новых сообщений
      //если скролл разрешен и не проскроленно до конца - скролим до конца
      scroll()
   }, [messages])
   console.log("Rerender")

   if (isInitialize === false){
      return <Discklamer/>
   }

   return (
      <Box sx={{
         display: "flex",
         flexDirection: "column",
         flex: "1 1 auto",
         "@media (min-height: 500px)": {
            maxHeight: "calc(100vh - 130px)"
         },
         backgroundColor: "#ffffff",
         padding: {
            sm: "0 10px",
         },
         position: "relative"
      }}>
         <Box
            ref={chat}
            sx={{
               flex: "1 1 auto",
               overflowY: "auto",
               "@media (max-height: 500px)": {
                  flexGrow: 0,
                  flexShrink: 1,
                  flexBasis: "279px"
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
         <ArrowDownwardIcon
            onClick={() => {
               console.log("Вызов фугкции из обработчика")
               scroll(true)
            }}
            sx={{
            fontSize: "40px",
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "50%",
            border: "1px solid gray",
            bottom: "85px",
            right:"15px",
            "@media (any-hover: hover)": {
               right: isScrollSt ? "45px" : "15px",
            },
            "@media (any-hover: none)": {
               right: isScrollSt ? "20px" : "0px",
            },
            transition: "all 0.3s ease 0s",
            opacity: isScrollSt ? "1": "0",
            visibility: isScrollSt ? "visible": "hidden"
         }}/>
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

