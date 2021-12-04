import Loading from "./loading";
import {Paginator} from "../utils/pagination/paginator";
import {User} from "./user";

function Users(props){
    return (
        <div>
            <Loading loading={props.loading}/>

            <Paginator portionSize={10} totalPage={props.totalPage} currentPage={props.currentPage} count={props.count} pageChanged={props.pageChanged}/>

            {props.users.map(item => (
                    <User item={item}
                          followingProgress={props.followingProgress}
                          unfollowedCreator={props.unfollowedCreator}
                          followedCreator={props.followedCreator}
                    />
                ))}
        </div>
    )
}

export default Users