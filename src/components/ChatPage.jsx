import ChatRoom from "./ChatRoom"
import { Box } from "@chakra-ui/react"

export default function ChatPage({ setVideoOn, roomNumber }) {
	return (
		<Box bgColor="unset" position="relative" h="100%" w="100%" m="0 auto">
			<ChatRoom setVideoOn={setVideoOn} roomNumber={roomNumber} />
		</Box>
	)
}
