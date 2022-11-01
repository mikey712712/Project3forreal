import { Box, Button, Text } from "@chakra-ui/react"
import { ref, onValue, set, push } from "firebase/database"
import { RealTimeDB } from "../App"
export default function Contact({ photoURL, displayName, uid, me, setRoomNumber }) {
	const openAndOrCreateChat = () => {
		let myRoomsList = []
		let friendsRoomsList = []
		let match = ""
		onValue(
			ref(RealTimeDB, "Users/" + me),
			(snapshot) => {
				const data = snapshot.val()
				if (snapshot.exists()) {
					let userObject = data[Object.keys(data)[0]]
					if (Object.keys(userObject).includes("MyRooms")) {
						myRoomsList = userObject["MyRooms"] // myRooms = [RoomCode]
					}
				}
			},
			{ onlyOnce: true }
		)
		onValue(
			ref(RealTimeDB, "Users/" + uid),
			(snapshot) => {
				const data = snapshot.val()
				if (snapshot.exists()) {
					let userObject = data[Object.keys(data)[0]]
					if (Object.keys(userObject).includes("MyRooms")) {
						friendsRoomsList = userObject["MyRooms"] // myRooms = [RoomCode]
					}
				}
			},
			{ onlyOnce: true }
		)

		for (let room of myRoomsList) {
			if (friendsRoomsList.includes(room)) {
				match = room
			}
		}

		if (match === "") {
			// make a new room and add to both users MyRooms
			console.log("no room")
		} else {
			setRoomNumber(match)
		}
	}
	return (
		<Box onClick={openAndOrCreateChat}>
			<Text> {displayName}</Text>
			<Button>call me</Button>
		</Box>
	)
}
