import { Box, Heading } from "@chakra-ui/react"
import { Navigate } from "react-router-dom"

export default function Home({ user }) {
	if (user) {
		return <Navigate to="/chat" />
	} else {
		return (
			<Box w="100%" textAlign="center">
				<Heading>Welcome</Heading>
			</Box>
		)
	}
}
