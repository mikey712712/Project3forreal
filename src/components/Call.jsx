import { Button, Text } from "@chakra-ui/react"
import { joinRoomById, openUserMedia } from "../functions/FirebaseRTC"

export default function Call({ roomNumber }) {
	return (
		<Flex>
			<Text zIndex="200" position="absolute" top="50%" left="50%" fontSize={"5em"}>
				You are getting a call
			</Text>
			<Button
				onClick={() => {
					openUserMedia()
					joinRoomById(roomNumber)
				}}
			>
				Accept
			</Button>
		</Flex>
	)
}
