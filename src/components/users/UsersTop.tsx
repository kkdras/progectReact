import React, {FC, memo} from "react";
import {MyPagination} from "./MyPagination";
import {UsersForm} from "./UsersForm";


let UsersTopWOMemo: FC = () => {

   return <>

      <UsersForm/>
   </>
}

export let UsersTop = memo(UsersTopWOMemo)