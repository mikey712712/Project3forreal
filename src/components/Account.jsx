import { Avatar, Box, Heading, Text, Button, Flex } from "@chakra-ui/react"
import { child, onValue, ref } from "firebase/database"
import { Link, useParams } from "react-router-dom"
import { auth, RealTimeDB } from "../App"

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
	let online = true
	if (user) {
		return (
			<Flex m="10px" borderRadius="6px" border={"1px solid rgba(0,0,0,0.2)"} bgColor="rgba(255,255,255,0.8)" color="#266E80">
				<Box boxSizing="border-box" p="10px">
					{user.photoURL ? <Avatar src={user.photoURL} /> : <Avatar />}
					<Heading color="#232528">{user.displayName}</Heading>
					{online ? <Text marginBottom="10px">online</Text> : null}
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
