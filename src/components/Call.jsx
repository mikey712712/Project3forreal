import { Button, Text, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { ref, remove } from "firebase/database"
import { auth, RealTimeDB } from "../App"
import { joinRoomById, openUserMedia } from "../functions/FirebaseRTC"

export default function Call({ setIncomingCall, incomingCall, setVideoOn }) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Modal isOpen={true} onClose={onClose}>
				<ModalOverlay />
				<ModalContent position="relative" top="180px">
					<ModalHeader>You are getting a call</ModalHeader>
					<ModalCloseButton />

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={async () => {
								setIncomingCall("")
								await remove(ref(RealTimeDB, `IncomingCalls/${auth.currentUser.uid}`))
								onClose()
							}}
						>
							Decline
						</Button>
						<Button
							variant="ghost"
							onClick={async () => {
								setVideoOn("full")
								await openUserMedia()
								await joinRoomById(incomingCall)
								setIncomingCall("joined")
								onClose()
							}}
						>
							Accept
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
