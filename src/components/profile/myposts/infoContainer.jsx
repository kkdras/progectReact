import {
    createActionAddPost,
    setPhotoProfile,
    updateStatusProfile,
    putProfileObject, toggleEditMode
} from "../../../redax/profileReducer";
import Info from "./info";


export let InfoContainer = (props) => {
    return <Info isOwn={props.isOwn}
                 createActionAddPost={createActionAddPost}
                 setPhotoProfile={setPhotoProfile}
                 updateStatusProfile={updateStatusProfile}
                 putProfileObject={putProfileObject}
                 toggleEditMode={toggleEditMode}
    />
}