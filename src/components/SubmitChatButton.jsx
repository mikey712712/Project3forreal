import { useState } from "react"
import { writeChatMessage } from "../functions/FirebaseRTDB"
import { auth } from "../App"
import { onAuthStateChanged } from "firebase/auth"
import { Button, Input, Flex } from "@chakra-ui/react"
export default function SubmitChatButton() {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log(user)
		} else {
			console.log("nope")
		}
	})
	const user = auth.currentUser

	const [formValue, setFormValue] = useState("")
	const sendMessage = async (e) => {
		e.preventDefault()
		console.log(user)
		writeChatMessage(user.providerData[0].displayName, formValue, "1234")
		setFormValue("")
	}
	return (
		<form onSubmit={sendMessage}>
			<Flex>
				<Input h="30px" value={formValue} placeholder="Type a message" onChange={(e) => setFormValue(e.target.value)} />
				<Button h="30px" m="0 50px 0 0" color="white" backgroundColor="#1B4965" type="submit">
					Chat
				</Button>
			</Flex>
		</form>
	)
}
