import { RealTimeDB } from "../App"
import { ref, set, serverTimestamp, push, onValue, remove } from "firebase/database"

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

export function createNewChatRoom(user1, user2) {
	// to do later, functionalise this to its more DRY
	// generate new Chat ID and add to myRooms of the 2 users

	const chatThreadRef = ref(RealTimeDB, "chat")
	const newChatRoomRef = push(chatThreadRef)
	let user1Ref = ""
	let user2Ref = ""
	let user1MyRoom = []
	let user2MyRoom = []
	onValue(
		ref(RealTimeDB, "Users/" + user1),
		(snapshot) => {
			const data = snapshot.val()
			if (snapshot.exists()) {
				user1Ref = Object.keys(data)[0]
				let userObject = data[user1Ref]
				if (userObject.MyRooms) {
					user1MyRoom = userObject.MyRooms
				}
			}
		},
		{ onlyOnce: true }
	)
	onValue(
		ref(RealTimeDB, "Users/" + user2),
		(snapshot) => {
			const data = snapshot.val()
			if (snapshot.exists()) {
				user2Ref = Object.keys(data)[0]
				let userObject = data[user2Ref]
				if (userObject.MyRooms) {
					user2MyRoom = userObject.MyRooms
				}
			}
		},
		{ onlyOnce: true }
	)

	set(ref(RealTimeDB, `Users/${user1}/${user1Ref}/MyRooms`), [...user1MyRoom, newChatRoomRef.key])

	set(ref(RealTimeDB, `Users/${user2}/${user2Ref}/MyRooms`), [...user2MyRoom, newChatRoomRef.key])
	set(ref(RealTimeDB, `Rooms/${newChatRoomRef.key}`), [user1, user2])
	return newChatRoomRef.key
}

export function createCallRequest(roomNumber, user) {
	onValue(
		ref(RealTimeDB, "IncomingCalls/" + user),
		(snapshot) => {
			if (snapshot.exists()) {
				// Notify the caller they cant call
			} else {
				setTimeout(() => set(ref(RealTimeDB, `IncomingCalls/${user}`), `${roomNumber}`), 0)
				setTimeout(() => {
					console.log("timout")
					remove(ref(RealTimeDB, `IncomingCalls/${user}`))
				}, 30000)
			}
		},
		{ onlyOnce: true }
	)
}
