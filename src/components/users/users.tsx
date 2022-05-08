import {User} from "./user";
import {useTypesSelector} from "../../app/hooks";
import {
   applyFilters, followUser, getUsers, setCurrentPage, unfollowUser
} from "../../redax/usersReducer";
import React, {FC, useEffect} from "react";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useHistory, useLocation} from "react-router-dom";
import * as queryString from "querystring";
import {Button, LinearProgress, NativeSelect, Pagination, styled, TextField} from '@mui/material';


type OnSubmitType = {
   term: string
   friend: string
   userOfPage: number
}

export let Users = ({}) => {
   let dispatch = useDispatch()
   useWithAuthRedirect()

   let {term, friend, followingProgress, users, isLoading, totalUsersCount, currentPage, userOfPage}
      = useTypesSelector(state => state.usersPage)


   let splitParams = (string: string, tmp: any) => {
      string.slice(1, string.length).split("&").forEach(item => {
         let arr = item.split("=")
         tmp[arr[0]] = arr[1]
      })

   }

   let {search} = useLocation()

   type ParamsObjectType = {
      term?: string
      friend?: string
      currentPage?: string
      count?: string
   }
   useEffect(() => {
      //если в url есть параметры то примени их
      let paramsObject: ParamsObjectType = {}
      splitParams(search, paramsObject)

      let actualPage = currentPage
      let friendURI = friend
      let termURI = term
      let count = userOfPage

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
         friendURI = paramsObject.friend
      }
      if (paramsObject.count &&
         Number(paramsObject.count) !== count &&
         !!Number(paramsObject.count)) count = Number(paramsObject.count)
      if(flag){
         dispatch(applyFilters({term:termURI, friend:friendURI, currentPage:actualPage, userOfPage:count}))
      }

   }, [])

   let history = useHistory()
   useEffect(() => {
      let query: ParamsObjectType = {}

      if (term) query.term = term
      if (friend) query.friend = friend
      if (currentPage) query.currentPage = String(currentPage)
      if (userOfPage) query.count = String(userOfPage)

      history.push({
         pathname: '/users',
         search: queryString.stringify(query)
      })
      dispatch(getUsers())
   }, [currentPage, userOfPage, term, friend])


   let onSubmit = (data: OnSubmitType) => {
      console.log(data)
      dispatch(applyFilters({
         term:data.term,
         friend:data.friend,
         currentPage:1,
         userOfPage:Number(data.userOfPage)
         })
      )
   }

   return (
      <div>
         {isLoading ? <LinearProgress
               sx={{
                  mt:1,
                  mb:1
               }}/> :
            <>
               <Pagination
                  sx={{
                     mt:1,
                     mb:1
                  }}
                  siblingCount={3}
                  page={currentPage}
                  showLastButton
                  showFirstButton
                  count={Math.ceil(totalUsersCount / userOfPage)}
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<unknown>, page: number) => {
                     dispatch(setCurrentPage(page))
                  }}
                  shape="rounded" />

               <UsersForm userOfPage={userOfPage} onSubmit={onSubmit}/>

               {users.map(item => (
                  <User key={item.id} item={item}
                        followingProgress={followingProgress}
                        unfollowedCreator={unfollowUser}
                        followedCreator={followUser}
                  />
               ))}
            </>
         }
      </div>
   )
}

type UsersFormTypes = {
   onSubmit: (data: OnSubmitType) => void
   userOfPage: number
}

let UsersFormElement = styled("form")(({theme}) => ({
   display: "flex",
   [theme.breakpoints.up('md')]: {
      flexWrap: "noWrap",
      alignItems:"start",
      marginBottom: theme.spacing(1)
   },
}))

let UsersForm: FC<UsersFormTypes> = ({onSubmit,userOfPage}) => {
   let {handleSubmit, formState: {errors}, register} = useForm()
   return (
      <UsersFormElement onSubmit={handleSubmit(onSubmit)}>
         <NativeSelect
            sx={{
               mr:1,
               ml:1,
               flex: "0 1 auto"
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
               mr:1,
               flex: "0 1 auto"
            }}
            {...register("userOfPage")}
            defaultValue={userOfPage}
         >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
         </NativeSelect>

         <TextField
            error={errors.term}
            helperText={errors.term && errors.term.message}
            sx={{
               mr:1,
               flex: "1 1 auto"
            }}
            fullWidth
            label="search"
            id="search"
            size="small"
            {...register("term", {
               maxLength: {
                  value: 10,
                  message: "Слишком много букв"
               }
            }
         )} />

         <Button
            sx={{
               borderRadius: 1,
               pr:5,
               pl:5
            }}
            size="small"
            variant="contained"
            type={"submit"}>Submit
         </Button>

      </UsersFormElement>
   )
}
