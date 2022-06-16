import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter, LinkProps as RouterLinkProps, NavLink as RouterLink, Route, Routes} from "react-router-dom";
import {Profile, ProfileRedirect} from "./components/profile/Profile";
import {HeaderContainer} from "./components/header/headerContainer";
import Login from "./components/login/login";
import Loading from "./components/users/loading";
import {Dialogs} from "./components/dilogs/dialogs"
import {useTypesSelector} from "./app/hooks";
import {getUserInfo} from "./redax/authReducer";
import {Users} from "./components/users/Users";
import {Wrapper} from "./Wrapper";
import {LinkProps} from '@mui/material/Link';
import {createTheme, ThemeProvider} from "@mui/material";

const LinkBehavior = React.forwardRef<any,
   Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>((props, ref) => {
   const {href, ...other} = props;
   // Map href (MUI) -> to (react-router)
   return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

const theme = createTheme({
   components: {
      MuiLink: {
         defaultProps: {
            component: LinkBehavior,
         } as LinkProps,
      },
      MuiButtonBase: {
         defaultProps: {
            LinkComponent: LinkBehavior,
         },
      },
   },
});

export let App = () => {
   let isInitialize = useTypesSelector(state => state.auth.isLog)
   let dispatch = useDispatch()

   useEffect(() => {
      dispatch(getUserInfo())
   }, [])

   if (isInitialize === null) {
      return <Loading loading={true}/>
   }
   return <ThemeProvider theme={theme}>
      <BrowserRouter>
         <HeaderContainer/>
         <Routes>
            <Route path={"/"} element={<Wrapper/>}>
               <Route path={"dialogs"} element={<Dialogs/>}/>
               <Route path={"profile/:userId"} element={<Profile/>}/>
               <Route path={"profile"} element={<ProfileRedirect/>}/>
               <Route path={"users"} element={<Users/>}/>
               <Route path={"login"} element={<Login/>}/>
               <Route path={"*"} element={<div>404 not found</div>}/>
               <Route index element={<ProfileRedirect/>}/>
            </Route>
         </Routes>
      </BrowserRouter>
   </ThemeProvider>
}
