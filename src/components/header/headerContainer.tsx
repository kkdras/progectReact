import React from "react";
import {useTypesSelector} from "../../app/hooks";
import styled from "@emotion/styled";
import {Avatar, Box, Button} from "@mui/material";
import img from "./../../asserts/1024px-User-avatar.svg.png"

let Header = styled("header")({
   width: "100%",
   height: "60px",
   padding: "5px 0",
   position: "fixed",
   top: 0,
   left: 0,
   zIndex: 50,
   borderBottom: "1px solid #B2B2B2FF",
   backgroundColor: "#fff"

})

export let HeaderContainer = () => {
   let images = useTypesSelector(state => state.auth.photos)
   let isLog = useTypesSelector(state => state.auth.isLog)

   return (
      <>
         <Header>
            <Box sx={{
               padding: {
                  sm: "0 10px",
                  xs: "0 5px"
               },
               maxWidth: {
                  xs: "100%",
                  sm: 600,
                  md: 800,
                  lg: 1000,
                  xl: 1200,
               },
               height: "100%",
               margin: "0 auto",
            }}>
               <Box sx={{
                  padding: "0 10px",
                  display: "flex",
                  height: "100%",
                  borderLeft: "1px solid #B2B2B2FF",
                  borderRight: "1px solid #B2B2B2FF",
                  alignItems: "center",
               }}>
                  <Box sx={{display: "flex"}}>
                     <Button sx={{
                        marginRight: {
                           xs: "5px",
                           sm: "10px"
                        }
                     }} variant="contained" size="small"
                             href="/profile">
                        {isLog ? "Profile" : "Login"}
                     </Button>
                     <Button
                        sx={{
                        marginRight: {
                           xs: "5px",
                           sm: "10px"
                        }
                     }} variant="contained" size="small"
                             href="/dialogs">
                        Dialogs
                     </Button>
                     <Button variant="contained" size="small"
                             href="/users">
                        Users
                     </Button>
                  </Box>
                  <Box sx={{flex: "1 1 auto", display: "flex", justifyContent: "flex-end"}}>
                     <Avatar src={images?.small || images?.large || img}/>
                  </Box>
               </Box>
            </Box>
         </Header>

      </>
   )
}


