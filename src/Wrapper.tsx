import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useTypesSelector } from "./app/hooks";
import React from "react";
import { Box } from "@mui/material";

export let Wrapper = () => {
   let location = useLocation()
   let isAuth = useTypesSelector(state => state.auth.isLog)
   if (!isAuth && location.pathname !== "/login") return <Navigate to={"/login"} replace={true} />

   return <Box
      component={"main"}
      sx={{
         flex: "1 1 auto",
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
            minHeight: "calc(100vh - 70px)"
         }}
      >
         <Outlet />
      </Box>
   </Box>
}