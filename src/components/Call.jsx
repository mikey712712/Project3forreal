import { Button, Text, Flex } from "@chakra-ui/react"
import { joinRoomById, openUserMedia } from "../functions/FirebaseRTC"

export default function Call({ roomNumber, setVideoOn }) {
	return (
		<Flex zIndex="200" position="absolute" top="50%" left="50%">
			<Text fontSize={"5em"}>You are getting a call</Text>
			<Button
				onClick={() => {
					setVideoOn("full")
					setTimeout(() => {
						openUserMedia()
					}, 0)
					setTimeout(() => {
						joinRoomById(roomNumber)
					}, 100)
				}}
			>
				Accept
			</Button>
		</Flex>
	)
}
