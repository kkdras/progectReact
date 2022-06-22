import {Outlet} from "react-router-dom";
import React from "react";
import {Box} from "@mui/material";

export let Wrapper = () => {

   return <Box
      component={"main"}
      sx={{
         flex: "1 1 auto",
         display: "flex",
         paddingTop: "70px"
      }}
   >
      <Box
         sx={{
            margin: "0 auto",
            maxWidth: {
               xs: "100%",
               sm: 600,
               md: 800,
               lg: 1000,
               xl: 1200,
            },
            padding: {
               sm: "0 10px",
               xs: "0 5px"
            },
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
         }}
      >
         <Outlet />
      </Box>
   </Box>
}