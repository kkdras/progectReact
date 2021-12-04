import styles from "./users.module.css";
import unnamed from "../../asserts/unnamed.gif";

function Loading(props){
    return (<div className={styles.loadingContainer}>
            {props.loading ? <img className={styles.loadingGif} src={unnamed} alt=""/> : null }
        </div>)
}
export default Loading