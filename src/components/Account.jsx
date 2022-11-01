import { Avatar, Box, Heading, Image, Text, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function Account({ user }) {
	if (user) {
		return (
			<Box boxSizing="border-box" p="20px" position="relative" top="36px">
				{user.photoURL ? <Image src={user.photoURL} /> : <Avatar />}
				<Heading>{user.displayName}</Heading>
				<Text color="grey">User since {new Date(user.metadata.creationTime).toDateString()}</Text>
				<Text>Email: {user.email}</Text>
				<Link to="/userSettings">
					<Button>Edit Profile</Button>
				</Link>
			</Box>
		)
	}
}
