export type insideObjectType = {
    id: number
    massage: string
    like: number
    dislike?: number
}

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

export type userProfileType = {
    userId: number
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: contacts
    photos: photosType
}

export type usersType = {
    name: string
    id: number
    photos: photosType
    followed: boolean
    status: string
}
