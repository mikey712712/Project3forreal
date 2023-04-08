import { Text, Flex, Image } from "@chakra-ui/react"

export default function Message({ message, author, mine }) {
	const checkForImage = (url) => {
		let regex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/
		if (url.match(regex)) {
			return url.match(regex)
		} else {
			return false
		}
	}

	const check = checkForImage(message)

	if (check === false) {
		// console.log("no image")
	} else {
		// console.log("image")
	}
	if (mine === "yes" && check !== false) {
		return (
			<Flex w="100%" justify="flex-end">
				<Flex borderRadius="5px" backgroundColor="#01A5CC" m="5px" color="white" minW="100px" maxW="80%" my="1" p="3">
					<Image h="300px" w="fit-content" maxW="100%" src={message} alt="..."></Image>
				</Flex>
			</Flex>
		)
	} else if (mine === "no" && check !== false) {
		return (
			<Flex w="100%">
				<Flex borderRadius="5px" backgroundColor="lightgrey" m="5px" color="black" minW="100px" maxW="80%" my="1" p="3">
					<Image h="300px" w="fit-content" src={message} alt="..."></Image>
				</Flex>
			</Flex>
		)
	} else if (mine === "yes") {
		return (
			<Flex w="100%" justify="flex-end">
				<Flex borderRadius="5px" backgroundColor="#01A5CC" m="5px" color="white" maxW="80%" my="1" p="3">
					<Text>{message}</Text>
				</Flex>
			</Flex>
		)
	} else {
		return (
			<Flex w="100%">
				<Flex borderRadius="5px" backgroundColor="lightgrey" m="5px" color="black" maxW="80%" my="1" p="3">
					<Text>{message}</Text>
				</Flex>
			</Flex>
		)
	}
}
