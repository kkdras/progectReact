import Box from "@mui/material/Box"
import {useLocation, useNavigate} from "react-router-dom";
import {Button, TextField, Typography} from "@mui/material";
import {FC, useCallback} from "react";
import {getFormData, setFormData} from "../../../dal/sessionStorageAPI";
import {useForm} from "react-hook-form";


export let LoginStep: FC<{ title: string }> = ({title}) => {
   let {handleSubmit, register} = useForm({defaultValues: {...getFormData()}})
   let navigate = useNavigate()
   let location = useLocation()


   let onSubmit = useCallback((data: object) => {
      console.log(data)
      setFormData(data)
      navigate(location.pathname + location.search + location.hash,
         {state: {activeStep: 1}})
   }, [navigate, location])

   return <Box>
      <Typography sx={{p: 2, textAlign: "center"}} variant={"h5"}>{title}</Typography>
      <Box component={"form"} sx={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center"
      }} onSubmit={handleSubmit(onSubmit)}>
         <TextField sx={{mb: 2}} {...register("email")}/>
         <Button variant={"contained"} type={"submit"}>next</Button>
      </Box>
   </Box>
}