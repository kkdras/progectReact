import {ILoginAction} from "../../../redax/authReducer";
import {useForm} from "react-hook-form";
import {useTypesSelector} from "../../../app/hooks";
import {Button, IconButton, TextField, Typography} from "@mui/material";
import {FC, useCallback} from "react";
import {getFormData, setFormData} from "../../../dal/sessionStorageAPI";
import {KeyboardBackspace} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

interface ICaptchaOptions {
   onGenSubmit: (data: ILoginAction) => void
   title: string
}

export let CaptchaPage:FC<ICaptchaOptions> = ({onGenSubmit,title}) => {
   let {handleSubmit, register} = useForm<ILoginAction>({defaultValues: {...getFormData()}})
   let captchaURI = useTypesSelector(state => state.auth.urlCaptcha)
   let navigate = useNavigate()
   let onSubmit = (data: ILoginAction) => {
      console.log(data)
      setFormData(data)
      onGenSubmit(data)
   }

   const onBack = useCallback(() => {
      navigate(-1)
   }, [navigate]);


   return <Box>
      <Typography sx={{p: 2, textAlign: "center"}} variant={"h5"}>{title}</Typography>

      <Box component={"form"} sx={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center"
      }} onSubmit={handleSubmit(onSubmit)}>
         <Box component={"img"} sx={{w: "200px", h: "100px", mb: 2}} src={captchaURI || ""}/>
         <TextField sx={{mb: 2}} {...register("captcha")}/>
         <Box sx={{display: "flex"}}>
            <IconButton sx={{mr: 2}}  onClick={onBack}>
               <KeyboardBackspace fontSize="inherit" />
            </IconButton>
            <Button variant={"outlined"} type={"submit"}>Submit</Button>
         </Box>
      </Box>
   </Box>

}