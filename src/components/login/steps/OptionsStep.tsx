import Box from "@mui/material/Box"
import {FC, useCallback} from "react";
import {getFormData, setFormData} from "../../../dal/sessionStorageAPI";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Checkbox, IconButton, Typography} from "@mui/material";
import {KeyboardBackspace} from "@mui/icons-material";
import {ILoginAction} from "../../../redax/authReducer";
import {useTypesSelector} from "../../../app/hooks";


interface IOptionStep {
   title: string
   genSubmit: (data: ILoginAction) => void
}


export let OptionsStep: FC<IOptionStep> = ({title,genSubmit}) => {
   let {handleSubmit, register} = useForm<ILoginAction>({defaultValues: {...getFormData()}})
   let navigate = useNavigate()
   let location = useLocation()
   let captcha = useTypesSelector(state => state.auth.urlCaptcha)


   let onSubmit = useCallback(async (data: ILoginAction) => {
      setFormData(data)
      console.log(data)
      if(captcha){
         let path = location.pathname + location.search + location.hash
         navigate(path, {state: {activeStep: 3}})
      }else{
         genSubmit(data)
      }
   }, [])

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
         <Checkbox sx={{mb: 2}} {...register("rememberMe")}/>
         <Box sx={{display: "flex"}}>
            <IconButton sx={{mr: 2}}  onClick={onBack}>
               <KeyboardBackspace fontSize="inherit" />
            </IconButton>
            <Button variant={"outlined"} type={"submit"}>next</Button>
         </Box>
      </Box>
   </Box>


}