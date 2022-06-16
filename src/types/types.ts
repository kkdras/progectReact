export type contacts = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}


export interface ISetUserProfile {
    userId: number
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: contacts
    aboutMe: string | null
}
export interface IUserPhoto{
    photos: {
        small: string | null
        large: string | null
    }
}

export type userProfileType = ISetUserProfile & IUserPhoto

export interface IUserOfList {
    name: string
    id: number
    photos: IUserPhoto["photos"]
    followed: boolean
    status: string | null,
    pendingFollow: boolean
}

export interface IErrorType {
    type: string
    name:string
    message: string
}