import s from "./../profile.module.css";
import React from "react";

function Info(props) {

    let addPostText = React.createRef()

    let addPost = () => {
        props.addPostContainer()
    }
    let letterChange = () => {
        let text = addPostText.current.value;
        props.letterChangeContainer(text);
    }

    return (
        <div className={s.infoWrapper}>
            <div className={s.profile__banner}>
                <img src="https://cdn.dribbble.com/users/3132/screenshots/2138242/media/e07b0e9a6413cd834957dfd89a4a5958.jpg?compress=1&resize=400x300" alt="" />
            </div>
            <div className={s.infoText}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, dolore dolorem eligendi eos esse laboriosam libero maxime modi voluptates voluptatum. Atque corporis, eos in libero maiores neque praesentium tempora temporibus.
                <br/>
                Add Post:
            </div>
            <div className={s.addPost}>
                <textarea ref={addPostText} onChange={letterChange} className={s.texarea} value={props.textarea} ></textarea>
                <button onClick={addPost} className={s.add}>Add post</button>
            </div>
        </div>
    )
}
export default Info;