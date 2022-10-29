import { Button, ButtonGroup, FormControl, Input } from "@chakra-ui/react"

export default function Dialog() {
	return (
		<div id="room-dialog">
			<div>
				<h2 id="my-dialog-title">Join room</h2>
				<div id="my-dialog-content">
					Enter ID for room to join:
					<div className="mdc-text-field">
						<FormControl w="200px" textAlign="center" m="10px auto">
							<Input type="text" id="room-id" placeholder="Room ID" />
						</FormControl>
					</div>
				</div>
				<footer>
					<ButtonGroup>
						<Button>Cancel</Button>
						<Button id="confirmJoinBtn">Join</Button>
					</ButtonGroup>
				</footer>
			</div>
		</div>
	)
}
