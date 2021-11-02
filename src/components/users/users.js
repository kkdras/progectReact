import styles from "./users.module.css"

let Users = (props) => {
    debugger
    if(props.users.length == 0) {
        props.setUsersContainer([
            {
                id: 1,
                url: "https://static.nevnov.ru/uploads/2020/10/14/1050_16x9-1602672939NZ00nCb29hC9SezI1aDVgzzxnLI5tSMaSNOrC1qz.webp",
                followed: false,
                fullName: 'Andrei',
                status: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, animi, assumenda aut exercitationem fugiat fugit ipsa iste iure labore laborum placeat porro praesentium quod quos reiciendis similique, ullam voluptas voluptatem.',
                location: {city: "Paris", country: "Frrankia"}
            },
            {
                id: 2,
                url: "https://static.nevnov.ru/uploads/2020/10/14/1050_16x9-1602672939NZ00nCb29hC9SezI1aDVgzzxnLI5tSMaSNOrC1qz.webp",
                followed: true,
                fullName: 'Nina',
                status: 'Middle',
                location: {city: "Paris", country: "Frrankia"}
            },
            {
                id: 3,
                url: "https://static.nevnov.ru/uploads/2020/10/14/1050_16x9-1602672939NZ00nCb29hC9SezI1aDVgzzxnLI5tSMaSNOrC1qz.webp",
                followed: false,
                fullName: 'misha',
                status: 'Junior',
                location: {city: "Paris", country: "Frrankia"}
            },
        ])
    }
    return (
        props.users.map(item => (<div className={styles.users__container}>
                <div className={styles.userWrapper}>
                    <div className={styles.userLeft}>
                        <img className={styles.userImage} src={item.url} alt=""/>
                        {item.followed ?
                            <button onClick={() => props.unFollowed(item.id)}
                                    className={styles.userButton}>Unfollow</button>
                            : <button onClick={() => props.followed(item.id)} className={styles.userButton}>Follow</button>}
                    </div>
                    <div className={styles.userRight}>
                        <div className={styles.userRL}>
                            <div className={styles.userName}>{item.fullName}</div>
                            <div className={styles.userDiscripton}>{item.status}</div>
                        </div>
                        <div className={styles.userRR}>
                            <div className={styles.userСountry}>
                                {item.location.country}
                            </div>
                            <div className="userCity">
                                {item.location.city}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        )
    )
}

export default Users