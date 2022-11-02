import { Text, Flex } from "@chakra-ui/react"

export default function Message({ message, author, mine }) {
	if (mine === "yes") {
		return (
			<Flex w="100%" justify="flex-end">
				<Flex borderRadius="5px" backgroundColor="#006680" m="5px" color="white" minW="100px" maxW="80%" my="1" p="3">
					<Text>{message}</Text>
				</Flex>
			</Flex>
		)
	} else {
		return (
			<Flex w="100%">
				<Flex borderRadius="5px" backgroundColor="#006680" m="5px" color="black" minW="100px" maxW="80%" my="1" p="3">
					<Text>{message}</Text>
				</Flex>
			</Flex>
		)
	}
}
