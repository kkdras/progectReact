import styles from "./users.module.css";
import unnamed from "../../asserts/unnamed.gif";
import {FC} from "react";

let Loading:FC = () =>{
    return (<div className={styles.loadingContainer}>
             <img className={styles.loadingGif} src={unnamed} alt=""/>
        </div>)
}
export default Loading