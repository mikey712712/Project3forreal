import ChatRoom from "./ChatRoom"
import { Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function ChatPage({ setVideoOn, roomNumber, user }) {
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) {
			navigate("/login")
		}
	}, [])
	if (user) {
		return (
			<Box bgColor="unset" position="fixed" top="4vh" left="17%" w="83%" h="96vh">
				<Box bgColor="unset" position="relative" h="100%" w="100%" m="0 auto">
					<ChatRoom setVideoOn={setVideoOn} roomNumber={roomNumber} />
				</Box>
			</Box>
		)
	}
}
