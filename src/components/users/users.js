import styles from "./users.module.css"
import Loading from "./loading";
import {NavLink} from "react-router-dom";

function Users(props){
    let pageCount = Math.ceil(props.totalPage / props.count);

    let numArrPagination = [];

    for (let i = 1; i <= pageCount && i < 200 ; i++) {
        numArrPagination.push(i)
    }
    return (
        <div>
            <Loading loading={props.loading}/>
            <div className={styles.paginationContainer}>{numArrPagination.map(item => {
                return <button onClick={(e) => props.pageChanged(item)} className={`${styles.paginationItem} ${props.currentPage === item && styles.activeCurrentPagination}`}>{item}</button>
            })}</div>
            {props.users.map(item => (
                <div className={styles.users__container}>
                    <div className={styles.userWrapper}>
                        <div className={styles.userLeft}>

                            <NavLink to={'/profile/' + item.id}><img className={styles.userImage} src={item.photos.large || "https://persons.life/wp-content/uploads/2021/01/dmitry-nagiev-400x400.jpg"} alt=""/> </NavLink>

                            {item.followed ?
                                <button disabled={props.followingProgress.some(id => id === item.id)} onClick={
                                    () => {props.unfollowedCreator(item.id)}
                                } className={styles.userButton}>Unfollow</button>
                                : <button disabled={props.followingProgress.some(id => id === item.id)} onClick={
                                    () => {props.followedCreator(item.id)}
                                } className={styles.userButton}>Follow</button>}
                        </div>
                        <div className={styles.userRight}>
                            <div className={styles.userRL}>
                                <div className={styles.userName}>{item.name}</div>
                                <div className={styles.userDiscripton}>{item.status}</div>
                            </div>
                            <div className={styles.userRR}>
                                <div className={styles.userСountry}>
                                    {"item.location.country"}
                                </div>
                                <div className="userCity">
                                    {"item.location.city"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Users