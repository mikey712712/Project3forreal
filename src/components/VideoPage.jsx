import VideoButton from "./VideoButton"
import { Heading, ButtonGroup } from "@chakra-ui/react"
import Videos from "./Videos"
import Dialog from "./Dialog"
import ChatRoom from "./ChatRoom"
import CurrentRoom from "./CurrentRoom"
import { createRoom } from "../functions/FirebaseRTC"
import { openUserMedia } from "../functions/FirebaseRTC"
import { joinRoom } from "../functions/FirebaseRTC"
import { hangUp } from "../functions/FirebaseRTC"

export default function VideoPage() {
	return (
		<div className="video-container">
			<Heading m="20px auto">Welcome!</Heading>
			<ButtonGroup>
				<VideoButton btnId={"cameraBtn"} iElement={"perm_camera_mic"} spanText={"Open camera & microphone"} btnOnClick={openUserMedia} />
				<VideoButton btnId={"createBtn"} iElement={"group_add"} spanText={"Create room"} btnOnClick={createRoom} />
				<VideoButton btnId={"joinBtn"} iElement={"group"} spanText={"Join room"} btnOnClick={joinRoom} />
				<VideoButton btnId={"hangupBtn"} iElement={"close"} spanText={"Hangup"} btnOnClick={hangUp} />
			</ButtonGroup>
			<CurrentRoom />
			<Videos />
			<Dialog />
			<ChatRoom roomNumber="1234" />
		</div>
	)
}
