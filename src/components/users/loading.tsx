import styles from "./users.module.css";
import unnamed from "../../asserts/unnamed.gif";
import {FC} from "react";

type propsType = {
    loading: boolean
}

let Loading:FC<propsType> = ({loading}) =>{
    return (<div className={styles.loadingContainer}>
            {loading ? <img className={styles.loadingGif} src={unnamed} alt=""/> : null }
        </div>)
}
export default Loading