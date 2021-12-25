let CONNECT: string = "CONNECT"

type data = {
    userId: number,
    login: string,
    email: string,
    isLog: boolean
}
type logoutActionCreator = {
    type: typeof CONNECT,
    data: data
}
export let toLoginAC: (userId: number,login: string,email: string,isLog: boolean) =>
    logoutActionCreator = (userId: number,login: string,email: string,isLog: boolean) =>
    ({type: CONNECT, data:{userId, login, email, isLog,}})