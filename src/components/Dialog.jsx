import { Button, ButtonGroup, FormControl, Input } from "@chakra-ui/react"

export default function Dialog() {
	return (
		<>
			<FormControl m="0 2px" w="200px" textAlign="center">
				<Input h="30px" type="text" id="room-id" placeholder="Room ID" />
			</FormControl>
			<Button h="30px" m="0 2px" id="confirmJoinBtn">
				Join
			</Button>
		</>
	)
}
