import {useTypesSelector} from "../../app/hooks";
import React, {FC} from "react";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import {Box} from '@mui/material';
import {UsersTop} from "./UsersTop";
import {User} from "./User";


export let Users: FC = () => {
   let usersId = useTypesSelector(state => state.usersPage.usersID)
   useWithAuthRedirect()

   return (
      <>
         <UsersTop />
         <Box sx={{
            display: "grid",
            gridTemplate: "1fr/repeat(auto-fill, minmax(150px, 1fr))",
            gap: 2,
         }}>
            {usersId.map(item => <User id={item} key={item}/>)}
         </Box>
      </>
   )
}

