import React, {FC} from "react";
import {userProfileType} from "../../../types/types";
import {Box, Button, Grid, Paper, styled} from '@mui/material';
import {toggleEditMode} from "../../../redax/profileReducer";
import {useDispatch} from "react-redux";


type AboutMe = {
   isOwn: boolean
}

const Item = styled(Paper)(({theme}) => ({
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));
let CustomLabel = styled("span")(({theme}) => ({
   fontWeight: "bold",
   color: "gray",
   display: "inline-block",
   marginRight: theme.spacing(1)
}))
export let AboutMe: FC<userProfileType & AboutMe> = (
   {
      aboutMe,
      lookingForAJob,
      lookingForAJobDescription,
      fullName,
      contacts,
      isOwn
   }
) => {
   let dispatch = useDispatch()
   return (
      <Box sx={{
         bgcolor: "#bab0b0",
         width: "100%",
         boxShadow: 1,
         mt: 1,
         padding: (theme) => theme.spacing(1),
         textAlign: "end"
      }}>
         <Grid container spacing={2}>
            <Grid spacing={2} item xs={6}>
               <Item>
                  <CustomLabel>About me -</CustomLabel>
                  <span>{aboutMe}</span>
               </Item>
            </Grid>
            <Grid spacing={2} item xs={6}>
               <Item>
                  <CustomLabel>Looking for a job -</CustomLabel>
                  <span>{lookingForAJob ? "Yes" : "No"}</span>
               </Item>
            </Grid>
            <Grid spacing={2} item xs={6}>
               <Item>
                  <CustomLabel>Looking for a job discription -</CustomLabel>
                  <span>{lookingForAJobDescription}</span>
               </Item>
            </Grid>
            <Grid spacing={2} item xs={6}>
               <Item>
                  <CustomLabel>Full name-</CustomLabel>
                  <span>{fullName}</span>
               </Item>
            </Grid>
            {Object.entries(contacts).map((item) => <Grid
               spacing={2}
               item xs={6}>
               <Item>
                  <ContactsItem title={item[0]} value={item[1]}/>
               </Item>
            </Grid>)}
         </Grid>
         {isOwn &&
         <Button
            size="large"
            sx={{
               mt: 1
            }}
            variant="contained"
            type="submit"
            onClick={() => dispatch(toggleEditMode())}>
            Edit my details
         </Button>}
      </Box>
   )
}

interface ContactsType {
   title: string
   value: string | null
}

let ContactsItem: FC<ContactsType> = ({title, value}) => {
   let newTitle = title[0].toUpperCase() + title.slice(1,title.length)
   return (
      <>
         <CustomLabel>{newTitle} -</CustomLabel>
         <span>{value || "unknown"}</span>
      </>
   )
}