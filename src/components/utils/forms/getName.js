export let getName = (string) => {
    let tmp1 = string.split("(")[1]
    tmp1 = tmp1.split(")")[0]
    tmp1 = tmp1.split(">")
    if(tmp1.length === 1) {
        tmp1 = tmp1[0]
    }else {
        tmp1 = tmp1[1]
    }
    let firstLetter = tmp1[0].toLowerCase()
    return firstLetter + tmp1.slice(1,tmp1.length)
}