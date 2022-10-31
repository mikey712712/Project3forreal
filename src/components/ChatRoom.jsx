import SubmitChatButton from "./SubmitChatButton"
import MessageList from "./MessageList"
import { Box } from "@chakra-ui/react"
export default function ChatRoom({ roomNumber }) {
	return (
		<Box w="60%" m="0 auto" border="1px solid black" p="20px" className="chatroom">
			<MessageList roomNumber={roomNumber} />
			<SubmitChatButton />
		</Box>
	)
}
