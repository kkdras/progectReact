import {connect} from "react-redux";
import Users from "./users";
import {
    setCurrentPage,
    getUsersCreator, pageChangedCreator, unfollowedCreator, followedCreator
} from "../../redax/usersReducer";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getUsersSelectors} from "../../redax/usersSelectors";

class UsersContainer extends React.Component{

    componentDidMount() {
        this.props.getUsersCreator(this.props.currentPage,this.props.count)
    }
    pageChanged = pageNumber => {
        //this.props.setCurrentPage(pageNumber)
        this.props.pageChangedCreator(pageNumber,this.props.count)
    }

    render() {
        return <Users
            loading={this.props.loading}
            totalPage={this.props.totalPage}
            count={this.props.count}
            pageChanged={this.pageChanged}
            currentPage={this.props.currentPage}
            users={this.props.users}
            followingProgress={this.props.followingProgress}
            unfollowedCreator={this.props.unfollowedCreator}
            followedCreator={this.props.followedCreator}
        />
    }
}
/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        totalPage: state.usersPage.totalPage,
        count: state.usersPage.count,
        loading: state.usersPage.isLoading,
        followingProgress: state.usersPage.followingProgress,
    }
}*/

let mapStateToProps = (state) => {
    return {
        users: getUsersSelectors(state),
        currentPage: state.usersPage.currentPage,
        totalPage: state.usersPage.totalPage,
        count: state.usersPage.count,
        loading: state.usersPage.isLoading,
        followingProgress: state.usersPage.followingProgress,
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

