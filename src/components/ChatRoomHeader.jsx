import { Box } from "@chakra-ui/react"
import { auth, RealTimeDB } from "../App"
import { useEffect } from "react"
import { ref, onValue } from "firebase/database"

export default function ChatRoomHeader({ roomNumber }) {
	const link = `Rooms/${roomNumber}`

	const user = auth.currentUser

	useEffect(() => {
		const query = ref(RealTimeDB, link)
		return onValue(query, (snapshot) => {
			const data = snapshot.val()

			if (snapshot.exists()) {
				let headerUsers = []
				for (let prop in data) {
					console.log(data)
				}
			}
		})
	}, [])
	return (
		<Box borderTopRadius="10px" border="1px solid rgba(0,0,0,0.6)" h="7vh" p="5px">
			{roomNumber}
		</Box>
	)
}
