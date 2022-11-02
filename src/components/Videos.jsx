import VideoButton from "./VideoButton"
import Dialog from "./Dialog"
import CurrentRoom from "./CurrentRoom"
import { Box, Flex } from "@chakra-ui/react"
import { createRoom } from "../functions/FirebaseRTC"
import { joinRoom } from "../functions/FirebaseRTC"
import { hangUp } from "../functions/FirebaseRTC"
import { useState } from "react"
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"

export default function Videos({ setVideoOn, videoOn, roomNumber }) {
	const [joinMode, setJoinMode] = useState(false)
	return (
		<Box id="videos" w="100%" h="100%" backgroundColor="rgba(0,0,0,0.8)" textAlign="center">
			<Flex justify="center" h="100%" position="relative" w="fit-content" m="auto auto">
				<Flex h="100%" flexDirection="column" position="relative" justify="center">
					<Box>
						<Box
							minH={videoOn === "full" ? "80vh" : "unset"}
							maxH={videoOn === "full" ? "80vw" : "unset"}
							as="video"
							id="remoteVideo"
							autoPlay
							playsInline
						></Box>
						<Box border="1px solid black" top="0" left="0" w={videoOn === "full" ? "20%" : "0"} position="absolute" m="4px 0 0 4px">
							<Box as="video" id="localVideo" muted autoPlay playsInline></Box>
						</Box>
					</Box>
					{videoOn === "full" ? (
						<>
							<CurrentRoom />
							<Flex p="5px" justifyContent="center">
								<VideoButton btnId={"createBtn"} iElement={"group_add"} spanText={"Create room"} />
								{joinMode ? (
									<Dialog />
								) : (
									<VideoButton
										btnId={"joinBtn"}
										spanText={"Join room"}
										btnOnClick={() => {
											setJoinMode(true)
											setTimeout(joinRoom())
										}}
									/>
								)}
								<VideoButton
									btnId={"hangupBtn"}
									spanText={"Hangup"}
									btnOnClick={() => {
										hangUp()
										setVideoOn(null)
									}}
								/>
								<VideoButton
									spanText={<AiOutlineFullscreen />}
									btnOnClick={() => {
										setVideoOn("small")
									}}
								/>
							</Flex>
						</>
					) : (
						<Box position="absolute" bottom="2px" left="2px">
							<VideoButton
								spanText={<AiOutlineFullscreenExit />}
								btnOnClick={() => {
									setVideoOn("full")
								}}
							/>
						</Box>
					)}
				</Flex>
			</Flex>
		</Box>
	)
}
