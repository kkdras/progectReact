import {User} from "./User";
import {useTypesSelector} from "../../app/hooks";
import React from "react";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import {Box, LinearProgress} from '@mui/material';
import {UsersTop} from "./UsersTop";


export let Users = () => {
   let isLoading = useTypesSelector(state => state.usersPage.isLoading)
   let users = useTypesSelector(state => state.usersPage.users)
   useWithAuthRedirect()

   return (
      <>
         {isLoading ?
            <LinearProgress sx={{mt: 1, mb: 1}}/> :
            <>
               <UsersTop />
               <Box sx={{
                  display: "grid",
                  gridTemplate: "1fr/repeat(auto-fill, minmax(150px, 1fr))",
                  gap: 2,
               }}>
                  {users.map(item => <User key={item.id} user={item}/>)}
               </Box>
            </>
         }
      </>
   )
}

