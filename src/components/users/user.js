import styles from "./users.module.css";
import {NavLink} from "react-router-dom";

export let User = ({item,followingProgress,unfollowedCreator,followedCreator}) => {
    return (<div className={styles.users__container}>
        <div className={styles.userWrapper}>
            <div className={styles.userLeft}>

                <NavLink to={'/profile/' + item.id}><img className={styles.userImage} src={item.photos.large || "https://persons.life/wp-content/uploads/2021/01/dmitry-nagiev-400x400.jpg"} alt=""/> </NavLink>

                {item.followed ?
                    <button disabled={followingProgress.some(id => id === item.id)} onClick={
                        () => {unfollowedCreator(item.id)}
                    } className={styles.userButton}>Unfollow</button>
                    : <button disabled={followingProgress.some(id => id === item.id)} onClick={
                        () => {followedCreator(item.id)}
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
    </div>)
}