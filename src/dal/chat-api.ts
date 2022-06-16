export type statusType = "pending" | "ready" | "error"

export interface IMessage {
    message: string
    photo: string
    userId: number
    userName: string
    id: string
}

let ws: WebSocket | null = null

let cleanUp = () => {
    ws?.removeEventListener("open",openHandler)
    ws?.removeEventListener("message",messageHandler)
    ws?.removeEventListener("error",errorHandler)
    ws?.removeEventListener('close',closeHandler)
}

let openHandler = () => {
    console.log("open")
    notifyStatusSubscribers("ready")
}
let messageHandler = (event: MessageEvent) => {
    console.log("MESSAGE")
    let newMessage = JSON.parse(event.data)
    subscribers["message-received"].forEach(item => item(newMessage))
};
let errorHandler = () => {
    console.log("error")
    notifyStatusSubscribers("error")
}
let closeHandler = () => {
    console.log("close")
    notifyStatusSubscribers("pending")
    setTimeout(createChannel,3000)
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

// interface SDep {
//     "message-received": MessageObs
//     "status-changed": StatusObs
// }

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
    }
}

