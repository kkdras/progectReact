import React, {FC, memo} from "react";
import {MyPagination} from "./MyPagination";
import {UsersForm} from "./UsersForm";


let UsersTopWOMemo: FC = () => {


   return <>
      <MyPagination/>
      <UsersForm/>
   </>
}

export let UsersTop = memo(UsersTopWOMemo)