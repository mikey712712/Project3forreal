import { RealTimeDB } from "../App";
import {ref,set,serverTimestamp,push} from "firebase/database"



export function writeChatMessage(userId,message,roomID) {
    const chatThreadRef = ref(RealTimeDB,'chat/' + roomID)
    const newMessageRef = push(chatThreadRef)

    set(newMessageRef,{
        username: userId,
        message: message,
        createdAt: serverTimestamp()
    })
}