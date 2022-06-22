import Box from "@mui/material/Box"
import {FC, useCallback} from "react";
import {getFormData, setFormData} from "../../../dal/sessionStorageAPI";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, IconButton, TextField, Typography} from "@mui/material";
import {KeyboardBackspace} from "@mui/icons-material";


export let PasswordStep: FC<{ title: string }> = ({title}) => {
   let {handleSubmit, register} = useForm({defaultValues: {...getFormData()}})
   let navigate = useNavigate()
   let location = useLocation()


   let onSubmit = useCallback((data: object) => {
      console.log(data)
      setFormData(data)
      navigate(location.pathname + location.search + location.hash,
         {state: {activeStep: 2}})
   }, [navigate, location])

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
         <TextField sx={{mb: 2}} {...register("password")}/>
         <Box sx={{display: "flex"}}>
            <IconButton sx={{mr: 2}}  onClick={onBack}>
               <KeyboardBackspace fontSize="inherit" />
            </IconButton>
            <Button variant={"outlined"} type={"submit"}>next</Button>
         </Box>
      </Box>
   </Box>
}