import * as React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {ChangeEvent, FC} from "react";
import {styled} from '@mui/material/styles';
import {Status} from "../status";
import {setProfilePhoto} from "../../../redax/profileReducer";
import {useDispatch} from "react-redux";
import {useTypesSelector} from "../../../app/hooks";

type ProfileTop = {
   isOwn: boolean
   src: string
}
const Input = styled('input')({
   display: 'none',
});

let ImgWrapper = styled("div")(({theme}) => ({
   border: "2px solid white",
   height: "250px",
   [theme.breakpoints.up('xs')]:{
      width: "100%"
   },
   [theme.breakpoints.up('sm')]:{
      width: "250px",
      flex: "0 0 250px"
   },
   marginRight: theme.spacing(1),
   borderRadius: theme.spacing(1),
   position: "relative",
}))

export let ProfileTop: FC<ProfileTop> = ({src, isOwn}) => {
   let fullName = useTypesSelector(state => state.profilePage.userProfile?.fullName)
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

            flexDirection: {xs: 'column', sm: 'row'},
            bgcolor: '#bab0b0',
            overflow: 'hidden',
            boxShadow: 1,
            fontWeight: 'bold',
            p: 2,
         }}
      >
         <ImgWrapper >
            <Box
               component="img"
               sx={{
                  position: "absolute",
                  objectFit: "cover",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
               }}
               alt="It's my own picture"
               src={src}
            />
         </ImgWrapper>
         <Box sx={{
            flex: "1 1 auto"
         }}>
            <Typography variant="h5" gutterBottom component="div">
               {fullName}
            </Typography>
            {!isOwn || <label htmlFor="change-photo">
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
            <Status isOwn={isOwn}/>
         </Box>
      </Box>
   );
}
