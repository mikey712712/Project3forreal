import { Box } from "@chakra-ui/react"
import { auth, RealTimeDB } from "../App"

export default function ChatRoomHeader({ roomNumber }) {
	const link = `chat/${roomNumber}`

	const user = auth.currentUser

	// useEffect(() => {
	// 	const query = ref(RealTimeDB, link)
	// 	return onValue(query, (snapshot) => {
	// 		const data = snapshot.val()

	// 		if (snapshot.exists()) {
	// 			let headerUsers = []
	// 			for (let prop in data) {
	// 				newMessageList.push({ key: prop, message: data[prop].message, userName: data[prop].username })
	// 			}
	// 			console.log(newMessageList)
	// 			setMessages(newMessageList)
	// 		}
	// 	})
	// }, [])
	return (
		<Box border="1px solid black" h="70px" p="5px">
			HI
		</Box>
	)
}
