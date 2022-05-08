export let getName = (string) => {
    let value = ""
    let flag = false
    for (let i = 0; i < string.length; i++) {
        if(string[i] === "("){
            flag = true
        }else if(string[i] === ")"){
            flag = false
        }else if(flag){
            if(string[i - 1] === "("){
                value += string[i].toLowerCase()
            } else if(string[i] === "-"){
                value += ""
            }else if(string[i] === ">"){
                value += "."
            }else if(string[i - 1] === ">"){
                value += string[i].toLowerCase()
            }else{
                value += string[i]
            }
        }
    }
    return value
}