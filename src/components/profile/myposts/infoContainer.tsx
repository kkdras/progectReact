import {
    ProfileActions,
    setPhotoProfile,
    updateStatusProfile,
    putProfileObject
} from "../../../redax/profileReducer";
import Info from "./info";
import {FC} from "react";

type PropsType = {
    isOwn: boolean
}

export let InfoContainer:FC<PropsType> = ({isOwn}) => {
    return <Info isOwn={isOwn}
                 createActionAddPost={ProfileActions.createActionAddPost}
                 setPhotoProfile={setPhotoProfile}
                 updateStatusProfile={updateStatusProfile}
                 putProfileObject={putProfileObject}
                 toggleEditMode={ProfileActions.toggleEditMode}
    />
}