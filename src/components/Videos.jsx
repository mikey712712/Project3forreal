import { Box, Flex } from "@chakra-ui/react"

export default function Videos() {
	return (
		<Flex id="videos" w="80%" m="0 auto" boxSizing="border-box" p="20px" gap="20px" justifyContent="center">
			<Box>
				<video id="localVideo" muted autoPlay playsInline></video>
				<Box position="relative">
					<video id="remoteVideo" autoPlay playsInline></video>
				</Box>
			</Box>
		</Flex>
	)
}
