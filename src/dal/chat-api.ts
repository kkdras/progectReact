export type statusType = "pending" | "ready" | "error"

export interface IMessage {
    message: string
    photo: string
    userId: number
    userName: string
    id: string
}

let ws: WebSocket | null = null
let _timerId: ReturnType<typeof setTimeout> | null = null


let cleanUp = () => {
    ws?.removeEventListener("open",openHandler)
    ws?.removeEventListener("message",messageHandler)
    ws?.removeEventListener("error",errorHandler)
    ws?.removeEventListener('close',closeHandler)
}

let openHandler = () => {
    notifyStatusSubscribers("ready")
}
let messageHandler = (event: MessageEvent) => {
    let newMessage = JSON.parse(event.data)
    subscribers["message-received"].forEach(item => item(newMessage))
};
let errorHandler = () => {
    notifyStatusSubscribers("error")
}
let closeHandler = () => {
    notifyStatusSubscribers("pending")
    _timerId = setTimeout(createChannel,3000)
}

let notifyStatusSubscribers = (status: statusType) => {
    subscribers["status-changed"].forEach(item => item(status))
}

let createChannel = async () => {
    await cleanUp()
    await ws?.close()
    ws = await new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    await notifyStatusSubscribers("pending")
    await ws.addEventListener("open", openHandler)
    await ws.addEventListener("close",closeHandler)
    await ws.addEventListener("message", messageHandler)
    await ws.addEventListener("error", errorHandler)

}


export type MessageObs = (message: IMessage[]) => void
export type StatusObs = (status: statusType) => void


export type eventType = "message-received" | "status-changed"


interface ISubscribers{
    "message-received": MessageObs[]
    "status-changed": StatusObs[]
}

const subscribers: ISubscribers = {
    "status-changed": [],
    "message-received": [],
}

export let ChatApi = {
    start(){
        console.log('start')
        createChannel()
    },
    subscribe<T extends eventType>(event: T, observer: T extends "message-received" ? MessageObs : StatusObs) {
        //@ts-ignore
        subscribers[event].push(observer)
        return () => {
            //@ts-ignore
            subscribers[event] = subscribers[event].filter(item => item !== observer)
        }
    },
    unsubscribe(event: eventType,observer:MessageObs | StatusObs){
        //@ts-ignore
        subscribers[event] = subscribers[event].filter(item => item !== observer)
    },
    sendMessage(message: string){
        ws?.send(message)
    },
    stop(){
        subscribers["message-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
        if(_timerId) clearTimeout(_timerId)
    }
}

