import { RealTimeDB } from "../App"
import { ref, set, serverTimestamp, push } from "firebase/database"

export function writeChatMessage(userId, message, roomID) {
	const chatThreadRef = ref(RealTimeDB, "chat/" + roomID)
	const newMessageRef = push(chatThreadRef)

	set(newMessageRef, {
		username: userId,
		message: message,
		createdAt: serverTimestamp(),
	})
}

export function createUserRealTimeDB(uid) {
	const userRef = ref(RealTimeDB, "Users/" + uid)
	const newUserRef = push(userRef)

	set(newUserRef, {
		uid: uid,
		friends: [],
		createdAt: serverTimestamp(),
	})
}
