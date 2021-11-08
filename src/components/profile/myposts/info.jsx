import s from "./../profile.module.css";
import React from "react";
import Loading from "../../users/loading";
function Info(props) {

    let addPostText = React.createRef()

    let addPost = () => {
        props.addPostContainer()
    }
    let letterChange = () => {
        let text = addPostText.current.value;
        props.letterChangeContainer(text);
    }
    //debugger
    if (!props.userProfile){
        return (<Loading/>)
    }else {
        return (
            <div className={s.infoWrapper}>
                <div className={s.profile__banner}>
                    <img src={props.userProfile.photos.large} alt=""/>
                </div>
                <div className={s.infoText}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, dolore dolorem eligendi eos esse
                    laboriosam libero maxime modi voluptates voluptatum. Atque corporis, eos in libero maiores neque
                    praesentium tempora temporibus.
                    <br/>
                    Add Post:
                </div>
                <div className={s.addPost}>
                    <textarea ref={addPostText} onChange={letterChange} className={s.texarea}
                              value={props.textarea}/>
                    <button onClick={addPost} className={s.add}>Add post</button>
                </div>
            </div>
        )
    }
}
export default Info;