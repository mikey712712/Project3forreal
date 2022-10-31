import { Avatar, Box, Heading, Image, Text } from "@chakra-ui/react"

export default function Account({ user }) {
	if (user) {
		return (
			<Box boxSizing="border-box" p="20px">
				{user.photoURL ? <Image src={user.photoURL} /> : <Avatar />}
				<Heading>{user.displayName}</Heading>
				<Text color="grey">User since {user.metadata.creationTime}</Text>
				<Text>Email: {user.email}</Text>
			</Box>
		)
	}
}
