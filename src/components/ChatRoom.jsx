import SubmitChatButton from "./SubmitChatButton"
import MessageList from "./MessageList"
import ChatRoomHeader from "./ChatRoomHeader"
import VideoButton from "./VideoButton"
import { Box, Flex, Grid } from "@chakra-ui/react"
import { openUserMedia } from "../functions/FirebaseRTC"
import { useEffect } from "react"

export default function ChatRoom({ roomNumber, setVideoOn }) {
	return (
		<Flex flexFlow="column nowrap" boxSizing="border-box" h="100%" w="100%" p="10px" border="1px solid black" className="chatroom" zIndex="0">
			<ChatRoomHeader roomNumber={roomNumber} />
			<Box className="scroll-chat" position="relative" overflow="scroll" h="79vh" borderRight="1px solid black" borderLeft="1px solid black">
				<MessageList roomNumber={roomNumber} />
			</Box>
			<Flex p="5px" position="relative" justifyContent="center" bottom="0px" border="1px solid black" w="100%" backgroundColor="#62b6cb">
				<SubmitChatButton />
				<VideoButton
					btnId={"cameraBtn"}
					iElement={"perm_camera_mic"}
					spanText={"Open camera & microphone"}
					btnOnClick={() => {
						setVideoOn("full")
						openUserMedia()
					}}
				/>
			</Flex>
		</Flex>
	)
}
