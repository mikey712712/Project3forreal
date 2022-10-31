import { useState } from "react"
import { writeChatMessage } from "../functions/FirebaseRTDB"
import { auth } from "../App"
import { onAuthStateChanged } from "firebase/auth"
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
			<input value={formValue} placeholder="Type a message" onChange={(e) => setFormValue(e.target.value)} />
			<button type="submit">Chat </button>
		</form>
	)
}
