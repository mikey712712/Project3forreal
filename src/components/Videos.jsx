import VideoButton from "./VideoButton"
import Dialog from "./Dialog"
import CurrentRoom from "./CurrentRoom"
import { Box, Flex } from "@chakra-ui/react"
import { createRoom } from "../functions/FirebaseRTC"
import { joinRoom } from "../functions/FirebaseRTC"
import { hangUp } from "../functions/FirebaseRTC"
import { useState } from "react"

export default function Videos({ setVideoOn }) {
	const [joinMode, setJoinMode] = useState(false)
	return (
		<Box id="videos" w="100%" h="100%" backgroundColor="rgba(0,0,0,0.8)" textAlign="center">
			<Flex flexDirection="column" justify="center" h="100%" position="relative" w="fit-content" m="auto auto">
				<Box position="relative">
					<Box minH="80vh" maxW="80vw" as="video" id="remoteVideo" muted autoPlay playsInline></Box>
					<Box border="1px solid black" top="0" left="0" w="20%" position="absolute" m="4px 0 0 4px">
						<Box as="video" id="localVideo" autoPlay playsInline></Box>
					</Box>
				</Box>

				<CurrentRoom />
				<Flex p="5px" justifyContent="center">
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
					<VideoButton
						btnId={"hangupBtn"}
						iElement={"close"}
						spanText={"Hangup"}
						btnOnClick={() => {
							hangUp()
							setVideoOn(false)
						}}
					/>
				</Flex>
			</Flex>
		</Box>
	)
}
