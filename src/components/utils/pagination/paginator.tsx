import styles from "./pagianor.module.css"
import {FC, useMemo, useState} from "react";
import cn from "classnames";

type PropsType = {
    portionSize: number
    totalPage:number
    currentPage: number
    count:number
    pageChanged: (pageNumber: number) => void
}

export let Paginator:FC<PropsType> = (props) => {
    let pageCount = Math.ceil(props.totalPage / props.count);
    let createArrForPagination = (pageCount: number) => {
        console.log("требовательная функция")
        let tmp = [];
        for (let i = 1; i <= pageCount; i++) {
            tmp.push(i)
        }
        return tmp
    }

    let numArrPagination = useMemo(() => createArrForPagination(pageCount), [pageCount]);

    let portionCount = Math.ceil(pageCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return <div className={styles.paginator}>
        { portionNumber > 1 &&
        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

        {numArrPagination
            .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
            .map((p) => {
                return <span className={ cn({
                    [styles.selectedPage]: props.currentPage === p
                }, styles.pageNumber) }
                             key={p}
                             onClick={(e) => {
                                 props.pageChanged(p);
                             }}>{p}</span>
            })}
        { portionCount > portionNumber &&
        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }


    </div>
}