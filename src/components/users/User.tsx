import {FC} from "react";
import {useDispatch} from "react-redux";
import {Box, Button, Link, Typography} from "@mui/material";
import img from "./../../asserts/1024px-User-avatar.svg.png"
import {followUser, unfollowUser} from "../../redax/usersReducer";
import {useTypesSelector} from "../../app/hooks";

interface IUserProps {
   id: number
}


export let User: FC<IUserProps> = ({id}) => {
   let dispatch = useDispatch()
   let {
      name,
      status,
      followed,
      photos: {small, large},
      pendingFollow: isDisabledBtn
   } = useTypesSelector(state => state.usersPage.users[id])


   const contentBtn = followed ? "Unfollow" : "Follow"
   let btnHandler = (id: number) => {
      let tmp = followed ? unfollowUser : followUser
      dispatch(tmp(id))
   }

   return <Box
      sx={{
         display: "flex",
         flexDirection: "column",
         alignItems: "start",
         bgcolor: "background.paper",
         ":hover": {
            boxShadow: 10,
         },
         "@media (any-hover: hover)": {
            ":hover .userConCont": {
               visibility: "visible",
               opacity: 1,
            },
         },
         "@media (any-hover: none)": {
            ".userConCont": {
               visibility: "visible",
               opacity: 1,
            },
         },
         borderRadius: 3,
         position: "relative"
      }}
   >
      <Box sx={{
         position: "relative",
         width: "100%",
         height: "180px",
      }}>
         <Box component={"img"} src={large || small || img} sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            borderRadius: 3,
         }}/>
      </Box>
      <Box className={"userConCont"} sx={{
         position: "absolute",
         top: 0,
         left: 0,
         display: "flex",
         flexDirection: "column",
         padding: 1,
         visibility: "hidden",
         opacity: 0,
         bgcolor: "rgba(0,0,0,0.7)",
         width: "100%",
         height: "100%",
         boxSizing: "border-box",
         borderRadius: 3,
         transition: "opacity 0.3s ease 0s"
      }}>
         <Link sx={{flexGrow: status ? 0 : 1}} href={'/profile/' + id}>
            <Typography
               sx={{
                  color: "common.white",
                  marginBottom: 1,
                  lineHeight: 1.1
               }}
               variant={"body2"}
            >{name}</Typography>
         </Link>
         {status && <Typography
            sx={{
               color: "common.white",
               flexGrow: 1,
               overflow: "hidden",
               lineHeight: 1.1
            }}
            variant={"body2"}>{status}
         </Typography>}

         <Button
            onClick={() => btnHandler(id)}
            sx={{
               opacity: 1,
               justifySelf: "end",
               pt: 1
            }}
            variant="contained"
            size="small"
            disabled={isDisabledBtn}>
            {contentBtn}
         </Button>
      </Box>
   </Box>
}