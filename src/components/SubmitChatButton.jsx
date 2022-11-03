import { useState } from "react"
import { writeChatMessage } from "../functions/FirebaseRTDB"
import { auth } from "../App"
import { onAuthStateChanged } from "firebase/auth"
import { Button, Input, Flex, Textarea } from "@chakra-ui/react"
export default function SubmitChatButton({ roomNumber }) {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// console.log(user)
		} else {
			// console.log("nope")
		}
	})
	const user = auth.currentUser

	const [formValue, setFormValue] = useState("")
	const sendMessage = async (e) => {
		e.preventDefault()
		writeChatMessage(user.uid, formValue, `${roomNumber}`)
		setFormValue("")
	}
	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			sendMessage(event)
		}
	}
	return (
		<form className="msg" onSubmit={sendMessage}>
			<Flex w="100%">
				<Textarea
					backgroundColor={"white"}
					value={formValue}
					placeholder="Type a message"
					onChange={(e) => setFormValue(e.target.value)}
					w="100%"
					rows="5"
					onKeyUp={handleKeyPress}
				></Textarea>
				<Button h="30px" m="0 0 0 5px" bgColor="rgba(255,255,255,0.8)" color="#266E80" type="submit">
					Chat
				</Button>
			</Flex>
		</form>
	)
}
