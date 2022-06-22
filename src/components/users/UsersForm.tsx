import React, {FC, memo, useEffect} from "react";
import {Box, Button, LinearProgress, NativeSelect, styled, TextField} from "@mui/material";
import {useForm} from "react-hook-form";

import {
   applyFilters,
   currentPageSelector,
   friendSelector,
   getUsers,
   ISearchFilters,
   termSelector,
   usersPerPageSelector
} from "../../redax/usersReducer";
import {useAppDispatch, useTypesSelector} from "../../app/hooks";
import {useSearchParams} from "react-router-dom";
import {friendUnion} from "../../dal/api";

let UsersFormElement = styled("form")(({ theme }) => ({
   flex: "1 1 auto",
   display: "flex",
   flexWrap: "wrap",
   alignItems: "center",
   [theme.breakpoints.up('sm')]: {
      flexWrap: "noWrap",
   },
   [theme.breakpoints.down('sm')]: {
      height: "120px"
   }

}))

interface ISearchParams extends Partial<Record<string, string>> {
   term?: string;
   friend?: string;
   currentPage?: string;
   count?: string;
}


let splitParams = (searchParams: URLSearchParams, tmp: ISearchParams) => {
   searchParams.forEach((value, key) => {
      tmp[key] = value
   })
}


let UsersFormWoMemo: FC = () => {
   let usersPerPage = useTypesSelector(usersPerPageSelector)
   let currentPage = useTypesSelector(currentPageSelector)
   let friend = useTypesSelector(friendSelector)
   let term = useTypesSelector(termSelector)
   let isLoading = useTypesSelector(state => state.usersPage.isLoading)

   let { handleSubmit, formState: { errors }, register, reset } = useForm<ISearchFilters>()


   let dispatch = useAppDispatch()

   let [searchParams, setSearchParams] = useSearchParams()

   let onSubmit = (data: ISearchFilters) => {
      dispatch(applyFilters(data))
   }

   useEffect( () => {
      // if search params string !== "" apply search params
      let paramsObject: ISearchParams = {}
      splitParams(searchParams, paramsObject)
      let actualPage = currentPage
      let friendURI = friend
      let termURI = term
      let count = usersPerPage

      let flag = false

      if (paramsObject.currentPage &&
         Number(paramsObject.currentPage) !== actualPage &&
         !!Number(paramsObject.currentPage)) {
         flag = true
         actualPage = Number(paramsObject.currentPage)
      }
      if (paramsObject.term &&
         paramsObject.term !== termURI) {
         flag = true
         termURI = paramsObject.term
      }
      if (paramsObject.friend &&
         paramsObject.friend !== friendURI) {
         flag = true
         friendURI = paramsObject.friend as friendUnion
      }
      if (paramsObject.usersPerPage &&
         Number(paramsObject.usersPerPage) !== count &&
         !!Number(paramsObject.usersPerPage)) {
         flag = true
         count = Number(paramsObject.usersPerPage)
      }
      if (flag) {
         dispatch(
            applyFilters({
               term: termURI,
               friend: friendURI,
               currentPage: actualPage,
               usersPerPage: count
            })
         )

      }

   }, [])

   useEffect(() => {
      let tmp = new URLSearchParams()

      if (term) tmp.append("term", term)
      if (friend) tmp.append("friend", friend)
      if (currentPage) tmp.append("currentPage", String(currentPage))
      if (usersPerPage) tmp.append("usersPerPage", String(usersPerPage))
      setSearchParams(tmp, { replace: true })
      dispatch(getUsers())
      reset({
         friend: friend,
         usersPerPage: usersPerPage,
         term: term
      })
   }, [currentPage, usersPerPage, term, friend])

   return <Box
      sx={{
         display: "flex",
         pt: 1,
         pb: 1,

      }}>
      {isLoading ? <LinearProgress sx={{ flex: "1 1 auto" }} /> :
         <UsersFormElement onSubmit={handleSubmit(onSubmit)}>
            <NativeSelect
               sx={{
                  mr: 1,
                  ml: 1,
                  flex: {
                     sm: "0 0 80px",
                     xs: "1 1 auto"
                  }
               }}
               {...register("friend",{value: friend})}

            >
               <option value="">All</option>
               <option value="true">Friend</option>
               <option value="false">No friend</option>
            </NativeSelect>

            <NativeSelect
               sx={{
                  mr: 1,
                  flex: {
                     sm: "0 0 50px",
                     xs: "1 1 auto"
                  },
                  width: "50px",
               }}
               {...register("usersPerPage",{value: usersPerPage})}

            >
               {[5, 10, 15, 20, 25].map(item => <option key={item} value={item}>{item}</option>)}
            </NativeSelect>

            <TextField
               error={!!errors.term}
               helperText={errors.term && errors.term.message}
               sx={{
                  mr: 1,
                  flex: "1 1 auto"
               }}
               fullWidth
               label="search"
               id="search"
               size="small"
               {...register("term", {
                  maxLength: {
                     value: 15,
                     message: "Слишком много букв"
                  }
               }
               )} />

            <Button
               sx={{
                  borderRadius: 1,
                  pr: 5,
                  pl: 5,
                  height: {
                     sm:"100%"
                  }
               }}
               size="small"
               variant="contained"
               type={"submit"}>Submit

            </Button>
         </UsersFormElement>}
   </Box>

}

export let UsersForm = memo(UsersFormWoMemo)