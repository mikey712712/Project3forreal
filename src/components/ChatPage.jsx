import Videos from "./Videos"
import ChatRoom from "./ChatRoom"
import CurrentRoom from "./CurrentRoom"
import { Box } from "@chakra-ui/react"
import { useState } from "react"
export default function ChatPage({ setVideoOn, roomNumber }) {
	return (
		<Box w="100%" className="video-container" position="relative" top="36px">
			<ChatRoom setVideoOn={setVideoOn} roomNumber={roomNumber} />
		</Box>
	)
}
