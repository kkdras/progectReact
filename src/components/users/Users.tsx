import {useTypesSelector} from "../../app/hooks";
import React, {FC} from "react";
import {Box, Typography} from '@mui/material';
import {User} from "./User";
import {MyPagination} from "./MyPagination";
import {UsersForm} from "./UsersForm";
import {Discklamer} from "../profile/Profile";


export let Users: FC = () => {
   let usersId = useTypesSelector(state => state.usersPage.usersID)
   let isInitialize = useTypesSelector(state => state.auth.isLog)

   if (isInitialize === false){
      return <Discklamer />
   }
   return (
      <>
         <UsersForm/>
         <Box sx={{
            display: "grid",
            gridTemplate: "1fr/repeat(auto-fill, minmax(150px, 1fr))",
            gap: 2,
         }}>
            {usersId.map(item => <User id={item} key={item} />)}
         </Box>
         <MyPagination />
      </>
   )
}

