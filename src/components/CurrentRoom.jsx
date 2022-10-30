import Message from "./Message"


export default function CurrentRoom({messages}) {
	const renderedMessages = messages.map(msg=> <Message />)
	
	return (
		<div className = "chatroom">
			{renderedMessages}
		</div>
	)
}
