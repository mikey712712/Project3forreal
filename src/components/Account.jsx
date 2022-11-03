import { Avatar, Box, Heading, Text, Button, Flex } from "@chakra-ui/react"
import { child, onValue, ref } from "firebase/database"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { auth, RealTimeDB } from "../App"
import { StatusTag } from "./StatusTag"

export default function Account({ user }) {
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) {
			navigate("/login")
		}
	}, [])
	if (user) {
		const userId = useParams().userId
		let userAccount
		if (userId) {
			onValue(child(ref(RealTimeDB, `Users/`), `${userId}`), (snapshot) => {
				const data = snapshot.val()
				userAccount = data[Object.keys(data)[0]]
			})
		} else {
			userAccount = auth.currentUser
		}

		return (
			<Box bgColor="unset" position="fixed" top="4vh" left="17%" w="83%" h="96vh">
				<Flex m="10px" borderRadius="6px" border={"1px solid rgba(0,0,0,0.2)"} bgColor="rgba(255,255,255,0.8)" color="#266E80">
					<Box boxSizing="border-box" p="10px">
						<Flex alignItems="center" marginBottom="5px">
							<Avatar src={userAccount.photoURL} />
							<Heading marginLeft="5px" color="#232528">
								{userAccount.displayName}
							</Heading>
						</Flex>

						<Text marginBottom="10px">
							<StatusTag uid={userAccount.uid}></StatusTag>
						</Text>
						<Text marginBottom="20px" color="grey" filter="brightness(80%)" fontWeight="400">
							User since{" "}
							{userAccount.metadata?.creationTime
								? new Date(userAccount.metadata.creationTime).toDateString()
								: new Date(userAccount.createdAt).toDateString()}
						</Text>
						{!userId ? (
							<Link to="/settings">
								<Button>Edit Profile</Button>
							</Link>
						) : null}
					</Box>
				</Flex>
			</Box>
		)
	}
}
