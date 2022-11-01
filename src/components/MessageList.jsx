import Message from "./Message"
import { onValue, ref } from "firebase/database"
import { RealTimeDB } from "../App"
import { useEffect, useState } from "react"
import { auth } from "../App"
import { Box, Flex, Text } from "@chakra-ui/react"
export default function MessageList({ roomNumber }) {
	let messagesToRender = []
	const link = `chat/${roomNumber}`
	const [messages, setMessages] = useState([])
	const user = auth.currentUser
	useEffect(() => {
		document.querySelector(".scroll-chat").scrollTo(0, document.querySelector(".scroll-chat").scrollHeight)
	}, [messages])
	useEffect(() => {
		const query = ref(RealTimeDB, link)
		return onValue(query, (snapshot) => {
			const data = snapshot.val()
			let newMessageList = []

			if (snapshot.exists()) {
				for (let prop in data) {
					newMessageList.push({ key: prop, message: data[prop].message, userName: data[prop].username })
				}
				console.log(newMessageList)
				// console.log(newMessageList)
			}
			setMessages(newMessageList)
		})
	}, [roomNumber])

	messagesToRender = messages.map((msg) => {
		return <Message key={msg.key} message={msg.message} author={msg.userName} mine={msg.userName === user.uid ? "yes" : "no"}></Message>
	})
	// console.log("messages", messagesToRender)
	return (
		<Box className="MessageList">
			<Text>{roomNumber}</Text>
			{messagesToRender}
		</Box>
	)
}
