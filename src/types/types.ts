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

export type photosType = {
    small: string | null
    large: string | null
}

export interface ISetUserProfile {
    userId: number
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: contacts
    aboutMe: string | null
}
interface IPartOfUserProfileWithPhoto{
    photos: photosType
}

export type userProfileType = ISetUserProfile & IPartOfUserProfileWithPhoto

export type usersType = {
    name: string
    id: number
    photos: photosType
    followed: boolean
    status: string
}

export interface IErrorType {
    type: string
    name:string
    message: string
}