export let constructorSelector = (...arg) => {
    return (state) => {
        return state[arg[0]][arg[1]]
    }
}

export let getUsersSelectors = constructorSelector("usersPage","users")

export let getCurrentPageSelectors = (state) => {
    return state.usersPage.currentPage;
}

