import {Box, Button, Typography} from "@mui/material";
import styled from "@emotion/styled";

import {logout} from "../../redax/authReducer";
import {useAppDispatch} from "../../app/hooks";

let FooterComponent = styled("footer")(({theme}) => ({
   width: "100%",
   height: "60px",
   backgroundColor: "gray"
}))

export let Footer = () => {
   let dispatch = useAppDispatch()

   return <FooterComponent>
      <Box sx={{
         maxWidth: {
            xs: "100%",
            sm: 600,
            md: 800,
            lg: 1000,
            xl: 1200,
         },
         height: "100%",
         margin: "0 auto",
         padding: {
            sm: "0 10px",
            xs: "0 5px"
         },
      }}>
         <Box sx={{
            display: "flex",
            justifyContent: {
               sm: "space-around",
               xs: "space-between"
            },
            alignItems: "center",
            backgroundColor: "#d3d3d3",
            height: "100%",
            padding: "0 10px"
         }}>
            <Typography
               sx={{
                  color: "##d3d3d3",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
               }} variant={"body1"}>
               CC kkdras - Kozlov Konstantin
            </Typography>
            <Button href={"/login"} sx={{
               marginLeft: "5px"
            }} variant={"outlined"} onClick={() => dispatch(logout())}>
               Logout
            </Button>
         </Box>
      </Box>
   </FooterComponent>
}