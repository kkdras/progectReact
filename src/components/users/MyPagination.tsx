import { Pagination } from "@mui/material";
import React, { FC, memo } from "react";
import { currentPageSelector, setCurrentPage, usersPerPageSelector } from "../../redax/usersReducer";
import { useAppDispatch, useTypesSelector } from "../../app/hooks";

let MyPaginationWOMemo: FC = () => {
   let totalUsersCount = useTypesSelector(state => state.usersPage.totalUsersCount)
   let currentPage = useTypesSelector(currentPageSelector)
   let usersPerPage = useTypesSelector(usersPerPageSelector)
   let dispatch = useAppDispatch()

   return <Pagination
      sx={{
         mt: 1,
         mb: 1,
         "> ul": {
            justifyContent: "center",
         }
      }}
      siblingCount={0}
      boundaryCount={1}
      page={currentPage}
      count={Math.ceil(totalUsersCount / usersPerPage)}
      variant="outlined"
      onChange={(_, page: number) => {
         dispatch(setCurrentPage(page))
      }}
      shape="rounded" />
}

export let MyPagination = memo(MyPaginationWOMemo)