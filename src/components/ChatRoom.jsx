import SubmitChatButton from "./SubmitChatButton"
import MessageList from "./MessageList"
import ChatRoomHeader from "./ChatRoomHeader"
import VideoButton from "./VideoButton"
import { Box, Flex, Grid } from "@chakra-ui/react"
import { openUserMedia } from "../functions/FirebaseRTC"
import { useEffect } from "react"

export default function ChatRoom({ roomNumber, setVideoOn }) {
	if (roomNumber) {
		return (
			<Flex bgColor="unset" flexFlow="column nowrap" boxSizing="border-box" h="100%" w="100%" p="10px" className="chatroom" zIndex="0">
				<ChatRoomHeader roomNumber={roomNumber} setVideoOn={setVideoOn} />
				<Box
					className="scroll-chat"
					position="relative"
					overflow="scroll"
					h="auto"
					borderRight="2px solid #1B4965"
					borderLeft="2px solid #1B4965"
					flex="1 1 auto"
				>
					<MessageList roomNumber={roomNumber} />
				</Box>
				<Flex
					p="5px"
					position="relative"
					justifyContent="center"
					bottom="0px"
					borderBottomRadius="10px"
					border="2px solid #1B4965"
					w="100%"
					backgroundColor="#62b6cb"
				>
					<SubmitChatButton roomNumber={roomNumber} />
				</Flex>
			</Flex>
		)
	}
}
