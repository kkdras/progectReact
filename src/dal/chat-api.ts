import {massageObject, statusType} from "../redax/dialogsReducer";

let ws: WebSocket | null = null

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
    console.log("refresh page")
}
let closeHandler = () => {
    console.log("соединение с WebSocked разорвано")
    notifyStatusSubscribers("pending")
    setTimeout(createChannel,3000)
}
//setTimeout(() => ws?.close(),2000)

let notifyStatusSubscribers = (status: statusType) => {
    subscribers["status-changed"].forEach(item => item(status))
}

let createChannel = () => {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifyStatusSubscribers("pending")
    ws.addEventListener('open', openHandler)
    ws.addEventListener('close',closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("error", errorHandler)

}


type MessageReceivedSubscriberType = (message: Array<massageObject>) => void
type ChangeStatusSubscriberType = (status: statusType) => void


export type eventType = "message-received" | "status-changed"

type subscribersType = {
    "message-received": Array<MessageReceivedSubscriberType>
    "status-changed": Array<ChangeStatusSubscriberType>
}
let subscribers: subscribersType = {
    "status-changed": [],
    "message-received": [],
}


export let ChatApi = {
    start(){
        createChannel()
    },
    subscribe(event: eventType,observer:MessageReceivedSubscriberType | ChangeStatusSubscriberType) {
        //@ts-ignore
        subscribers[event].push(observer)
        return () => {
            //@ts-ignore
            subscribers[event].filter(item => item !== observer)
        }
    },
    unsubscribe(event: eventType,observer:MessageReceivedSubscriberType | ChangeStatusSubscriberType){
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

