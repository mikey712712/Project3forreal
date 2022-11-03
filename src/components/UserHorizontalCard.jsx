import { Avatar, Badge, Button, Center, Flex, Heading, Image, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { createFriendRequest } from "../functions/FirebaseRTDB"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function UserHorizontalCard({ photoURL, displayName, uid, isAFriend, myUid, myDisplayName }) {
	const [friendRequestDisabled, setFriendRequestDisabled] = useState(false)
	const navigate = useNavigate()
	const handleFriendRequest = (event) => {
		event.preventDefault()
		event.stopPropagation()
		createFriendRequest(myUid, uid, myDisplayName, photoURL)
		setFriendRequestDisabled(true)
	}
	const handleUserProfile = () => {
		navigate(`/users/${uid}`)
	}

	return (
		<Center onClick={handleUserProfile} cursor="pointer" textAlign={"center"} py={"10px"} w="35%">
			<Stack
				borderWidth="1px"
				borderRadius="lg"
				w="25vw"
				minH="200px"
				height="fit-content"
				direction={{ base: "column", md: "row" }}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				padding={"10px"}
			>
				<Avatar m="0 0 0 20px" alignSelf="center" w="80px" h="80px" border={"1px solid rgba(0,0,0,0.1)"} src={photoURL} />

				<Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2}>
					<Heading fontSize={"2xl"} fontFamily={"body"}>
						{displayName}
					</Heading>
					<Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
						{uid}
					</Text>
					<Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}></Text>
					{isAFriend === "no" && friendRequestDisabled === false ? (
						<Button
							onClick={handleFriendRequest}
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
		</Center>
	)
}
