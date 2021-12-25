import {
    createActionAddPost,
    setPhotoProfile,
    updateStatusProfile,
    putProfileObject, toggleEditMode
} from "../../../redax/profileReducer";
import Info from "./info";
import {FC} from "react";

type PropsType = {
    isOwn: boolean
}

export let InfoContainer:FC<PropsType> = ({isOwn}) => {
    return <Info isOwn={isOwn}
                 createActionAddPost={createActionAddPost}
                 setPhotoProfile={setPhotoProfile}
                 updateStatusProfile={updateStatusProfile}
                 putProfileObject={putProfileObject}
                 toggleEditMode={toggleEditMode}
    />
}