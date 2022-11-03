import { Button, Text, Flex } from "@chakra-ui/react"
import { ref, remove } from "firebase/database"
import { auth, RealTimeDB } from "../App"
import { joinRoomById, openUserMedia } from "../functions/FirebaseRTC"

export default function Call({ setIncomingCall, incomingCall, setVideoOn }) {
	return (
		<Flex zIndex="200" position="absolute" top="50%" left="50%">
			<Text fontSize={"5em"}>You are getting a call</Text>
			<Button
				onClick={async () => {
					setIncomingCall("")
					await remove(ref(RealTimeDB, `IncomingCalls/${auth.currentUser.uid}`))
				}}
			>
				Decline
			</Button>
			<Button
				onClick={async () => {
					setVideoOn("full")
					await openUserMedia()
					await joinRoomById(incomingCall)
					setIncomingCall("joined")
				}}
			>
				Accept
			</Button>
		</Flex>
	)
}
