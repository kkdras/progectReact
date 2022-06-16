import {FC, memo} from "react";
import {IMessage} from "../../dal/chat-api";
import {Avatar, Box, Link} from "@mui/material";
import img from "./../../asserts/1024px-User-avatar.svg.png"

type messagePropsType = {
   item: IMessage
}

 let Message: FC<messagePropsType> = ({item}) => {
   return (
      <Box sx={{
         display: "flex",
         ":not(:first-child)":{
            marginTop: "15px",
         }

      }}>
         <Box sx={{
            flex: "0 1 auto"
         }}>
            <Avatar sx={{
               marginRight: "5px"
            }} sizes={"small"} src={item.photo || img}/>
         </Box>
         <Box>
            <Link sx={{
               display: "block",
               marginBottom: "5px"
            }} href={`/profile/${item.userId}`}>{item.userName}</Link>

            <Box sx={{}}>
               {item.message}
            </Box>
         </Box>
      </Box>
   )
}

export default memo(Message)