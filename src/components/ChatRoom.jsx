import SubmitChatButton from "./SubmitChatButton"
import MessageList from "./MessageList"
import ChatRoomHeader from "./ChatRoomHeader"
import VideoButton from "./VideoButton"
import { Box, Flex } from "@chakra-ui/react"
import Dialog from "./Dialog"
import { createRoom } from "../functions/FirebaseRTC"
import { openUserMedia } from "../functions/FirebaseRTC"
import { joinRoom } from "../functions/FirebaseRTC"
import { hangUp } from "../functions/FirebaseRTC"
import { useState } from "react"

export default function ChatRoom({ roomNumber, videoOn, setVideoOn }) {
	const [joinMode, setJoinMode] = useState(false)
	return (
		<Box w="60%" m="0 auto" border="1px solid black" className="chatroom">
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
				<VideoButton btnId={"createBtn"} iElement={"group_add"} spanText={"Create room"} btnOnClick={createRoom} />
				{joinMode ? (
					<Dialog />
				) : (
					<VideoButton
						btnId={"joinBtn"}
						iElement={"group"}
						spanText={"Join room"}
						btnOnClick={() => {
							setJoinMode(true)
							setTimeout(joinRoom())
						}}
					/>
				)}
				<VideoButton btnId={"hangupBtn"} iElement={"close"} spanText={"Hangup"} btnOnClick={hangUp} />
			</Flex>
		</Box>
	)
}
