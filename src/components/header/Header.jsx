import s from "./header.module.css"
function Header() {
    return (
        <div className={s.header}>
            <div className={`${s.header__container} _container`}>
                <a href="#" className={`${s.header__logo} _ibg`}>
                    <img src="https://old-corp.qiwi.com/dam/jcr:75d303a3-c579-4fb4-be4c-258da7f2a05f/qiwi_logo_rgb_small.png" alt="" />
                </a>
                <a href={"#"} className={s.header__title}>
                    Chat room for you!
                </a>
            </div>
        </div>
    )
}
export default Header;