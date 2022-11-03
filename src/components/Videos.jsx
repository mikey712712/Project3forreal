import VideoButton from "./VideoButton"
import { Box, Flex } from "@chakra-ui/react"
import { hangUp } from "../functions/FirebaseRTC"
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"

export default function Videos({ setVideoOn, videoOn, roomNumber }) {
	return (
		<Box id="videos" w="100%" h="100%" backgroundColor="rgba(0,0,0,0.8)" textAlign="center">
			<Flex justify="center" h="100%" position="relative" w="fit-content" m="0 auto">
				<Flex
					h="100%"
					flexDirection="column"
					position="relative"
					justify={videoOn === "full" ? "flex-start" : "center"}
					marginTop={videoOn === "full" ? "5vh" : "0"}
				>
					<Box
						minH={videoOn === "full" ? "80vh" : "unset"}
						maxH={videoOn === "full" ? "80vw" : "unset"}
						borderRadius="10px"
						as="video"
						id="remoteVideo"
						autoPlay
						playsInline
					></Box>
					<Box borderRadius="10px" border="1px solid black" top="0" left="0" w={videoOn === "full" ? "20%" : "0"} position="absolute" m="6px 0 0 6px">
						<Box as="video" id="localVideo" muted autoPlay playsInline></Box>
					</Box>

					{videoOn === "full" ? (
						<>
							<Flex p="5px" justifyContent="center">
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
						<Box position="absolute" bottom="4px" left="2px">
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
