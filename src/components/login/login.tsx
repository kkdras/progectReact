import React, {ReactNode, useCallback, useLayoutEffect, useState} from "react";
import {Box, Step, StepLabel, Stepper} from "@mui/material";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {LoginStep} from "./steps/LoginStep";
import {PasswordStep} from "./steps/PasswordStep";
import {OptionsStep} from "./steps/OptionsStep";
import {ILoginAction, logIn} from "../../redax/authReducer";

import {CaptchaPage} from "./steps/CaptchaPage";
import {useAppDispatch, useTypesSelector} from "../../app/hooks";
import Loading from "../users/loading";


export interface ILocationState {
   activeStep: number
}

export let Login = () => {
   let location = useLocation()
   let state = location.state as ILocationState
   if(!state) state = {activeStep: 0}
   let error = useTypesSelector(state => state.auth.error)
   let dispatch = useAppDispatch()
   let navigate = useNavigate()
   let captcha = useTypesSelector(state => state.auth.urlCaptcha)
   let isLog = useTypesSelector(state => state.auth.isLog)
   let myId = useTypesSelector(state => state.auth.userId)
   let pending = useTypesSelector(state => state.auth.pending)

   let [tabs,setTabs] = useState([
      {title: "Login"},
      {title: "Password"},
      {title: "Options"}
   ])

   let submit = useCallback(async (data: ILoginAction) => {
      dispatch(logIn(data))
   },[])


   useLayoutEffect(() => {
      if(captcha && tabs.length === 3){
         let path = location.pathname + location.search + location.hash
         navigate(path, {state: {activeStep: 3}})
         //@ts-ignore
         setTabs(tabs => [...tabs, {
            component: CaptchaPage,
            title: "captcha"
         }])
      }
   },[captcha,navigate])

   useLayoutEffect(() => {
      let path = location.pathname + location.search + location.hash
      navigate(path, {state: {activeStep: 0}})
   },[error])



   let Component
   if (state.activeStep === 0) {
      Component = <LoginStep title={"Login"}/>
   } else if (state.activeStep === 1) {
      Component = <PasswordStep title={"Password"}/>
   } else if (state.activeStep === 2) {
      Component = <OptionsStep
         title={"Options"}
         genSubmit={submit}
      />
   } else if(state.activeStep === 3){
      Component = <CaptchaPage title={"Captcha"} onGenSubmit={submit}/>
   }


   if(isLog){
      return <Navigate to={myId ? `/profile/${myId}` : "/login"} replace={true} />
   }

   if(pending){
      return <Loading />
   }

   return (
      <Box>
         <Stepper sx={{
            p: 2
         }} activeStep={state.activeStep}>
            {tabs.map(({title},index) => {
               let labelProps: {
                  optional?: ReactNode
                  error?: boolean
               } = {}

               if(error){
                  if(state.activeStep <= index){
                     labelProps.error = true
                     labelProps.optional = <div>Исправьте ошибку</div>
                  }
               }
               return <Step key={title}>
                  <StepLabel {...labelProps}>{title}</StepLabel>
               </Step>
            })}
            {}
         </Stepper>
         {Component || "Произошла ошибка"}
      </Box>
   )
}