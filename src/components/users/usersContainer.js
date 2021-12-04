import {connect} from "react-redux";
import Users from "./users";
import {
    setCurrentPage,
    getUsersCreator, pageChangedCreator, unfollowedCreator, followedCreator
} from "../../redax/usersReducer";
import React, {useEffect} from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCountSelectors,
    getCurrentPageSelectors, getFollowingProgressSelectors, getIsLoadingSelectors,
    getTotalPageSelectors,
    getUsersSelectors
} from "../../redax/usersSelectors";

let UsersContainer = (props) => {
    useEffect(() => {
        props.getUsersCreator(props.currentPage,props.count)
    }, [])

    let pageChanged = pageNumber => {
        props.pageChangedCreator(pageNumber,props.count)
    }

    return <Users
        loading={props.loading}
        totalPage={props.totalPage}
        count={props.count}
        pageChanged={pageChanged}
        currentPage={props.currentPage}
        users={props.users}
        followingProgress={props.followingProgress}
        unfollowedCreator={props.unfollowedCreator}
        followedCreator={props.followedCreator}
    />
}
let mapStateToProps = (state) => {
    return {
        users: getUsersSelectors(state),
        currentPage: getCurrentPageSelectors(state),
        totalPage: getTotalPageSelectors(state),
        count: getCountSelectors(state),
        loading: getIsLoadingSelectors(state),
        followingProgress: getFollowingProgressSelectors(state),
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,{
        setCurrentPage,
        getUsersCreator,
        pageChangedCreator,
        unfollowedCreator,
        followedCreator,
    })
)(UsersContainer)

