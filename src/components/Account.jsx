import { Avatar, Box, Heading, Image, Text, Button, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { auth } from "../App"

export default function Account() {
	const user = auth.currentUser
	if (user) {
		return (
			<Flex m="10px" borderRadius="6px" border={"1px solid rgba(0,0,0,0.2)"} bgColor="rgba(255,255,255,0.8)" color="#266E80">
				<Box boxSizing="border-box" p="10px">
					{user.photoURL ? <Avatar src={user.photoURL} /> : <Avatar />}
					<Heading>{user.displayName}</Heading>
					<Text color="grey">User since {new Date(user.metadata.creationTime).toDateString()}</Text>
					<Text marginBottom="20px">Email: {user.email}</Text>
					<Link to="/userSettings">
						<Button>Edit Profile</Button>
					</Link>
				</Box>
			</Flex>
		)
	}
}
