import { Flex, Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function Header() {
	return (
		<Flex
			w="100%"
			justifyContent="space-between"
			alignItems="center"
			boxSizing="border-box"
			p="5px 15px"
			backgroundColor="#CAE9FF"
			fontWeight="bold"
			h="36px"
		>
			<Link to="/">Home</Link>
			<a href="">Teams</a>
			<a href="">Contacts</a>
			<a href="">Account</a>
			<Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
		</Flex>
	)
}
