export let getUsersSelectors = (state) => {
    return state.usersPage.users
}

export let getCurrentPageSelectors = (state) => {
    return state.usersPage.currentPage
}

export let getTotalPageSelectors = (state) => {
    return state.usersPage.totalPage
}

export let getCountSelectors = (state) => {
    return state.usersPage.count
}

export let getIsLoadingSelectors = (state) => {
    return state.usersPage.isLoading
}

export let getFollowingProgressSelectors = (state) => {
    return state.usersPage.followingProgress
}