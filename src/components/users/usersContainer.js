import {connect} from "react-redux";
import Users from "./users";
import {followAC, setUsers, unfollowAC} from "../../redax/usersReducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        followed(userId){
            dispatch(followAC(userId))
        },
        unFollowed(userId){
            dispatch(unfollowAC(userId))
        },
        setUsersContainer(users){
            dispatch(setUsers(users))
        },
    }
}



let UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users)

export default UsersContainer;