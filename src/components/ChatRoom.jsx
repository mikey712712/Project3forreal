import SubmitChatButton from "./SubmitChatButton"
import MessageList from "./MessageList"
import { Box } from "@chakra-ui/react"
import ChatRoomHeader from "./ChatRoomHeader"
export default function ChatRoom({ roomNumber }) {
	return (
		<Box w="60%" m="0 auto" border="1px solid black" className="chatroom">
			<ChatRoomHeader roomNumber={roomNumber} />
			<MessageList roomNumber={roomNumber} />
			<SubmitChatButton />
		</Box>
	)
}
