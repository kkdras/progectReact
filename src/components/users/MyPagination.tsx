import {Pagination} from "@mui/material";
import React, {FC, memo} from "react";
import {setCurrentPage} from "../../redax/usersReducer";
import {useAppDispatch, useTypesSelector} from "../../app/hooks";

let MyPaginationWOMemo:FC = () => {
   let totalUsersCount = useTypesSelector(state => state.usersPage.totalUsersCount)
   let currentPage = useTypesSelector(state => state.usersPage.currentPage)
   let usersPerPage = useTypesSelector(state => state.usersPage.usersPerPage)

   let dispatch = useAppDispatch()
   return <Pagination
      sx={{
         mt: 1,
         mb: 1
      }}
      siblingCount={3}
      page={currentPage}
      showLastButton
      showFirstButton
      count={Math.ceil(totalUsersCount / usersPerPage)}
      variant="outlined"
      onChange={(event: React.ChangeEvent<unknown>, page: number) => {
         dispatch(setCurrentPage(page))
      }}
      shape="rounded"/>
}

export let MyPagination = memo(MyPaginationWOMemo)