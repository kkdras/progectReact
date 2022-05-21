import React, {FC, memo, useEffect} from "react";
import {Box, Button, LinearProgress, NativeSelect, styled, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../app/redax-store";
import {
   applyFilters,
   currentPageSelector,
   friendSelector,
   getUsers,
   ISearchFilters,
   termSelector,
   usersPerPageSelector
} from "../../redax/usersReducer";
import {useTypesSelector} from "../../app/hooks";
import queryString from "querystring";
import {useHistory, useLocation} from "react-router-dom";
import {friendUnion} from "../../dal/api";

let UsersFormElement = styled("form")(({theme}) => ({
   flex: "1 1 auto",
   display: "flex",
   [theme.breakpoints.up('md')]: {
      flexWrap: "noWrap",
      alignItems:"center",
      marginBottom: theme.spacing(1)
   },
}))

interface ISearchParams extends Partial<Record<string, string>> {
   term?: string;
   friend?: string;
   currentPage?: string;
   count?: string;
}


let splitParams = (string: string, tmp: ISearchParams) => {
   string.slice(1, string.length).split("&").forEach(item => {
      let arr = item.split("=")
      tmp[arr[0]] = arr[1]
   })
}


let UsersFormWoMemo:FC = () => {
   let {handleSubmit, formState: {errors}, register} = useForm()

   let usersPerPage = useTypesSelector(usersPerPageSelector)
   let currentPage = useTypesSelector(currentPageSelector)
   let friend = useTypesSelector(friendSelector)
   let term = useTypesSelector(termSelector)
   let isLoading = useTypesSelector(state => state.usersPage.isLoading)

   let dispatch = useAppDispatch()

   let {search} = useLocation()
   let history = useHistory()

   let onSubmit = (data: ISearchFilters) => dispatch(applyFilters(data))

   useEffect(() => {
      // if search params string !== "" apply search params
      let paramsObject: ISearchParams = {}
      splitParams(search, paramsObject)

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
      if (paramsObject.count &&
         Number(paramsObject.count) !== count &&
         !!Number(paramsObject.count)) {
         flag = true
         count = Number(paramsObject.count)
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
      let query: ISearchParams = {}

      if (term) query.term = term
      if (friend) query.friend = friend
      if (currentPage) query.currentPage = String(currentPage)
      if (usersPerPage) query.count = String(usersPerPage)

      history.push({
         pathname: '/users',
         search: queryString.stringify(query)
      })
      dispatch(getUsers())

   }, [currentPage, usersPerPage, term, friend])


   return <Box sx={{height: "50px",display: "flex", alignItems: "center"}}>
      {isLoading ? <LinearProgress sx={{flex: "1 1 auto"}}/> :
      <UsersFormElement onSubmit={handleSubmit(onSubmit)}>
         <NativeSelect
            sx={{
               mr: 1,
               ml: 1,
               flex: "0 0 80px"
            }}
            {...register("friend")}
            defaultValue={""}
         >
            <option value="">All</option>
            <option value="true">Friend</option>
            <option value="false">No friend</option>
         </NativeSelect>

         <NativeSelect
            sx={{
               mr: 1,
               flex: "0 0 50px",
               width: "50px",
            }}
            {...register("usersPerPage")}
            defaultValue={usersPerPage}
         >
            {[5, 10, 15, 20, 25].map(item => <option key={item} value={item}>{item}</option>)}
         </NativeSelect>

         <TextField
            error={errors.term}
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
               height: "100%"
            }}
            size="small"
            variant="contained"
            type={"submit"}>Submit

         </Button>
      </UsersFormElement>}
   </Box>

}

export let UsersForm = memo(UsersFormWoMemo)