import { Badge, Button, Center, Flex, Heading, Image, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { createFriendRequest } from "../functions/FirebaseRTDB"
import { useState } from "react"
export default function UserHorizontalCard({ profileURL, displayName, uid, isAFriend, myUid, myDisplayName }) {
	const [friendRequestDisabled, setFriendRequestDisabled] = useState(false)
	const handleFriendRequest = (event) => {
		event.preventDefault()
		createFriendRequest(myUid, uid, myDisplayName, profileURL)
		setFriendRequestDisabled(true)
	}
	return (
		<Center py={6}>
			<Stack
				borderWidth="1px"
				borderRadius="lg"
				w={{ sm: "100%", md: "540px" }}
				height={{ sm: "476px", md: "20rem" }}
				direction={{ base: "column", md: "row" }}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				padding={4}
			>
				<Flex flex={1} bg="blue.200">
					<Image objectFit="cover" boxSize="100%" src={profileURL} />
				</Flex>
				<Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2}>
					<Heading fontSize={"2xl"} fontFamily={"body"}>
						{displayName}
					</Heading>
					<Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
						{uid}
					</Text>
					<Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}></Text>

					<Stack width={"100%"} mt={"2rem"} direction={"row"} padding={2} justifyContent={"space-between"} alignItems={"center"}>
						<Button
							flex={1}
							fontSize={"sm"}
							rounded={"full"}
							_focus={{
								bg: "gray.200",
							}}
						>
							Message
						</Button>
						{isAFriend === "no" && friendRequestDisabled === false ? (
							<Button
								onClick={handleFriendRequest}
								flex={1}
								fontSize={"sm"}
								rounded={"full"}
								bg={"blue.400"}
								color={"white"}
								w="fit-content"
								boxShadow={"0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"}
								_hover={{
									bg: "blue.500",
								}}
								_focus={{
									bg: "blue.500",
								}}
							>
								Request Friend
							</Button>
						) : null}
					</Stack>
				</Stack>
			</Stack>
		</Center>
	)
}
