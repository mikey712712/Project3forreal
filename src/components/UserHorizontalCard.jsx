import { Avatar, Badge, Button, Center, Flex, Heading, Image, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { createFriendRequest } from "../functions/FirebaseRTDB"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { RealTimeDB } from "../App"
import { onValue, ref } from "firebase/database"
export default function UserHorizontalCard({ photoURL, displayName, uid, isAFriend, myUid, myDisplayName }) {
	const [friendRequestDisabled, setFriendRequestDisabled] = useState(false)
	const [pendingRequest, setPendingRequest] = useState(false)
	const navigate = useNavigate()
	const handleFriendRequest = (event) => {
		event.preventDefault()
		event.stopPropagation()
		createFriendRequest(myUid, uid, myDisplayName, photoURL)
		setFriendRequestDisabled(true)
		setPendingRequest(true)
	}
	const handleUserProfile = () => {
		navigate(`/users/${uid}`)
	}
	useEffect(() => {
		const requestRef = ref(RealTimeDB, "Requests/" + uid)
		const checkForDuplicateWrapper = async () => {
			const checkForDuplicateRequest = new Promise((resolve, reject) => {
				onValue(
					requestRef,
					(snapshot) => {
						const data = snapshot.val()
						console.log(data)
						if (snapshot.exists()) {
							for (let property in data) {
								// console.log("datapropshit", data[property].uid)
								if (data[property].uid === myUid) {
									resolve(true)
									console.log("matched")
								}
							}
							resolve(false)
						}
						resolve(false)
					},
					{ onlyOnce: true }
				)
			})
			const alreadyRequested = await checkForDuplicateRequest
			if (!alreadyRequested) {
				setFriendRequestDisabled(false)
			} else {
				setFriendRequestDisabled(true)
				setPendingRequest(true)
			}
		}
		checkForDuplicateWrapper()
	}, [])
	return (
		<Center onClick={handleUserProfile} cursor="pointer" textAlign={"center"} p={"10px 0 0 0"} w="30%" m={"0 10px 10px 10px"}>
			<Stack
				borderWidth="1px"
				borderRadius="lg"
				w="25vw"
				minH="130px"
				height="fit-content"
				direction={{ base: "column", md: "row" }}
				bgColor={"white"}
				transition="0.4s"
				_hover={{ filter: "brightness(93%)" }}
				boxShadow={"2xl"}
				p="10px"
				position="relative"
			>
				<Avatar alignSelf="center" w="80px" h="80px" ml="15px" border={"1px solid rgba(0,0,0,0.1)"} src={photoURL} />

				<Stack flex={1} flexDirection="column" justifyContent={isAFriend === "yes" ? "center" : "flex-start"} pt="10px" alignItems="center">
					<Heading fontSize={"2xl"} fontFamily={"body"}>
						{displayName}
					</Heading>
					<Text fontWeight={600} color={"gray.500"} fontSize="0.7em" mb={4}>
						{uid}
					</Text>
					<Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}></Text>
					{isAFriend === "no" && friendRequestDisabled === false ? (
						<Button
							onClick={handleFriendRequest}
							fontSize={"sm"}
							rounded={"full"}
							bg={"blue.400"}
							position="absolute"
							bottom="15px"
							color={"white"}
							h="fit-content"
							w="fit-content"
							py="5px"
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
					{pendingRequest ? (
						<Button
							onClick={(event) => event.stopPropagation()}
							fontSize={"sm"}
							position="absolute"
							bottom="15px"
							rounded={"full"}
							bg={"gray.500"}
							color={"white"}
							py="5px"
							h="fit-content"
							w="fit-content"
							cursor="default"
							_hover={{ filter: "brightness(100%)" }}
						>
							Pending Request
						</Button>
					) : null}
				</Stack>
			</Stack>
		</Center>
	)
}
