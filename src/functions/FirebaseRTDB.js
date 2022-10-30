import { RealTimeDB } from "../App";
import {ref,set,serverTimestamp} from "firebase/database"



export function writeChatMessage(userId,message,roomID) {
    set(ref(RealTimeDB,'chat/' + roomID),{
        username: userId,
        message: message,
        createdAt: serverTimestamp()
    })
}