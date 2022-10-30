import SubmitChatButton from "./SubmitChatButton"
import MessageList from "./MessageList"
export default function ChatRoom({roomNumber}) {
	return (
	<div className = "chatroom">
		<MessageList roomNumber = {roomNumber}/>
		<SubmitChatButton />
	</div>

	
	)	
}


