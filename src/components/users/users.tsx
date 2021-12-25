import Loading from "./loading";
import {Paginator} from "../utils/pagination/paginator";
import {User} from "./user";
import {useTypesSelector} from "../../types/hooks";
import {followedCreator, getUsersCreator, pageChangedCreator, unfollowedCreator} from "../../redax/usersReducer";
import {useEffect} from "react";
import {useWithAuthRedirect} from "../../hoc/withAuthRedirect";
import {useDispatch} from "react-redux";

export let Users = ({}) =>{
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsersCreator(currentPage,count))
    }, [])
    useWithAuthRedirect()
    let followingProgress = useTypesSelector(state => state.usersPage.followingProgress)
    let users = useTypesSelector(state => state.usersPage.users)
    let loading = useTypesSelector(state => state.usersPage.isLoading)
    let totalPage = useTypesSelector(state => state.usersPage.totalPage)
    let currentPage = useTypesSelector(state => state.usersPage.currentPage)
    let count = useTypesSelector(state => state.usersPage.count)
    let pageChanged = (pageNumber: number) => {
        dispatch(pageChangedCreator(pageNumber,count))
    }
    return (
        <div>
            <Loading loading={loading}/>

            <Paginator portionSize={10} totalPage={totalPage} currentPage={currentPage} count={count} pageChanged={pageChanged}/>

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
