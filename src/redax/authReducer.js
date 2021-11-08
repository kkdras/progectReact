let CONNECT = "CONNECT"

let initialState = {
    userId: null,
    email: null,
    login: null,
    isLog: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECT:
            //debugger
            return  {
                ...state,
                ...action.date,
                isLog: true,
            }

        default:
            return state

    }

}
export let toLoginAC = (userId,login,email) => {
    return {
        type: CONNECT,
        data:{
            userId,
            login,
            email,
        }
    }
}
