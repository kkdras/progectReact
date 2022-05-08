import * as React from 'react';
import {Box, Button} from '@mui/material';
import {ChangeEvent, FC} from "react";
import {styled} from '@mui/material/styles';
import {Status} from "../status";
import {setProfilePhoto} from "../../../redax/profileReducer";
import {useDispatch} from "react-redux";

type ProfileTop = {
   isOwn: boolean
   src: string
}
const Input = styled('input')({
   display: 'none',
});
export let ProfileTop: FC<ProfileTop> = ({src, isOwn}) => {
   let dispatch = useDispatch()
   let putPhoto = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
         dispatch(setProfilePhoto(e.target.files[0]))
      }
   }
   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            bgcolor: '#bab0b0',
            overflow: 'hidden',
            boxShadow: 1,
            fontWeight: 'bold',
            p: 2
         }}
      >
         <Box
            component="img"
            sx={{
               border: "2px solid white",
               height: 300,
               width: 350,
               maxHeight: {xs: 350, md: 250},
               maxWidth: {xs: 350, md: 250},
               mr: 1, borderRadius: 1,

            }}
            alt="It's my own picture"
            src={src}
         />
         <Box sx={{
            flex: "1 1 auto"
         }}>
            {!isOwn || <label htmlFor="change-photo">
               {/*@ts-ignore*/}
               <Input onChange={putPhoto} id="change-photo" type="file" accept="image/*"/>
               <Button
                  size="large"
                  sx={{
                     borderRadius: 1,
                     mb: 2
                  }}
                  variant="contained"
                  component="span">
                  Change photo
               </Button>
            </label>}
            <Status/>
         </Box>
      </Box>
   );
}
