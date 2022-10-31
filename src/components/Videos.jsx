import { Box, Flex } from "@chakra-ui/react"

export default function Videos() {
	return (
		<Box id="video-container" w="80%" m="0 auto" boxSizing="border-box" p="20px">
			<Box id="videos" w="100%" backgroundColor="black" textAlign="center">
				<Box h="fit-content" position="relative" w="fit-content" m="0 auto">
					<video id="remoteVideo" muted autoPlay playsInline></video>
					<Box border="1px solid black" top="0" w="20%" position="absolute" m="4px 0 0 4px">
						<video id="localVideo" autoPlay playsInline></video>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
