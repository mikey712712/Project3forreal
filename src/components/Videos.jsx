import { Box, Flex } from "@chakra-ui/react"

export default function Videos() {
	return (
		<Box id="video-container" w="80%" m="0 auto" h="fit-content">
			<Box id="videos" w="100%" backgroundColor="black" textAlign="center">
				<Box h="fit-content" position="relative" w="fit-content" m="0 auto">
					<Box as="video" id="remoteVideo" muted autoPlay playsInline></Box>
					<Box border="1px solid black" top="0" w="20%" position="absolute" m="4px 0 0 4px">
						<Box as="video" id="localVideo" autoPlay playsInline></Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
