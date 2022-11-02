import { Button, Text, Flex } from "@chakra-ui/react"
import { joinRoomById, openUserMedia } from "../functions/FirebaseRTC"

export default function Call({ incomingCall, setVideoOn }) {
	return (
		<Flex zIndex="200" position="absolute" top="50%" left="50%">
			<Text fontSize={"5em"}>You are getting a call</Text>
			<Button
				onClick={() => {
					setTimeout(() => setVideoOn("full"), 0)
					setTimeout(() => {
						openUserMedia()
					}, 100)
					setTimeout(() => {
						joinRoomById(incomingCall)
					}, 200)
				}}
			>
				Accept
			</Button>
		</Flex>
	)
}
