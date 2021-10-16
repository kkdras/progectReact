import s from "./../profile.module.css";

function Info(props) {
    return (
        <div className={s.infoWrapper}>
            <div className={s.profile__banner}>
                <img src="https://cdn.dribbble.com/users/3132/screenshots/2138242/media/e07b0e9a6413cd834957dfd89a4a5958.jpg?compress=1&resize=400x300" alt="" />
            </div>
            <div className={s.infoText}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, dolore dolorem eligendi eos esse laboriosam libero maxime modi voluptates voluptatum. Atque corporis, eos in libero maiores neque praesentium tempora temporibus.
            </div>
        </div>
    )
}
export default Info;