import s from "../profile.module.css";
import React, {FC, useEffect} from "react";
import Loading from "../../users/loading";
import {AboutForm} from "./aboutMeForm";
import {useAppDispatch, useTypesSelector} from "../../../app/hooks";
import {AboutMe} from "./aboutMe";
import {ProfileTop} from "./profileTop";
import img from "./../../../asserts/1024px-User-avatar.svg.png"
import {toggleEditMode} from "../../../redax/profileReducer";
import {Box} from "@mui/material";

interface IInfo {
   isOwn: boolean
}


export let Info: FC<IInfo> = (props) => {
   let edit = useTypesSelector(state => state.profilePage.editMode)
   let userProfile = useTypesSelector(state => state.profilePage.userProfile)
   let dispatch = useAppDispatch()

   useEffect(() => {

      return () => {
         //не вызывается если страница перезагружена или закрыт браузер
         dispatch(toggleEditMode(false))
      }
   }, [])


   if (!userProfile) {
      return (<Loading />)
   } else {
      return (
         <div className={s.infoWrapper}>
            <ProfileTop
               src={userProfile.photos.large || userProfile.photos.small || img}
               isOwn={props.isOwn}
            />
            <Box sx={{
               bgcolor: "#bab0b0",
               width: "100%",
               boxShadow: 1,
               mt: 1,
            }} className={s.addPost}>
               <Box sx={{
                  padding: (theme) => theme.spacing(1),
                  pt: 2,
                  textAlign: "end",
                  flex: "1 1 auto"
               }}>
                  {edit || <AboutMe isOwn={props.isOwn} {...userProfile} />}
                  {props.isOwn && edit && <AboutForm/>}
               </Box>
            </Box>
         </div>
      )
   }
}

/*type InfoFormType = {
   addPost: (data: addPostPropsType) => void
}*/

/*
let InfoForm: FC<InfoFormType> = ({ addPost }) => {
   let { handleSubmit, register, formState: { errors } } = useForm<addPostPropsType>()
   return (
      <form onSubmit={handleSubmit(addPost)}>
         <input {...register("post", {
            maxLength: {
               value: 20,
               message: "Пожалуйста поменьше букв"
            }
         })} placeholder={"Введите свое сообщение"} className={s.texarea} />
         {errors.post && <p>{errors.post.message}</p>}
         <button className={s.add}>submit</button>
      </form>
   )
}
*/


