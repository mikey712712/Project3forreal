import Message from "./Message"
import { onValue, ref } from "firebase/database"
import { RealTimeDB } from "../App"
import { useEffect, useState } from "react"
export default function MessageList({ roomNumber }) {
	let messagesToRender = []
	const link = `chat/${roomNumber}`
	const [messages, setMessages] = useState([])

	useEffect(() => {
		const query = ref(RealTimeDB, link)
		return onValue(query, (snapshot) => {
			const data = snapshot.val()

			if (snapshot.exists()) {
				let newMessageList = []
				for (let prop in data) {
					newMessageList.push({ key: prop, message: data[prop].message, userName: data[prop].username })
				}
				console.log(newMessageList)
				setMessages(newMessageList)
			}
		})
	}, [])

	messagesToRender = messages.map((msg) => {
		return <Message key={msg.key} message={msg.message} author={msg.userName}></Message>
	})
	console.log("messages", messagesToRender)
	return <div className="MessageList">{messagesToRender}</div>
}
