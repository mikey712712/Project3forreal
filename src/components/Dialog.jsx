import { Button, ButtonGroup, FormControl, Input } from "@chakra-ui/react"
import { useState } from "react"
import { joinRoomById } from "../functions/FirebaseRTC"

export default function Dialog() {
	const [idField, setIdField] = useState("")
	const handleClick = async () => {
		console.log("Join room: ", idField)
		document.querySelector("#currentRoom").innerText = `Current room is ${idField} - You are the callee!`
		await joinRoomById(idField)
	}

	const handleChange = (event) => {
		setIdField(event.target.value)
	}

	return (
		<>
			<FormControl m="0 2px" w="200px" textAlign="center">
				<Input h="30px" type="text" id="room-id" placeholder="Room ID" value={idField} onChange={handleChange} />
			</FormControl>
			<Button h="30px" m="0 2px" id="confirmJoinBtn" onClick={handleClick}>
				Join
			</Button>
		</>
	)
}
