import { Avatar, Box, Button, Flex, Heading } from "@chakra-ui/react"
import { auth, RealTimeDB } from "../App"
import { useEffect, useState } from "react"
import { ref, onValue } from "firebase/database"
import { createRoom, openUserMedia } from "../functions/FirebaseRTC"
import { createCallRequest } from "../functions/FirebaseRTDB"
import { IoIosCall } from "react-icons/io"
import { useNavigate } from "react-router-dom"

export default function ChatRoomHeader({ roomNumber, setVideoOn }) {
	const link = `Rooms/${roomNumber}`
	const [targetUser, setTargetUser] = useState("")
	const user = auth.currentUser
	const navigate = useNavigate()

	useEffect(() => {
		const query = ref(RealTimeDB, link)
		return onValue(query, (snapshot) => {
			const data = snapshot.val()

			if (snapshot.exists()) {
				const messageRecieverUID = data.filter((e) => e !== user.uid)[0]

				onValue(ref(RealTimeDB, `Users/${String(messageRecieverUID)}`), (snapshot) => {
					const messageRecieverData = snapshot.val()[Object.keys(snapshot.val())[0]]
					setTargetUser(messageRecieverData)
				})
				// setTargetUser()
			}
		})
	}, [roomNumber])
	return (
		<Flex bgColor="white" justify="space-between" alignItems="center" borderTopRadius="10px" border="2px solid #1B4965" w="100%" h="fit-content" p="10px">
			<Flex
				cursor="pointer"
				onClick={() => {
					navigate(`users/${targetUser.uid}`)
				}}
				alignItems="center"
			>
				{targetUser.photoURL ? (
					<Avatar m="0 5px 0 0" src={targetUser.photoURL} />
				) : (
					<span style={{ margin: "0 5px 0 0" }} class="chakra-avatar css-10fsqtq">
						<svg viewBox="0 0 128 128" class="chakra-avatar__svg css-16ite8i" role="img" aria-label=" avatar">
							<path
								fill="currentColor"
								d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
							></path>
							<path
								fill="currentColor"
								d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
							></path>
						</svg>
					</span>
				)}
				<Heading fontSize="1.7em">{targetUser.displayName}</Heading>
			</Flex>
			<Button
				onClick={async () => {
					setVideoOn("full")
					await openUserMedia()
					await createRoom(roomNumber)
					console.log("room created")
					await createCallRequest(roomNumber, targetUser.uid)
				}}
				float="right"
				fontSize="1.2em"
				bgColor="#1B4965"
				color="white"
				p="5px"
				h="fit-content"
				w="fit-content"
			>
				<IoIosCall />
			</Button>
		</Flex>
	)
}
