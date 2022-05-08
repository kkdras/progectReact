import styles from "./pagianor.module.css"
import React, {FC, useMemo, useState} from "react";
import cn from "classnames";

/*{<Paginator portionSize={10}
            totalPage={totalUsersCount}
            currentPage={currentPage}
            count={userOfPage}
            pageChanged={pageChanged}/>}*/

type PropsType = {
    portionSize: number
    totalPage:number
    currentPage: number
    count:number
    pageChanged: (pageNumber: number) => void
}
//count - number of users per page
//portionSize - number of pages displayed in pagination

export let Paginator:FC<PropsType> = (props) => {
    let numberOfPages = Math.ceil(props.totalPage / props.count);
    let createArrForPagination = (numberOfPages: number) => {
        let tmp = [];
        for (let i = 1; i <= numberOfPages; i++) {
            tmp.push(i)
        }
        return tmp
    }

    let numArrPagination = useMemo(() => {
        return createArrForPagination(numberOfPages)
    }, [numberOfPages]);

    let numberOfSlides = Math.ceil(numberOfPages / props.portionSize);
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
        { numberOfSlides > portionNumber &&
        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }


    </div>
}