import s from "../../Page.module.css"
import sa from "./aside.module.css"
import {NavLink} from "react-router-dom";
function Aside() {
    return (
        <aside className={`${s.page__aside } ${sa.aside}`}>
            <ul className={sa.aside__list}>
                <li className={sa.aside__item}><NavLink to="/profile" activeClassName={sa.aside__active} className={sa.aside__link}>Главная</NavLink></li>
                <li className={sa.aside__item}><NavLink to="/dilogs" activeClassName={sa.aside__active} className={sa.aside__link}>Чат</NavLink></li>
                <li className={sa.aside__item}><NavLink to="/music" activeClassName={sa.aside__active} className={sa.aside__link}>Музыка</NavLink></li>
                <li className={sa.aside__item}><NavLink to="/users" activeClassName={sa.aside__active} className={sa.aside__link}>Пользователи</NavLink></li>
                <li className={sa.aside__item}><a href="" className={sa.aside__link}>Экосистема</a></li>
                <li className={sa.aside__item}><a href="" className={sa.aside__link}>О нас</a></li>
            </ul>
        </aside>
    )
}
export default Aside;