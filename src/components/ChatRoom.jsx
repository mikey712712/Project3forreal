import Message from "./Message"
import SubmitChatButtonq from "./SubmitChatButton"
import {useRef} from 'react' 

export default function ChatRoom({messages}) {

	
	const renderedMessages = messages.map(msg=> <Message key = {msg.id} message = {msg.message}/>)
	
	return (
	<div className = "chatroom">
		{renderedMessages}
		{/* <div ref = {divForScrolling}></div>  <- we will use this to auto scroll later on*/}
		<SubmitChatButton />
	</div>

	
	)	
}


