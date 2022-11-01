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

export function createUserRealTimeDB(uid, displayName, email) {
	const userRef = ref(RealTimeDB, "Users/" + uid)
	const newUserRef = push(userRef)

	set(newUserRef, {
		uid: uid,
		friends: ["no one"],
		displayName: displayName,
		email: email,
		createdAt: serverTimestamp(),
	})
}

export function createFriendRequest(fromUid, toUid, displayName, profileURL) {
	const requestRef = ref(RealTimeDB, "Requests/" + toUid)
	const newRequestRef = push(requestRef)

	set(newRequestRef, {
		uid: fromUid,
		createdAt: serverTimestamp(),
		displayName: displayName,
		profileURL: profileURL === undefined ? "" : profileURL,
	})

	console.log("sent a request")
}
