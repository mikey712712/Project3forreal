import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react"
import { ref, onValue, set, push } from "firebase/database"
import { RealTimeDB } from "../App"
import { createNewChatRoom, writeChatMessage } from "../functions/FirebaseRTDB"

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
			const roomReference = createNewChatRoom(me, uid)

			// console.log(roomReference)
			setRoomNumber(roomReference)
		} else {
			console.log("match found")
			// console.log(match)
			setRoomNumber(match)
			// writeChatMessage("mikey1", "hi", match)
		}
	}
	return (
		<Flex
			bgColor="rgba(255,255,255,0.6)"
			alignItems="center"
			borderRadius="6px"
			border={"1px solid rgba(0,0,0,0.2)"}
			m="4px"
			p="6px"
			boxSizing="border-box"
			onClick={openAndOrCreateChat}
		>
			<Avatar marginRight="10px" />
			<Text fontWeight="bold" h="fit-content">
				{displayName}
			</Text>
		</Flex>
	)
}
