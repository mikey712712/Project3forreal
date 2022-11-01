import Videos from "./Videos"
import ChatRoom from "./ChatRoom"
import CurrentRoom from "./CurrentRoom"
import { Box } from "@chakra-ui/react"

export default function VideoPage({ setVideoOn }) {
	return (
		<Box w="100%" className="video-container" position="relative" top="36px">
			<ChatRoom setVideoOn={setVideoOn} roomNumber="1234" />
		</Box>
	)
}
