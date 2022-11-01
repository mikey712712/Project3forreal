import SubmitChatButton from "./SubmitChatButton"
import MessageList from "./MessageList"
import ChatRoomHeader from "./ChatRoomHeader"
import VideoButton from "./VideoButton"
import { Box, Flex } from "@chakra-ui/react"
import { openUserMedia } from "../functions/FirebaseRTC"

export default function ChatRoom({ roomNumber, setVideoOn }) {
	return (
		<Box w="60%" m="0 auto" border="1px solid black" className="chatroom" zIndex="0">
			<ChatRoomHeader roomNumber={roomNumber} />
			<MessageList roomNumber={roomNumber} />
			<Flex p="5px" justifyContent="center">
				<SubmitChatButton />
				<VideoButton
					btnId={"cameraBtn"}
					iElement={"perm_camera_mic"}
					spanText={"Open camera & microphone"}
					btnOnClick={() => {
						setVideoOn(true)
						openUserMedia()
					}}
				/>
			</Flex>
		</Box>
	)
}
