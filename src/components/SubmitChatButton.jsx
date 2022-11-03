import { useState } from "react"
import { writeChatMessage } from "../functions/FirebaseRTDB"
import { auth } from "../App"
import { onAuthStateChanged } from "firebase/auth"
import { Button, Input, Flex, Textarea } from "@chakra-ui/react"
import InputEmoji from "react-input-emoji"
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
	const sendMessage = async () => {
		if (formValue !== "") {
			writeChatMessage(user.uid, formValue, `${roomNumber}`)
		}
		setFormValue("")
	}

	return (
		<form
			className="msg"
			onSubmit={(event) => {
				event.preventDefault()
				sendMessage()
			}}
		>
			<Flex alignItems="center" w="100%">
				<InputEmoji value={formValue} theme={"light"} placeholder="Type a message" onChange={setFormValue} onEnter={sendMessage} />
				<Button h="30px" m="0 0 2px 0" bgColor="rgba(255,255,255,0.8)" color="#266E80" type="submit">
					Send
				</Button>
			</Flex>
		</form>
	)
}
