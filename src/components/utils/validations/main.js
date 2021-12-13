export let maxLengthCreator = (len) => {
    return (value) => {
        if(value.length > len) return `Max length is ${len} symbols`;
        return undefined
    }
}
export let MaxLength = (value) => {
    if(value.length > 20) return `Max length is ${20} symbols`;
    return undefined
}

export let required = value => {
    if(value) return undefined;
    return "Ошибка. Введите сообщение"
}