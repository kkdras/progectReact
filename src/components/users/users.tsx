import Loading from "./loading";
import {Paginator} from "../utils/pagination/paginator";
import {User} from "./user";
import {useTypesSelector} from "../../types/hooks";
import {
    applyFilters,
    followedCreator,
    getUsersCreator,
    pageChangedCreator,
    unfollowedCreator
} from "../../redax/usersReducer";
import React, {FC, useEffect} from "react";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import s from "../profile/profile.module.css";
import {useHistory, useLocation} from "react-router-dom";
import * as queryString from "querystring";

type OnSubmitType = {
    term: string
    friend: string
}

export let Users = ({}) => {
    let dispatch = useDispatch()
    useWithAuthRedirect()

    let {term, friend, followingProgress, users, isLoading, totalPage, currentPage, count}
        = useTypesSelector(state => state.usersPage)

    let pageChanged = (pageNumber: number) => {
        dispatch(pageChangedCreator(pageNumber, count))
    }


    let splitParams = (string: string, tmp: any) => {
        string.slice(1,string.length).split("&").forEach(item => {
            let arr = item.split("=")
            tmp[arr[0]] = arr[1]
        })

    }

    let {search} = useLocation()

    type ParamsObjectType = {
        term?: string
        friend?: string
        currentPage?: string
    }
    useEffect(() => {
        let paramsObject:ParamsObjectType = {}
        splitParams(search,paramsObject)

        let actualPage = currentPage
        let friend = ""
        let term = ""

        if(paramsObject.currentPage) actualPage = Number(paramsObject.currentPage)
        if(paramsObject.term) term = paramsObject.term
        if(paramsObject.friend) friend = paramsObject.friend
        dispatch(applyFilters(term,friend,actualPage))

    },[])

    let history = useHistory()
    useEffect(() => {
        let query:ParamsObjectType = {}

        if(term) query.term = term
        if(friend) query.friend = friend
        if(currentPage) query.currentPage = String(currentPage)

        history.push({
            pathname: '/users',
            search : queryString.stringify(query)
        })
        dispatch(getUsersCreator())
    }, [currentPage, count, term, friend])


    let onSubmit = (data: OnSubmitType) => {
        dispatch(applyFilters(data.term, data.friend,1))
    }
    return (
        <div>
            <Loading loading={isLoading}/>

            <Paginator portionSize={10} totalPage={totalPage} currentPage={currentPage} count={count}
                       pageChanged={pageChanged}/>
            <UsersForm onSubmit={onSubmit}/>

            {users.map(item => (
                <User key={item.id} item={item}
                      followingProgress={followingProgress}
                      unfollowedCreator={unfollowedCreator}
                      followedCreator={followedCreator}
                />
            ))}
        </div>
    )
}

type UsersFormTypes = {
    onSubmit: (data: OnSubmitType) => void
}


let UsersForm: FC<UsersFormTypes> = ({onSubmit}) => {
    let {handleSubmit, formState: {errors}, register} = useForm()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("friend")} id="">
                <option selected value="">Все</option>
                <option value="true">Друзья</option>
                <option value="false">Враги</option>
            </select>
            <input type="text"{...register("term", {
                maxLength: {
                    value: 10,
                    message: "Слишком много букв"
                }
            })}/>
            {errors.message && <p>errors.message.term</p>}
            <button className={s.add}>submit</button>
        </form>
    )
}
