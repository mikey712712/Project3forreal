import { Avatar, Box, Heading, Text, Button, Flex } from "@chakra-ui/react"
import { child, onValue, ref } from "firebase/database"
import { Link, useParams } from "react-router-dom"
import { auth, RealTimeDB } from "../App"
import { StatusTag } from "./StatusTag"

export default function Account() {
	const userId = useParams().userId
	let user
	if (userId) {
		onValue(child(ref(RealTimeDB, `Users/`), `${userId}`), (snapshot) => {
			const data = snapshot.val()
			user = data[Object.keys(data)[0]]
		})
	} else {
		user = auth.currentUser
	}
	if (user) {
		return (
			<Flex m="10px" borderRadius="6px" border={"1px solid rgba(0,0,0,0.2)"} bgColor="rgba(255,255,255,0.8)" color="#266E80">
				<Box boxSizing="border-box" p="10px">
					<Flex alignItems="center" marginBottom="5px">
						<Avatar src={user.photoURL} />
						<Heading marginLeft="5px" color="#232528">
							{user.displayName}
						</Heading>
					</Flex>

					<Text marginBottom="10px">
						<StatusTag uid={user.uid}></StatusTag>
					</Text>
					<Text marginBottom="20px" color="grey" filter="brightness(80%)" fontWeight="400">
						User since {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toDateString() : new Date(user.createdAt).toDateString()}
					</Text>
					{!userId ? (
						<Link to="/settings">
							<Button>Edit Profile</Button>
						</Link>
					) : null}
				</Box>
			</Flex>
		)
	}
}
